import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { Login } from "./components/Login";

function App() {
  const [isloginpopup, setIsLoginPopup] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isloginpopup ? "hidden" : "unset";
  }, [isloginpopup]);
  return (
    <>
      <BrowserRouter>
        <SideBar setIsLoginPopup={setIsLoginPopup} />

        {isloginpopup && (
          <Login setIsLoginPopup={setIsLoginPopup} />
        )}

        <div className="sm:ml-64 dark:bg-gray-800 dark:text-white">
          
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
