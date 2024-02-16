import React, { useEffect } from "react";
import { DetailsPostComp } from "./components/posts/DetailsPostComp";
import { CommentsComp } from "./components/posts/CommentsComp";

export const DetailsPost = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  

return <>
    <div className="mx-8 sm:my-6 my-2">
      <DetailsPostComp />
      <CommentsComp />
    </div>
  </>;
};
