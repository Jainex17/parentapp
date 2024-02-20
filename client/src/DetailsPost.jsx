import React, { useEffect } from "react";
import { DetailsPostComp } from "./components/posts/DetailsPostComp";
import { CommentsComp } from "./components/posts/CommentsComp";
import { useSelector } from "react-redux";

export const DetailsPost = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { user } = useSelector((state) => state.user);
  

return <>
    <div className="mx-8 sm:my-6 my-2">
      <DetailsPostComp />
      <CommentsComp user={user} />
    </div>
  </>;
};
