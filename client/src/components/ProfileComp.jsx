import React from "react";
import { Link } from "react-router-dom";
import { Post } from "./posts/Post";

export const ProfileComp = ({ posts, user  }) => {
  
  return (
    <>
      <div className="bg-white dark:bg-black dark:text-white">
        <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 p-3">
          <Link to={"/"} className="hover:bg-gray-300 dark:bg-opacity-40 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </Link>
          <h2 className="sm:text-2xl font-bold">{user.usrname}</h2>
        </div>

        <div>
          <div className="w-full sm:h-60 h-28 object-cover bg-neutral-800">
            {/* <img
              src="https://plus.unsplash.com/premium_photo-1664803966184-ab1a6d9e0fc4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              className="w-full sm:h-60 h-28 object-cover"
            /> */}
          </div>

          <div className="sm:-my-[6.5rem] -my-10 sm:ml-10 ml-5 flex items-center">
            <img
              src={user?.pimg}
              alt="profile"
              className="sm:w-52 sm:h-52 w-20 h-20 rounded-full border-4 border-white cursor-pointer object-cover"
            />
          </div>

          <div className="flex items-center justify-end gap-3 lg:mr-20 mr-5">
            <button className="bg-white dark:bg-neutral-900 text-black dark:text-white font-bold py-2 px-2 rounded-full mt-5 border border-gray-200 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>

            <button className="bg-[#3F72AF] text-white font-bold py-2 lg:px-20 sm:px-7 px-5 rounded-full mt-5 hover:bg-[#2E5AA3]">
              Follow
            </button>
          </div>
        </div>

        <div className="sm:mt-16 mt-10 sm:ml-16 ml-5">
          <h2 className="sm:text-2xl font-bold text-black dark:text-white">
            {user?.usrname}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-1">
            {user?.bio}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-500 mt-3">
            <div className="flex items-center gap-2">
             
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  ></path>
                </svg>
             
              <button className="hover:underline group relative dark:text-gray-400">
                Joined February 2024
              </button>
            </div>
          </div>
          {/* tags */}
          <div className="flex items-center gap-2 mt-4">
            <span className="py-1 px-3 bg-gray-500 rounded-full text-white">Maried</span>
            <span className="py-1 px-3 bg-gray-500 rounded-full text-white">House Wife</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div>
              <h2 className="font-bold text-black dark:text-white">
                {user?.followerscount}
                <span className="text-gray-500 ml-2">Followers</span>
              </h2>
            </div>
            <div>
              <h2 className="font-bold text-black dark:text-white">
                 {user?.followingcount}
                 <span className="text-gray-500 ml-1">Following</span>
              </h2>
            </div>
          </div>
        </div>
        
        {/* posts */}
        <div className="mt-10 mx-10">
          
          
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
        </div>
       



      </div>
    </>
  );
};
