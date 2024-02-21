import os
import numpy as np
import pandas as pd
import json
import joblib
from scipy.sparse import csr_matrix
from itertools import zip_longest
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

script_dir = os.path.dirname(os.path.abspath(__file__))

def json_to_df(all_posts_json, all_users_json):
    # take all post json/dictionary and create necessary df

    with open(os.path.join(script_dir,'all_posts_json_dump.json'), 'w') as json_file:
        json.dump(all_posts_json, json_file)

    with open(os.path.join(script_dir,'all_users_json_dump.json'), 'w') as json_file:
        json.dump(all_users_json, json_file)

    collab_df_data = []
    content_df_data = []

    for post in all_posts_json:
        post_id = post["postid"]
        total_like_count = post["like"]["total"]
        likes = post["like"]["usrnames"]

        for liked_user in likes:
            collab_df_data.append({"post_id": post_id, "total_like_count": total_like_count, "liked": 1, "user_id": liked_user})

        overview = " ".join(post["tags"] + [post["disc"], post["title"]])
        content_df_data.append({"post_id": post_id, "total_like_count": total_like_count, "overview": overview})

    collab_df = pd.DataFrame(collab_df_data, columns=["post_id", "total_like_count", "liked", "user_id"])
    content_df = pd.DataFrame(content_df_data, columns=["post_id", "total_like_count", "overview"])

    return collab_df, content_df

def post_user_dataset_model(df):
    '''Create pivot table of all posts, users and fill with user likes (1/0). 
        Add threshold based on total like count for each post if required. Train and save model.'''
    # notes: optimize variable allocation, implement exception handling

    like_threshold = 0 # minimum number of likes to consider 
    threshold_df = df.query('total_like_count >= @like_threshold')
    
    # create pivot matrix
    post_user_df = threshold_df.pivot_table(index='post_id',columns='user_id',values='liked').fillna(0)

    # create sparse matrix  
    post_user_df_matrix = csr_matrix(post_user_df.values)

    # save df
    post_user_df.to_csv(os.path.join(script_dir,'post_user_df.csv'))

    # train nearest neighbors model
    model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    model_knn.fit(post_user_df_matrix)

    # save model
    joblib.dump(model_knn, os.path.join(script_dir,'knn_model.joblib'))

    pass

def post_dataset(df):
    # Create a post dataset storing post id, title, description and tags

    like_threshold = 0 # minimum number of likes to consider 
    threshold_df = df.query('total_like_count >= @like_threshold')

    threshold_df['overview'] = threshold_df['overview'].fillna('') # fill na values with empty string

    threshold_df.to_csv(os.path.join(script_dir,'post_dataset.csv'), index=False)

    # initiallise tfidf vectorizer 
    tfv = TfidfVectorizer(min_df=3,  max_features=None,
            strip_accents='unicode', analyzer='word',token_pattern=r'\w{1,}',
            ngram_range=(1, 3),
            stop_words = 'english')
    
    tfv_matrix = tfv.fit_transform(threshold_df['overview']) # create sparse matrix
 
    sig = sigmoid_kernel(tfv_matrix, tfv_matrix) # Compute the sigmoid kernel

    np.save(os.path.join(script_dir,'sigmoid_kernel_matrix.npy'), sig)

    # Reverse mapping of indices and movie titles

    # np.savez('reverse_mapping_indices.npz',  values=indices.values, index=indices.index)

    indices = pd.Series(threshold_df.index, index=threshold_df['post_id']).drop_duplicates()

    # Create a DataFrame from indices
    reverse_mapping_df = pd.DataFrame({'post_id': indices.index, 'index': indices.values})

    # Save DataFrame to CSV file
    reverse_mapping_df.to_csv(os.path.join(script_dir,'reverse_mapping_indices.csv'), index=False)
    
    pass

def user_preference_filtering(user_tags, post_list, min_num_common_tags = 1):
    # List of posts filtered from external sourcing list that have tags similar to those set by user in their preferences
    # from dictionary
    # [(postid,[]),(postid,[])] m 

    # user_tags = ['help','welp'] # sample
    user_tags = set(user_tags)

    # post_list = []

    # for post in post_list_json:
    #     post_id = post["postid"]
    #     tags = post["tags"]
    #     post_list.append((post_id, tags))

    filtered_post_list = [post[0] for post in post_list if len(set(post[1]).intersection(user_tags)) >= min_num_common_tags]
    
    return filtered_post_list
    
def common_filter_not_seen(not_seen_posts,filter_list): 
    # to account for user's own posts, they will be directly given the seen tag

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

    zipped_lists = zip_longest(internal_content_based_list, external_content_based_list, collaborative_list, fillvalue=None)

    post_recommendation_list = []

    # Flatten the zipped lists and filter out None values
    for elements in zipped_lists:
        post_recommendation_list.extend(filter(None, elements))

    post_recommendation_set = set(post_recommendation_list)

    return list(post_recommendation_set)

# api will send call to 2 functions - user_recommendation and every_n_hours

