import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DetailsPost } from "./DetailsPost";
import { Profile } from "./pages/Profile";
import { getuser, verifyuser } from "../redux/actions/userAction.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.body.classList.add(theme);
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(verifyuser());
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getuser(localStorage.getItem("username")));
    }
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SideBar user={user} />} />
          
          <Route element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          
        </Routes>

        <div className="sm:ml-64 dark:bg-black dark:text-white">
          <Routes>
            
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/login"} />}>
              <Route path="/" element={<Home />} />
            <Route path="/explore" element={<h1>Explore</h1>} />
            <Route path="/post/*" element={<DetailsPost />} />
            <Route path="/user/*" element={<Profile />} />
            </Route>
            
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </>
  );
}

export default App;
