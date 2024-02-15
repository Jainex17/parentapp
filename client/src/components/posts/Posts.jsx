import { Post } from "./Post";

export const Posts = ({ posts }) => {
  
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
            isPostLiked={true} // isPostLiked={userId === post.likes.find((like) => like === userId)} check if user has liked the post
          />
        ))}
      </section>
    </>
  );
};
