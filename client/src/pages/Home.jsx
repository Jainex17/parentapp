import { useEffect, useState } from "react";
import { CreatePost } from "../components/posts/CreatePost.jsx";
import { Posts } from "../components/posts/Posts.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getallposts } from "../../redux/actions/userAction.js";
import { toast } from "react-toastify";

export const Home = () => {
  const [PostsTab, setPostsTab] = useState(0);
  const [ispostsloading, setIsPostsLoading] = useState(true);
  const [ForYouPosts, setForYouPosts] = useState([]);

  const dispatch = useDispatch();
  const { isAuthenticated, user, postsloading, posts, createpoststatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && posts.length === 0) {
      dispatch(getallposts());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (createpoststatus) {
      toast.success("Post Moderation passed. Post Created Successfully");
      dispatch(getallposts());

      setTimeout(() => {
        setForYouPosts(posts);
      }, 500);
    }
  }, [createpoststatus]);

  useEffect(() => {
    if (!postsloading) {
      setIsPostsLoading(false);
      setForYouPosts(posts);
    }
  }, [postsloading]);

  return (
    <>
      <div className="mx-8 sm:my-6 my-2 mr-20">
        <div className="flex bg-white border border-gray-300 rounded mb-5 cursor-pointer dark:bg-neutral-900 dark:border-gray-700">
          <div
            className={
              "p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all " +
              (PostsTab === 0 ? "border-b-2 border-blue-700 dark:border-gray-300" : "border-none")
            }
            onClick={() => setPostsTab(0)}
          >
            <h4 className={"font-bold " + (PostsTab === 1 && "text-gray-400")}>
              For You
            </h4>
          </div>
          <div
            className={
              "p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all " +
              (PostsTab === 1 ? "border-b-2 border-blue-700 dark:border-gray-300" : "border-none")
            }
            onClick={() => setPostsTab(1)}
          >
            <h4 className={"font-bold " + (PostsTab === 0 && "text-gray-400")}>
              Following
            </h4>
          </div>
        </div>

        <CreatePost user={user} />

        {ispostsloading ? (
          <div className="flex items-center justify-center mt-20">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : PostsTab === 0 ? (
          <Posts posts={ForYouPosts} />
        ) : (
          <Posts posts={ForYouPosts} />
        )}

      </div>
    </>
  );
};
