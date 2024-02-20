import React from "react";
import { CreatePost } from "./CreatePost";
import { Comment } from "./Comment";

export const CommentsComp = ({user}) => {
  function handleCommentbtn(e) {
    e.preventDefault();
    console.log("Commented");
  }

  return (
    <>
      <div className="mt-5">
        <CreatePost iscommnents={true} handlepost={handleCommentbtn} user={user} />

        <div className="flex flex-col items-center border border-gray-300 rounded bg-white dark:bg-neutral-900 mt-10 dark:border-gray-700">
          <Comment />
          <Comment />
          <Comment />
        
        </div>
      </div>
    </>
  );
};
