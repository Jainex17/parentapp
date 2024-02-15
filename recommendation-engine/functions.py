import numpy as np
import pandas as pd
import joblib
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def internal_sourcing(): # 50%
    # Retrieve posts liked by users the user follows
    #  design with shahil
    internal_post_list = []
    return internal_post_list
    pass

def external_sourcing(internal_post_list): # 50%
    # From all posts, remove posts fetched from Internal Sourcing
    #  design with shahil
    all_posts_list = []
    external_source_posts = all_posts_list - internal_post_list
    pass

def json_to_df(all_posts_json):
    # take all post json/dictionary and create necessary df

    collab_df = pd.DataFrame(columns=['post_id', 'total_like_count', 'liked', 'user_id'])
    content_df = pd.DataFrame(columns=['post_id', 'total_like_count','overview'])

    return collab_df, content_df

def post_user_dataset_model(df):
    '''Create pivot table of all posts, users and fill with user likes (1/0). 
        Add threshold based on total like count for each post if required. Train and save model.'''
    # notes: optimize variable allocation, implement exception handling

    # data will come in format:
    # [{},{}]
    
    # extract data and store in python dataframe
    df = pd.DataFrame(columns=['post_id', 'total_like_count', 'liked', 'user_id']) # sample df

    like_threshold = 10 # minimum number of likes to consider 
    threshold_df = df.query('total_like_count >= @like_threshold')
    
    # create pivot matrix
    post_user_df = threshold_df.pivot_table(index='post_id',columns='user_id',values='liked').fillna(0)

    # create sparse matrix  
    post_user_df_matrix = csr_matrix(post_user_df.values)

    # save df
    post_user_df.to_csv('post_user_df.csv')

    # train nearest neighbors model
    model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    model_knn.fit(post_user_df_matrix)

    # save model
    joblib.dump(model_knn, 'knn_model.joblib')

    pass

def post_dataset(df):
    # Create a post dataset storing post id, title, description and tags

    # extract data and store in python dataframe
    #  extract 'title', 'description', 'tags' and concatenate them for each post into overview
    df = pd.DataFrame(columns=['post_id', 'total_like_count','overview']) # sample df

    like_threshold = 2 # minimum number of likes to consider 
    threshold_df = df.query('total_like_count >= @like_threshold')

    threshold_df['overview'] = threshold_df['overview'].fillna('') # fill na values with empty string

    threshold_df.to_csv('post_dataset.csv')

    # initiallise tfidf vectorizer 
    tfv = TfidfVectorizer(min_df=3,  max_features=None,
            strip_accents='unicode', analyzer='word',token_pattern=r'\w{1,}',
            ngram_range=(1, 3),
            stop_words = 'english')
    
    tfv_matrix = tfv.fit_transform(threshold_df['overview']) # create sparse matrix
 
    sig = sigmoid_kernel(tfv_matrix, tfv_matrix) # Compute the sigmoid kernel

    np.save('sigmoid_kernel_matrix.npy', sig)

    # Reverse mapping of indices and movie titles
    indices = pd.Series(threshold_df.index, index=threshold_df['post_id']).drop_duplicates()

    np.save('reverse_mapping_indices.npy', indices)
    
    pass

def user_preference_filtering(user_tags, post_list, min_num_common_tags = 2):
    # List of posts filtered from external sourcing list that have tags similar to those set by user in their preferences
    # from dictionary
    # [(postid,[]),(postid,[])] m 

    user_tags = ['help','welp'] # sample
    user_tags = set(user_tags)

    post_list = [(1,['help']),(2,['no help'])] #sample

    filtered_post_list = [post[0] for post in post_list if len(set(post[1]).intersection(user_tags)) >= min_num_common_tags]
    
    return filtered_post_list
    
def common_filter_not_seen(not_seen_posts,filter_list):
    # Filtering of list of posts to only keep posts that have not been seen by the user

    filtered_list = list(set(not_seen_posts).intersection(set(filter_list)))
    
    return filtered_list

