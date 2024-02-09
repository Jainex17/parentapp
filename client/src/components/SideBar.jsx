import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const [isopen, setIsOpen] = useState(false);
  const handleToggle = () => {
    const sidebar = document.getElementById("default-sidebar");
    sidebar.classList.toggle("-translate-x-full");
    setIsOpen(!isopen);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={handleToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 border border-[#DBE2EF] dark:border-gray-700 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white pl-5">
              ParentApp
            </h1>
            {isopen ? (
              <button
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mr-5"
                onClick={handleToggle}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ) : null}
          </div>
          <div className="px-4">
            <ul className="space-y-2 font-medium mt-7">
              <li>
                <Link
                  to={"/"}
                  className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap pl-2 font-bold">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/explore"}
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pl-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="9" x2="20" y2="9"></line>
                    <line x1="4" y1="15" x2="20" y2="15"></line>
                    <line x1="10" y1="3" x2="8" y2="21"></line>
                    <line x1="16" y1="3" x2="14" y2="21"></line>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap pl-2 font-bold">
                    Explore
                  </span>
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400 font-semibold">
                Some Title
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    to={"/login"}
                    className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pl-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap pl-2 font-bold">
                      Can Add Somting
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="fixed bottom-2 sm:w-[100%] w-auto p-4 bg-gray-50 dark:bg-gray-800 border-r border-t border-[#DBE2EF] dark:border-gray-700 cursor-pointer">
            {/* profile */}
            <div className="flex items-center space-x-4">
              <img
                src="	https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  Jetha Gada
                </h4>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  jetha43@gmail.com
                </p>
              </div>
            </div>

            {/* signin btn */}
            <div>
              <button className="bg-[#3F72AF] text-white w-full py-2 mt-4 rounded-lg font-semibold dark:bg-[#3F72AF] dark:text-white">
                SignIn
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
