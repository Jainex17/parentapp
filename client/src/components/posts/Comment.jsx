import React from "react";

export const Comment = () => {
  return <>
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 p-4 mt-3 border-b border-gray-300">
            <div className="flex items-center">
              <img
                className="rounded-full h-10 w-10"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="User Avatar"
              />
              <div className="ml-2 flex items-center gap-2">
                <h3 className="text-base font-semibold">Emily Brown</h3>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <p className="text-base mt-4">
              Nice post! I've found that setting a timer for 25 minutes
            </p>
          </div>
  </>;
};
