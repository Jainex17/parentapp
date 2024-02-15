import React from "react";
import { CreatePost } from "./CreatePost";
import { Comment } from "./Comment";

export const CommentsComp = () => {
  function handleCommentbtn(e) {
    e.preventDefault();
    console.log("Commented");
  }

  return (
    <>
      <div className="mt-5">
        <CreatePost iscommnents={true} handlepost={handleCommentbtn} />

        <div className="flex flex-col items-center border border-gray-300 rounded bg-white dark:bg-gray-800 mt-10">
          <Comment />
          <Comment />
          <Comment />
        
        </div>
      </div>
    </>
  );
};
