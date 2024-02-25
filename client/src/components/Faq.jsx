import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getfaq } from "../../redux/actions/userAction";

export const Faq = () => {

    const { faq, isfaqsloading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        if(faq.length === 0){
            dispatch(getfaq());
        }
    }, []);

    useEffect(() => {
        if(!isfaqsloading){
            setFaqs(faq);
        }
    }, [faq, isfaqsloading]);
    
    return (
    <>
      <div className="container">
        <form className="my-8 mx-20 flex">
          <input
            type="search"
            placeholder="Search"
            className="w-full p-2 border-2 border-gray-300 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
          <button className="bg-blue-400 text-white p-2 rounded-md ml-2 w-28">
            Search
          </button>
        </form>

        <div className="flex flex-col w-full">
            {isfaqsloading && <h1>Loading...</h1>}
            {faqs && faqs.map((faq, index) => (
                <article
                id="post"
                key={index}
                className="flex mx-10 border border-gray-300 rounded bg-white cursor-pointer mb-4 px-5 sm:px-10 dark:bg-neutral-900 dark:border-gray-700"
              >
                <div className="w-full">
                  <div className="pt-3">
                    <Link to={faq?.link}>
                      <h2 className="text-lg font-bold mb-1 text-black dark:text-white">
                        {faq?.title}
                       
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-base mt-2 mb-3">
                        {faq?.description}
                      </p>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </>
  );
};
