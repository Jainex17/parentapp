import { Post } from "./Post";

export const Posts = ({ posts }) => {

  function isThisPostLiked(postId) {
    // check if this post is liked by the user

    // fake logic
    if (postId === "1") {
      return true;
    }
    return false;
  }

  
  return (
    <>
      <section className="mt-2">
        {posts.map((post, index) => (
          <Post
            key={index}
            postId={post._id}
            username={post.username}
            userImage={post.userImage}
            postTime={post.postTime}
            postTitle={post.postTitle}
            postContent={post.postContent}
            postimage={post.postimage}
            postTag={post.postTag}
            postLikescount={post.likescount}
            postcommentscount={post.commentscount}
            isPostLiked={isThisPostLiked(post._id)} 
          />
        ))}
      </section>
    </>
  );
};
