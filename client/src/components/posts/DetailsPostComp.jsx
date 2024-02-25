import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DetailsPostComp = ({detailspost, detailspostLoading}) => {

  const [likeCount, setLikeCount] = useState(detailspost?.like.total | 0); //23 replace with actual like count
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
    {detailspostLoading ? (
      // animate-pulse
      <div className="flex bg-white border border-gray-200 rounded mb-3 dark:bg-neutral-900 dark:border-gray-700">
        <div className="flex flex-col justify-between p-6 w-full">
          <div className="mb-5 flex items-center sm:gap-5 gap-2 border-b border-gray-300 pb-4 dark:border-gray-600">
            <div className="animate-pulse bg-gray-300 h-8 w-8 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-32 rounded-full"></div>
          </div>
          <div className="px-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full"></div>
                <div className="ml-2">
                  <div className="animate-pulse bg-gray-300 h-4 w-20 rounded-full mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-3 w-16 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="animate-pulse bg-gray-300 h-8 w-96 rounded-full"></div>
            </div>
            <div className="animate-pulse bg-gray-300 h-64 w-full rounded-lg mt-3"></div>
          </div>
          <div className="inline-flex items-center my-3">
          <div className="flex p-2 items-center rounded-lg">
            <div className="animate-pulse bg-gray-300 h-6 w-20 rounded-full"></div>
          </div>
          <div className="flex p-2 items-center rounded-lg ml-2">
            <div className="animate-pulse bg-gray-300 h-6 w-20 rounded-full"></div>
          </div>
          <div className="flex p-2 items-center rounded-lg ml-2">
            <div className="animate-pulse bg-gray-300 h-6 w-20 rounded-full"></div>
          </div>
        </div>
        </div>
      </div>
    )
      :
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
                  className="sm:h-12 sm:w-12 w-10 h-10 rounded-full object-cover"
                  src={detailspost?.usrpg}
                />
                <div className="ml-2">
                  <h3 className="sm:text-base text-sm font-semibold">{detailspost?.usrname}</h3>
                  <p className="sm:text-sm text-xs text-gray-500">{detailspost?.timestamp.split("_")[0]}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <h2 className="sm:text-2xl font-bold mb-1 mt-4 text-gray-800 dark:text-white">
                {detailspost?.title}
                
              {detailspost?.tags ?
                
                detailspost?.tags.length > 1 ? detailspost?.tags.map((tag,key) => (
                  
                <span className="sm:text-sm text-xs bg-[#DBE2EF] dark:bg-blue-600 dark:text-gray-100 text-gray-700 sm:px-2.5 px-1 sm:py-1.5 py-1 ml-2 rounded-full" key={key}>
                    {tag}
                </span>
                )): <span className="text-xs bg-[#DBE2EF] text-gray-700 px-2 py-1 ml-2 rounded-full">
                {detailspost?.tags}
              </span> : null}
              </h2>
            </div>
            <p className="dark:text-gray-300 text-gray-800 text-base mt-2">
              {detailspost?.disc}
            </p>
            {detailspost?.url && 
            <div className="flex justify-center lg:mx-24 lg:my-4">
              <img
                className="rounded-lg mt-3 h-auto w-auto"
                src={detailspost?.url}
                alt="post image"
              />
            </div>
            }
          </div>
          <div className="inline-flex items-center my-3">
          <div className="flex p-2 items-center hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg cursor-pointer" onClick={()=> handlePostLike(postId,isThisPostLiked,userId)}>
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
          <div className="flex p-2 items-center hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg ml-2 cursor-pointer">
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
              {detailspost?.comment.total} Comments
            </span>
          </div>
          <div className="flex p-2 items-center hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg ml-2 cursor-not-allowed">
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
    }
    </>
  );
};
