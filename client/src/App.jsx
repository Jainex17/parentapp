import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DetailsPost } from "./DetailsPost";
import { Profile } from "./pages/Profile";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.documentElement.classList.add(theme);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SideBar />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <div className="sm:ml-64 dark:bg-black dark:text-white">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<h1>Explore</h1>} />
            <Route path="/post/*" element={<DetailsPost />} />
            <Route path="/user/*" element={<Profile />} />
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
