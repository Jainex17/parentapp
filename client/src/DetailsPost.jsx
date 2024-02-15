import React from "react";
import { DetailsPostComp } from "./components/posts/DetailsPostComp";
import { CommentsComp } from "./components/posts/CommentsComp";

export const DetailsPost = () => {
  return <>
    <div className="mx-8 sm:my-6 my-2">
      <DetailsPostComp />
      <CommentsComp />
    </div>
  </>;
};
