import React from "react";
import { CreatePost } from "./CreatePost";
import { Comment } from "./Comment";

export const CommentsComp = ({user}) => {
  function handleCommentbtn(e) {
    e.preventDefault();
    console.log("Commented");
  }

  const postcomments = [{
      username: "alex",
      userpfp: "https://randomuser.me/api/portraits/men/12.jpg",
      comment: "Nice post!",
      time: "1 day ago",
    },
  {
      username: "david",
      userpfp: "https://randomuser.me/api/portraits/men/23.jpg",
      comment: "Wow, you're growing up so fast! Cherish these moments.",
      time: "2 days ago",
    },

  ];


  return (
    <>
      <div className="mt-5">
        <CreatePost iscommnents={true} handlepost={handleCommentbtn} user={user} />

        <div className="flex flex-col items-center border border-gray-300 rounded bg-white dark:bg-neutral-900 mt-10 dark:border-gray-700">
          {postcomments.map((comment, index) => (
           
          <Comment
            key={index}
            username={comment.username}
            userpfp={comment.userpfp}
            comment={comment.comment}
            time={comment.time}
          />
          ))}
        
        </div>
      </div>
    </>
  );
};
