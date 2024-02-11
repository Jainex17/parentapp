import { PropTypes } from "prop-types";

export const Login = ({setIsLoginPopup}) => {
  return <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.40)]">
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-gray-900 z-10" onClick={()=>setIsLoginPopup(false)}></div>
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 z-20">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Login
            </h1>  
        </div>
    </div>
  
  </>;
};

Login.propTypes = {
    setIsLoginPopup: PropTypes.func
};
