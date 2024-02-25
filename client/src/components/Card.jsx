import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ title, desc, time }) => {
  return (
    <>
      <article
        id="post"
        className="flex border border-gray-300 rounded bg-white cursor-pointer mb-2 px-4 sm:px-5 dark:bg-neutral-900 dark:border-gray-700"
      >
        <div className="w-full">
          <div className="pt-3">
            <div className="flex items-center text-xs mb-2">
              <Link
                to={`/}`}
                className="blur-picture flex self-start cursor-pointer"
              >
                <figure style={{ width: "48px" }}>
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      overflow: "hidden",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: "1",
                      border: "0px",
                      margin: "0px",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: "1",
                        border: "0px",
                        margin: "0px",
                        padding: "100% 0px 0px",
                      }}
                    ></span>
                    <img
                      src={"https://randomuser.me/api/portraits/men/32.jpg"}
                      alt="profile"
                      className="rounded-full object-cover"
                      style={{
                        position: "absolute",
                        inset: "0px",
                        boxSizing: "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        maxHeight: "100%",
                      }}
                    ></img>
                  </span>
                </figure>
              </Link>
              <div className="flex flex-col ml-3 w-full">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold dark:text-slate-100 text-black">
                    <Link to={`/`}>John Doe</Link>
                  </h3>
                  <span className="text-gray-700 dark:text-gray-400 text-sm pt-0.5">
                    2 hours ago
                  </span>
                </div>

                <h4 className="text-gray-700 dark:text-white mt-2 text-xl font-bold">
                  {title}
                </h4>

                <p className="text-gray-700 dark:text-gray-300 my-2 text-base">
                    {desc}
                </p>


                <div className="flex mt-3 justify-end">
                  <button
                    type="button"
                    className="flex gap-3 justify-center items-center text-white w-48 bg-[#3F72AF] border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
                    Join
                  </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
