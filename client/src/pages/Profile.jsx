import React, { useEffect, useState } from "react";
import { ProfileComp } from "../components/ProfileComp";
import { useDispatch, useSelector } from "react-redux";
import { getuserposts, getuserprofile } from "../../redux/actions/userAction";

export const Profile = () => {


  const { userprofile, getuserpostloading, userposts, usergetstatus, getuserprofileloading } = useSelector((state) => state.user);

  const [user, setUser] = useState();
  const [UserPosts, setUserPosts] = useState([]);
  const [userloading, setUserLoading] = useState(true);
  const [userfound, setUserFound] = useState(true);
  
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
    setUserLoading(getuserprofileloading);
    if (!getuserpostloading) {
      setUserPosts(userposts);
    }
  }, [getuserprofileloading, getuserpostloading]);

  useEffect(() => {
    setUserFound(usergetstatus);
  }, [usergetstatus]);


  return <>
      {userfound ?
        <ProfileComp posts={UserPosts} user={user} userloading={userloading} />
        :
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">User not found</h1>
        </div>
      }
    </>;
}
