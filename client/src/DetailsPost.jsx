import React, { useEffect, useState } from "react";
import { DetailsPostComp } from "./components/posts/DetailsPostComp";
import { CommentsComp } from "./components/posts/CommentsComp";
import { useDispatch, useSelector } from "react-redux";
import { getpostbyid } from "../redux/actions/userAction";

export const DetailsPost = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { user, postsbyid } = useSelector((state) => state.user);
  const [detailspost, setDetailsPost] = useState();

  const dispatch = useDispatch();
  
  useEffect(() => {
    const url = window.location.href;
    const username = url.split("/")[4];
    const postid = url.split("/")[5];
    
    dispatch(getpostbyid(postid,username))
  }, []);

  useEffect(() => {
    setDetailsPost(postsbyid);
  }, [postsbyid]);
console.log(postsbyid);


return <>
    <div className="mx-8 sm:my-6 my-2">
      <DetailsPostComp detailspost={detailspost} />
      <CommentsComp user={user} />
    </div>
  </>;
};
