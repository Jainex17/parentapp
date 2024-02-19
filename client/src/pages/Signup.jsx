import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupComp } from "../components/auth/SignupComp";

import { signup } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

export const Signup = () => {
  const [pfpimage, setPfpimage] = useState(null);

  const { loading } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      toast.error("Please fill in all fields");
      return;
    }
    // crop from email
    const username = e.target[0].value.split("@")[0];
    const password = e.target[2].value;
    const email = e.target[0].value;

    dispatch(signup({ username, password, email, pfpimage }));
  }

  const handlegooglesignupbtn = () => {
    console.log("Sign up with Google");
  }

  return <>
    <SignupComp handleSignupSubmit={handleSignupSubmit} pfpimage={pfpimage} setPfpimage={setPfpimage} handlegooglesignupbtn={handlegooglesignupbtn} loading={loading} />
  </>;
};
