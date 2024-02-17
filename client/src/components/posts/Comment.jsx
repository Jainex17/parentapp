import React from "react";
import { Link } from "react-router-dom";

export const Comment = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full bg-white dark:bg-neutral-900 p-4 mt-3 border-b border-gray-300 dark:border-gray-700">
        <div>
        <div className="flex items-center">
          <Link Link to={"/user/23"}>
          <img
            className="rounded-full h-10 w-10"
            src="https://randomuser.me/api/portraits/women/12.jpg"
            alt="User Avatar"
          />
          </Link>
          <div className="ml-2 flex items-center gap-2">
            <Link to={"/user/32"}><h3 className="text-base font-semibold hover:underline">Emily Brown</h3></Link>
            <p className="text-xs text-gray-500">1 day ago</p>
          </div>
        </div>
        <p className="text-base mt-4">
          Nice post! I've found that setting a timer for 25 minutes
        </p>
      </div>
      <div className="flex flex-col p-2 justify-center items-center hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg" onClick={()=> handlePostLike(postId,isThisPostLiked,userId)}>    
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={"none"}
              stroke={"rgb(107 114 128)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="mt-1 text-xs font-semibold text-gray-500 select-none">
              32
            </span>
          </div>
      </div>
    </>
  );
};