def user_recommendation(user_json):
    with open(os.path.join(script_dir,'all_posts_json_dump.json'), 'r') as json_file:
        all_post_json_list = json.load(json_file)

    with open(os.path.join(script_dir,'all_users_json_dump.json'), 'r') as json_file:
        all_user_json_list = json.load(json_file)
   
    # internally_sourced_list
    following_set = set(user_json.get("following", []))
    internally_sourced_set = set()

    for user in all_user_json_list:
        if user["id"] in following_set:
            liked_posts = user.get("likedposts", [])
            internally_sourced_set.update(liked_posts)

    internally_sourced_list = list(internally_sourced_set)

    externally_sourced_list = list((post["postid"], post["tags"]) for post in all_post_json_list if post["postid"] not in internally_sourced_set)

    user_tags = user_json.get("tags", [])

    external_pref_list = user_preference_filtering(user_tags, post_list = externally_sourced_list)

    seen_post_set = set([post_id for post_id in user_json["likedposts"]])

    not_seen_post_list = list({post["postid"] for post in all_post_json_list} - seen_post_set)

    recently_liked_posts = user_json.get("likedposts", [])[::-1][0:11]

    internal_unseen_list = common_filter_not_seen(not_seen_posts = not_seen_post_list,filter_list = internally_sourced_list)
    external_unseen_list = common_filter_not_seen(not_seen_posts = not_seen_post_list,filter_list = external_pref_list)

    loaded_sig = np.load(os.path.join(script_dir, 'sigmoid_kernel_matrix.npy'))

    reverse_mapping_df = pd.read_csv(os.path.join(script_dir,'reverse_mapping_indices.csv'))
    loaded_indices = reverse_mapping_df.set_index('post_id')['index']

    loaded_df = pd.read_csv(os.path.join(script_dir, 'post_dataset.csv'))
    internal_content_list = content_based_filtering(recently_liked_posts, sig = loaded_sig, indices = loaded_indices, df = loaded_df,  unseen_posts = internal_unseen_list)
    external_content_list = content_based_filtering(recently_liked_posts, sig = loaded_sig, indices = loaded_indices, df = loaded_df,  unseen_posts = external_unseen_list )

    loaded_model_knn = joblib.load(os.path.join(script_dir, 'knn_model.joblib'))
    loaded_post_user_df = pd.read_csv(os.path.join(script_dir, 'post_user_df.csv'), index_col=0)

    collab_list = collaborative_filtering(recently_liked_posts = recently_liked_posts, knn_model = loaded_model_knn, post_user_df = loaded_post_user_df, unseen_posts = internal_unseen_list + external_unseen_list)

    final_post_list = mixing(internal_content_based_list = internal_content_list, external_content_based_list = external_content_list, collaborative_list = collab_list)

    return final_post_list

def every_n_hours(all_post_json_list, all_user_json_list):
    collab_df, content_df = json_to_df(all_posts_json = all_post_json_list, all_users_json=all_user_json_list)
    post_user_dataset_model(collab_df)
    post_dataset(content_df)
    return True

