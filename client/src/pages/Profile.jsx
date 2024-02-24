import React, { useEffect, useState } from "react";
import { ProfileComp } from "../components/ProfileComp";
import { useDispatch, useSelector } from "react-redux";
import { getuserposts, getuserprofile } from "../../redux/actions/userAction";

export const Profile = () => {


  const { userprofile, getuserloading, getuserpostloading, userposts } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const [UserPosts, setUserPosts] = useState([]);
  const [userloading, setUserLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)

    const url = window.location.href;
    const username = url.split("/").pop();
    setUser(null);
    dispatch(getuserprofile(username))
    dispatch(getuserposts(username))
  }, []);

  useEffect(() => {
    if (userprofile) {
      setUser(userprofile);
    }
  }, [userprofile]);

  useEffect(() => {
    setUserLoading(getuserloading);
    if (!getuserpostloading) {
      setUserPosts(userposts);
    }
  }, [getuserloading, getuserpostloading]);

  

  return <>
    <div>
      <ProfileComp posts={UserPosts} user={user} userloading={userloading} />
    </div>
  </>;
};
