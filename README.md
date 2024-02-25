Project Name: ParentApp

Sustainable Development Goals: Good Health and Wellbeing, Quality Education.

Team Members:
1.	Daksh Oza - B.Tech CSE, Sem 6
2.	Dylan Moraes - B.Tech CSE, Sem 6
3.	Shahil Kadia - B.Tech CSE, Sem 4
4.	Jainex Patel - AIIT MCA, SEM II

ParentApp is a dedicated social platform designed for parents of all stages – expectant, new, and experienced. ParentApp serves as a virtual meeting place, fostering connections, sharing experiences, and offering valuable support for the beautiful journey of parenthood.

Key Features:
1.	Effortless Onboarding: Simple account creation with personalized details about your parenting journey, creating a warm and inviting community.

2.	Expressive Post Creation:Craft engaging posts with a mandatory title and the freedom to share images, videos, or text. Interact through comments, reposts, and likes for vibrant discussions.

3.	Post moderation: Post moderation using google cloud NLP api to maintain safe, respectful, and positive online community interactions.

4.	Community Bonds: Encourage social connections by following and being followed, building a network of support and shared experiences.

5.	Tailored Chatbot Support: A personalized chatbot offers tailored responses based on individual parenting insights, providing relevant and timely information.

6.	Relevant News in Articles: Explore articles related to parenting in the articles feed.

7.	Curated Feeds with Recommendations: The 'For You Feed' delivers personalized posts and suggests users to follow, creating a curated experience tailored to each parent. The 'Home Feed' showcases posts from followed users, fostering a sense of community.

8.	Expressive User Profiles: Individualized profile pages feature a profile photo, a bio, personalized tags, and user-created posts, allowing for a personalized and expressive online presence.





Recommendation Engine:
The recommendation engine houses functions that go from fetching data from our platform, preprocessing the data, feeding it to our hybrid recommendation algorithm and returning a list of recommended posts. It houses 2 functions:

1. every_n_hours() - a function meant to run periodically that processes large scale data in order to be used at the time of recommendation. Running this function results in new files being created and stored that are necessary for the user_recommendation() function. This function returns True on successful execution.

2. user_recommendation() - a function that is called at the time of recommendation of posts to a user. It accepts one parameter, being the username of the user to recommend posts for. The function runs the algorithm and returns a list of jsons representing posts that can directly be rendered in the front end on the for you page.