# test data
all_post_json_list = [{'title': 'my second post new here', 'disc': 'my second post discription', 'usrname': 'datauser1', 'usrid': 'N_usr_31', 'postid': 'U_post_15', 'ptype': 'post', 'tags': ['unmarried'], 'like': {'total': 2, 'usrnames': ['datauser1', 'datauser3']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:48:54', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_15?alt=media'}, {'title': 'my first post new here', 'disc': 'my first post discription', 'usrname': 'datauser1', 'usrid': 'N_usr_31', 'postid': 'U_post_14', 'ptype': 'post', 'tags': ['single'], 'like': {'total': 4, 'usrnames': ['datauser1', 'datauser3', 'datauser2', 'datauser4']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:48:32', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_14?alt=media'}, {'title': 'my second post new here', 'disc': 'my second post discription', 'usrname': 'datauser2', 'usrid': 'N_usr_32', 'postid': 'U_post_17', 'ptype': 'post', 'tags': ['married', 'teenchild'], 'like': {'total': 1, 'usrnames': ['datauser1']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:50:50', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_17?alt=media'}, {'title': 'my first post new here', 'disc': 'my second post discription', 'usrname': 'datauser2', 'usrid': 'N_usr_32', 'postid': 'U_post_16', 'ptype': 'post', 'tags': ['married', 'singlechild'], 'like': {'total': 2, 'usrnames': ['datauser5', 'datauser3']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:50:34', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_16?alt=media'}, {'title': 'why my child has red rashes?', 'disc': 'my child discription', 'usrname': 'datauser3', 'usrid': 'N_usr_33', 'postid': 'U_post_19', 'ptype': 'question', 'tags': ['married', 'rashes', '2child'], 'like': {'total': 5, 'usrnames': ['datauser1', 'datauser3','datauser2', 'datauser4','datauser5']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:52:34', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_19?alt=media'}, {'title': 'why my child has fever?', 'disc': 'my child discription', 'usrname': 'datauser3', 'usrid': 'N_usr_33', 'postid': 'U_post_18', 'ptype': 'question', 'tags': ['married', 'fever', '2child'], 'like': {'total': 2, 'usrnames': ['datauser1', 'datauser4']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:52:18', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_18?alt=media'}, {'title': 'lovely smile', 'disc': 'my child discription', 'usrname': 'datauser4', 'usrid': 'N_usr_34', 'postid': 'U_post_21', 'ptype': 'post', 'tags': ['married', 'infant', 'singlechild'], 'like': {'total': 1, 'usrnames': ['datauser5']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:54:09', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_21?alt=media'}, {'title': 'why my child not eating?', 'disc': 'my child discription', 'usrname': 'datauser4', 'usrid': 'N_usr_34', 'postid': 'U_post_20', 'ptype': 'question', 'tags': ['married', 'infant'], 'like': {'total': 2, 'usrnames': ['datauser4', 'datauser5']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:53:46', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_20?alt=media'}, {'title': 'how to stop porn addiction of my child?', 'disc': 'my child discription', 'usrname': 'datauser5', 'usrid': 'N_usr_35', 'postid': 'U_post_23', 'ptype': 'question', 'tags': ['unmarried', 'teenchild', 'housewife'], 'like': {'total': 3, 'usrnames': ['datauser1', 'datauser3', 'datauser4']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:55:52', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_23?alt=media'}, {'title': 'lovely child`', 'disc': 'my child discription', 'usrname': 'datauser5', 'usrid': 'N_usr_35', 'postid': 'U_post_22', 'ptype': 'post', 'tags': ['un`married', 'teenchild'], 'like': {'total': 2, 'usrnames': ['datauser4', 'datauser5']}, 'comment': {'comments': [''], 'total': 0, 'usrnames': ['']}, 'timestamp': '20/02/2024_22:55:19', 'url': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/post_images%2FU_post_22?alt=media'}]
all_user_json_list = [{'usrname': 'datauser1', 'passwd': 'datauser1123', 'id': 'N_usr_31', 'hash': 'eaea235b965aacc92239af0672f50e8d', 'email': 'datauser1@gmail.com', 'age': 20, 'gender': 'male', 'tags': ['unmarried', 'single'], 'bio': 'my new bio for this profile', 'profession': 'teacher', 'posts': ['', 'U_post_14', 'U_post_15'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_31?alt=media', 'likedposts': [''], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}, {'usrname': 'datauser2', 'passwd': 'datauser2123', 'id': 'N_usr_32', 'hash': '168ffd39765e941442a13a0cef2c2a05', 'email': 'datauser2@gmail.com', 'age': 20, 'gender': 'male', 'tags': ['married', '1child', 'teenchild'], 'bio': 'my new bio for this profile', 'profession': 'teacher', 'posts': ['', 'U_post_16', 'U_post_17'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_32?alt=media', 'likedposts': [''], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}, {'usrname': 'datauser3', 'passwd': 'datauser3123', 'id': 'N_usr_33', 'hash': 'b23b55bd24ed7063c70f76ce2ad0bced', 'email': 'datauser3@gmail.com', 'age': 20, 'gender': 'female', 'tags': ['married', '2child'], 'bio': 'my new bio for this profile', 'profession': 'doctor', 'posts': ['', 'U_post_18', 'U_post_19'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_33?alt=media', 'likedposts': [''], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}, {'usrname': 'datauser4', 'passwd': 'datauser4123', 'id': 'N_usr_34', 'hash': '2fba1b465931a69e8a958cf2dd72dffa', 'email': 'datauser4@gmail.com', 'age': 20, 'gender': 'female', 'tags': ['married', 'singlechild', 'infant'], 'bio': 'my new bio for this profile', 'profession': 'engineer', 'posts': ['', 'U_post_20', 'U_post_21'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_34?alt=media', 'likedposts': [''], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}, {'usrname': 'datauser5', 'passwd': 'datauser5123', 'id': 'N_usr_35', 'hash': '1197a4182ed02368315e14f739ea30e7', 'email': 'datauser5@gmail.com', 'age': 20, 'gender': 'female', 'tags': ['unmarried', 'singlechild', 'teenchild'], 'bio': 'my new bio for this profile', 'profession': 'housewife', 'posts': ['', 'U_post_22', 'U_post_23'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_35?alt=media', 'likedposts': [''], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}]
user_json = {'usrname': 'datauser1', 'passwd': 'datauser1123', 'id': 'N_usr_31', 'hash': 'eaea235b965aacc92239af0672f50e8d', 'email': 'datauser1@gmail.com', 'age': 20, 'gender': 'male', 'tags': ['unmarried', 'single'], 'bio': 'my new bio for this profile', 'profession': 'teacher', 'posts': ['', 'U_post_14', 'U_post_15'], 'pimg': 'https://firebasestorage.googleapis.com/v0/b/parentapp-df60c.appspot.com/o/profile_images%2FN_usr_31?alt=media', 'likedposts': ['U_post_18', 'U_post_19'], 'followers': [''], 'following': [''], 'followingcount': 0, 'followerscount': 0}

every_n_hours(all_post_json_list, all_user_json_list)

print(user_recommendation(user_json=user_json))