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

  // samole timestamp 17/02/2024_19:42:19
  const findPostTime = (timestamp) => {
    if (!timestamp) return;
    var date = timestamp.split("_")[0];
    return date
  }

  

  return (
    <>
      <section className="mt-2">
        {posts.map((post, index) => (
          <Post
            key={index}
            postId={post.postid}
            username={post.usrname}
            userImage={post.usrpg}
            postTime={findPostTime(post.timestamp)}
            postTitle={post.title}
            postContent={post.disc}
            postimage={post.url}
            postTag={post.tags == "" ? null : post.tags}
            postLikescount={post.like.total}
            postcommentscount={post.comment.total}
            isPostLiked={isThisPostLiked(post.postid)} 
          />
        ))}
      </section>
    </>
  );
};