def content_based_filtering(recently_liked_posts, sig, indices, df,  unseen_posts, n = 35): # 70%
    '''For given x number of recently liked posts, recommend y number of posts similar to 
       recently liked posts similar on tags, title, and description. Sort Final list in descending order based on similarity.'''
    
    scored_post_list = []

    for post in recently_liked_posts:
        idx = indices[post]
        sig_scores = enumerate(sig[idx])
        sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
        sig_scores = sig_scores[1:6]
        posts = [(df['post_id'].iloc[i], score) for i, score in sig_scores]
        scored_post_list.extend(posts)
    
    unseen_posts_set = set(unseen_posts)

    scored_df = pd.DataFrame(scored_post_list, columns=['post_id', 'score'])
    scored_df = scored_df.drop_duplicates(subset='post_id')

    # Sort and filter unseen posts
    top_m_post_ids = scored_df.sort_values(by='score', ascending=False)['post_id'].head(n).tolist()
    post_recommendation_list = [post_id for post_id in top_m_post_ids if post_id in unseen_posts_set]

    return post_recommendation_list

def collaborative_filtering(recently_liked_posts, knn_model, post_user_df, unseen_posts, m = 30): # 30%
    '''For given 10 recently liked posts, recommend y number of posts similar to 
       user likes features. Sort Final list in ascending order based on distance'''

    scored_post_list = []

    for post in recently_liked_posts:
        post_index =post_user_df.index.get_loc(post)
        distances, indices = knn_model.kneighbors(post_user_df.iloc[post_index,:].values.reshape(1, -1), n_neighbors = 6)
        for i in range(1, len(distances.flatten())):
            scored_post_list.append((post_user_df.index[indices.flatten()[i]], distances.flatten()[i]))

    unseen_posts_set = set(unseen_posts)

    scored_df = pd.DataFrame(scored_post_list, columns=['post_id', 'score'])
    scored_df = scored_df.drop_duplicates(subset='post_id')

    # Sort and filter unseen posts
    top_m_post_ids = scored_df.sort_values(by='score', ascending=True)['post_id'].head(m).tolist()
    post_recommendation_list = [post_id for post_id in top_m_post_ids if post_id in unseen_posts_set]

    return post_recommendation_list

def mixing(internal_content_based_list, external_content_based_list, collaborative_list):
    # Take respective ratios for filtering aproaches and sourcing methods and perform mixing

    len_internal_content_based = len(internal_content_based_list)
    len_external_content_based = len(external_content_based_list)
    len_collaborative = len(collaborative_list)

    post_recommendation_set = set()

    for i in range(max(len_internal_content_based, len_external_content_based, len_collaborative)):
        if i < len_internal_content_based:
            post_recommendation_set.update(internal_content_based_list[i])
        if i < len_external_content_based:
            post_recommendation_set.update(external_content_based_list[i])
        if i < len_collaborative:
            post_recommendation_set.update(collaborative_list[i])

    return list(post_recommendation_set)

# api will send call to 2 functions - user_recommendation and every_n_hours

def user_recommendation(internally_sourced_list, externally_sourced_list, user_tags, not_seen_post_list, recently_liked_posts):
    external_pref_list = user_preference_filtering(user_tags, post_list= externally_sourced_list)
    internal_unseen_list = common_filter_not_seen(not_seen_posts = not_seen_post_list,filter_list = internally_sourced_list)
    external_unseen_list = common_filter_not_seen(not_seen_posts = not_seen_post_list,filter_list = external_pref_list)

    loaded_sig = np.load('sigmoid_kernel_matrix.npy')
    loaded_indices = np.load('reverse_mapping_indices.npy')
    loaded_df = pd.read_csv('post_dataset.csv')
    internal_content_list = content_based_filtering(recently_liked_posts, sig = loaded_sig, indices = loaded_indices, df = loaded_df,  unseen_posts = internal_unseen_list)
    external_content_list = content_based_filtering(recently_liked_posts, sig = loaded_sig, indices = loaded_indices, df = loaded_df,  unseen_posts = external_unseen_list )

    loaded_model_knn = joblib.load('knn_model.joblib')
    loaded_post_user_df = pd.read_csv('post_user_df.csv')
    collab_list = collaborative_filtering(recently_liked_posts = recently_liked_posts, knn_model = loaded_model_knn, post_user_df = loaded_post_user_df, unseen_posts = internal_unseen_list + external_unseen_list)

    final_post_list = mixing(internal_content_based_list = internal_content_list, external_content_based_list = external_content_list, collaborative_list = collab_list)

    return final_post_list

def every_n_hours(all_post_json_list):
    collab_df, content_df = json_to_df(all_posts_json = all_post_json_list)
    post_user_dataset_model(collab_df)
    post_dataset(content_df)
    return True