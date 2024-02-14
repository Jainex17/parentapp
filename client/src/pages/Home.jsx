import { CreatePost } from "../components/posts/CreatePost.jsx";
import { Posts } from "../components/posts/Posts.jsx";

export const Home = () => {

  return (
    <>
      <div className="mx-8 sm:my-6 my-2">

        <div className="flex bg-white border border-grey-light-alt rounded mb-3 cursor-pointer">
          <div className="p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all border-b-2 border-blue-700">
            <h4 className="font-bold">For You</h4>
          </div>
          <div className="p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] ">
            <h4 className="font-bold text-gray-400">
              Following
            </h4>
          </div>
        </div>

        <CreatePost />
        <Posts />
      </div>


    </>
  );
};
