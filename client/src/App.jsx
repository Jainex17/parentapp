import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <div className="p-4 sm:ml-64 dark:bg-gray-800 dark:text-white">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            
              {/* Placeholder grid items */}

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
