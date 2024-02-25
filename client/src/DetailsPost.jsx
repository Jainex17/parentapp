import React, { useEffect, useState } from "react";
import { DetailsPostComp } from "./components/posts/DetailsPostComp";
import { CommentsComp } from "./components/posts/CommentsComp";
import { useDispatch, useSelector } from "react-redux";
import { getpostdetails } from "../redux/actions/userAction";

export const DetailsPost = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { user, postdetails, getpostdetailloading } = useSelector((state) => state.user);
  const [detailspost, setDetailsPost] = useState();
  const [detailspostLoading, setDetailsPostLoading] = useState(true);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const url = window.location.href;
    const username = url.split("/")[4];
    const postid = url.split("/")[5];
    
    dispatch(getpostdetails(postid,username));
  }, []);

  useEffect(() => {
    setDetailsPost(postdetails);
  }, [postdetails]);

  useEffect(() => {
    setDetailsPostLoading(getpostdetailloading);
  }, [getpostdetailloading]);


  
return <>
    <div className="mx-8 sm:my-6 my-2">
      <DetailsPostComp detailspost={detailspost} detailspostLoading={detailspostLoading} />
      <CommentsComp user={user} />
    </div>
  </>;
};
