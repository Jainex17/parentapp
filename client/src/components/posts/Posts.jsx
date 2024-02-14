import { Post } from "./Post";

export const Posts = ({posts}) => {

  return (
    <>
      <section className="mt-2">

        {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          userImage={post.userImage}
          postTime={post.postTime}
          postTitle={post.postTitle}
          postContent={post.postContent}
          postimage={post.postimage}
          postTag={post.postTag}
        />
        ))}

      </section>
    </>
  );
};
