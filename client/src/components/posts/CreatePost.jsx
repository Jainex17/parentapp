import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";

export const CreatePost = () => {
    
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [textareavalue, setTextareavalue] = useState("");
  const [postimages, setPostimages] = useState([]);
  const [ispostable, setIsPostable] = useState(false);

  const fileInputRef = useRef(null);

    function handletextareavalue(e) {
      setTextareavalue(e.target.value);
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 320)}px`; 
      console.log(postimages);
      
    }

    const handleimageupload = (e) => {
      if(e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpg") {
          toast.error("Only jpeg, jpg and png files are allowed");
          return;
      }
      if(e.target.files[0].size > 2000000) {
          toast.error("File size should be less than 2MB");
          return;
      }
      
      setPostimages([...postimages, e.target.files[0]]);
      console.log(postimages);
    }

    const handleCreatePost = (e) => {
      e.preventDefault();
      
      console.log("Post created");
      setTextareavalue("");
      setPostimages([]);
    }
    
    useEffect(() => {
      if(textareavalue.trim() !== "" || postimages.length > 0) {
        setIsPostable(true);
      } else {
        setIsPostable(false);
      }
    }, [textareavalue, postimages]);

  
  return <>
    <form className="flex flex-col bg-white border border-grey-light-alt rounded" onSubmit={handleCreatePost}>
          <label
            className="hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3"
            htmlFor="post-input"
          >
            <a className="blur-picture flex self-start cursor-pointer">
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
                    src="https://randomuser.me/api/portraits/men/32.jpg"
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
            </a>
            <div className="flex w-full flex-col gap-4">
              <div className="flex min-h-[48px] w-full flex-col justify-center gap-4">
                <div className="flex flex-col gap-6">
                  {/* post privacy */}
                  {/* <button
                    type="button"
                    className="flex items-center gap-1 self-start border py-0 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D3748] dark:border-[#2D3748] dark:text-white ml-1"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <p className="font-bold">Everyone</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>
                  </button> */}
                  <div className="flex items-center gap-3 pt-2">
                    <textarea
                      className="w-full min-w-0 resize-none bg-transparent text-xl outline-none dark:text-white pl-2 pr-14"
                        placeholder="What's happening?"
                        style={{ height: "px !important" }}
                        value={textareavalue}
                        onChange={handletextareavalue}
                    ></textarea>
                    
                  </div>
                  {postimages.length > 0 && (
                    <div className="flex gap-2 justify-center">
                      {postimages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="postimage"
                            className="w-[31rem] h-[20rem] object-cover rounded-lg cursor-pointer hover:brightness-75 transition-all duration-300 ease-in-out"
                          />
                          <button
                            type="button"
                            onClick={() => setPostimages(postimages.filter((_, i) => i !== index))}
                            className="absolute top-0 right-0 m-2 p-1 bg-black rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
              <div
                className="flex justify-between"
                data-projection-id="120"
                style={{ opacity: 1 }}
              >
                <div className="flex text-main-accent xs:[&>button:nth-child(n+6)]:hidden md:[&>button]:!block [&>button:nth-child(n+4)]:hidden">
                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleimageupload}
                    disabled={postimages.length >= 1 ? true : false}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="group relative rounded-full p-2 mr-3 hover:bg-gray-100 dark:hover:bg-[#2D3748] active:bg-gray-200 dark:active:bg-[#1F2937]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F72AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" ><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <div className="invisible absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#666666] px-1 py-0.5 text-xs text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69] group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible group-focus-visible:opacity-100 translate-y-3">
                      <span>Media</span>
                    </div>
                  </button>

                  <button
                    className="group relative rounded-full p-2 mx-1 hover:bg-gray-100 dark:hover:bg-[#2D3748] active:bg-gray-200 dark:active:bg-[#1F2937]"
                    type="button"
                    onClick={() => setEmojiPicker(!emojiPicker)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3F72AF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-smile-plus"
                    >
                      <path d="M22 11v1a10 10 0 1 1-9-10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" x2="9.01" y1="9" y2="9" />
                      <line x1="15" x2="15.01" y1="9" y2="9" />
                      <path d="M16 5h6" />
                      <path d="M19 2v6" />
                    </svg>
                    <div className="invisible absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#666666] px-1 py-0.5 text-xs text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69] group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible group-focus-visible:opacity-100 translate-y-3">
                      <span>Eomji</span>
                    </div>
                  </button>
                  <div className="flex items-center gap-3 absolute ml-14 mt-10 z-10">
                  <EmojiPicker
                    open={emojiPicker}
                    onEmojiClick={(e, emoji) => setTextareavalue(textareavalue + e.emoji)}
                    emojiStyle="native"
                    /> 
                    </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className={'px-8 py-1.5 font-bold text-white bg-[#3F72AF] rounded-full' + (ispostable ? ' cursor-pointer' : ' bg-slate-400 cursor-not-allowed')}
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </label>
        </form>
        {emojiPicker && (
          <div className="absolute top-0 right-0 z-2 p-2 h-full w-full inset-0" onClick={()=>setEmojiPicker(false)}/>
        )}
  </>;
};
