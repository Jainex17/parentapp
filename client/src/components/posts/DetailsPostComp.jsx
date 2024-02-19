import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DetailsPostComp = () => {

  const [likeCount, setLikeCount] = useState(23); //23 replace with actual like count
  const [isThisPostLiked, setIsThisPostLiked] = useState(false); // false replace with actual like status

  function handlePostLike(postId, isPostLiked, userId) {
    if (isPostLiked) {
      // unlike post
      setLikeCount(likeCount - 1);
      setIsThisPostLiked(false);
    } else {
      // like post
      setLikeCount(likeCount + 1);
      setIsThisPostLiked(true);
    }
  }

  const userId  = "1"; // fake user id and user id
  const postId  = "1"; // fake user id and post id
 
  return (
    <>
      <div className="flex bg-white border border-gray-200 rounded mb-3 dark:bg-neutral-900 dark:border-gray-700">
        <div className="flex flex-col justify-between p-6 w-full">
          <div className="mb-5 flex items-center sm:gap-5 gap-2 border-b border-gray-300 pb-4 dark:border-gray-600">
            <Link to={"/"} className="hover:bg-gray-300 p-2 rounded-full dark:hover:bg-opacity-50">
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
            <h2 className="sm:text-2xl font-bold">Post</h2>
          </div>
          <div className="px-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  alt="avatar"
                  className="sm:h-12 sm:w-12 w-10 h-10 rounded-full"
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                />
                <div className="ml-2">
                  <h3 className="sm:text-base text-sm font-semibold">Emily Brown</h3>
                  <p className="sm:text-sm text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <h2 className="sm:text-2xl font-bold mb-1 mt-4 text-gray-800 dark:text-white">
                Tips for a Productive Workday
                <span className="sm:text-sm text-xs bg-[#DBE2EF] dark:bg-blue-600 dark:text-gray-100 text-gray-700 sm:px-2.5 px-1 sm:py-1.5 py-1 ml-2 rounded-full">
                  Productivity
                </span>
              </h2>
            </div>
            <p className="dark:text-gray-300 text-gray-800 text-base mt-2">
              As someone who works from home, I've learned a few tips and tricks
              to stay productive throughout the day. One thing that has really
              helped me is creating a dedicated workspace free from
              distractions. I also like to break up my day into smaller tasks
              and take regular breaks to avoid burnout. What are some of your
              favorite productivity tips? Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Nemo provident blanditiis, adipisci
              animi ullam id suscipit temporibus a culpa possimus porro
              quibusdam sit odit alias mollitia aliquid? Corporis, doloremque
              blanditiis!
            </p>
            <div className="flex justify-center lg:mx-24 lg:my-4">
              <img
                className="rounded-lg mt-3 h-auto w-auto"
                src="https://images.unsplash.com/photo-1503431153573-96e959f4d9b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="post image"
              />
            </div>
          </div>
          <div className="inline-flex items-center my-3">
          <div className="flex p-2 items-center hover:bg-gray-200 rounded-lg cursor-pointer" onClick={()=> handlePostLike(postId,isThisPostLiked,userId)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isThisPostLiked ? "red" : "none"}
              stroke="rgb(107 114 128)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="ml-2 text-xs font-semibold text-gray-500 select-none">
              {likeCount} Likes
            </span>
          </div>
          <div className="flex p-2 items-center hover:bg-gray-200 rounded-lg ml-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(107 114 128)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="ml-2 text-xs font-semibold text-gray-500 select-none">
              23 Comments
            </span>
          </div>
          <div className="flex p-2 items-center hover:bg-gray-200 rounded-lg ml-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(107 114 128)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <span className="ml-2 text-xs font-semibold text-gray-500 select-none">
              More
            </span>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
