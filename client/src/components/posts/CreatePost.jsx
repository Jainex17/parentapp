import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createpost, getallposts } from "../../../redux/actions/userAction";
import Tags from "./Tags";

export const CreatePost = ({ iscommnents, user }) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [textareavalue, setTextareavalue] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postimages, setPostimages] = useState([]);
  const [ispostable, setIsPostable] = useState(false);
  const [selected, setSelected] = useState({});
    

  const dispatch = useDispatch();
  const { createingpostloading } = useSelector((state) => state.user);

  const fileInputRef = useRef(null);

  function handletextareavalue(e) {
    setTextareavalue(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 320)}px`;
  }

  const handleimageupload = (e) => {
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg"
    ) {
      toast.error("Only jpeg, jpg and png files are allowed");
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size should be less than 2MB");
      return;
    }

    setPostimages([...postimages, e.target.files[0]]);
  };

  useEffect(() => {
    
    if (textareavalue.trim() !== "" && postTitle.trim() !== "" && Object.keys(selected).length > 0){
      setIsPostable(true);
    } else {
      setIsPostable(false);
    }
  }, [textareavalue, postTitle, selected]);

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (document.body.classList.contains("dark")) {
      setTheme("dark");
    }
  });

  const handlepost = (e) => {
    e.preventDefault();
    if (textareavalue.trim() === "" && postimages.length === 0) {
      toast.error("Please write something or add a media");
      return;
    }
    if (!iscommnents) {
      // for creating post
      const resultArray = [];

      for (const key in selected) {
        resultArray.push(selected[key]);
      }
      console.log(resultArray);
      

      dispatch(createpost({ postTitle, textareavalue, postimages, resultArray }));
      if (createingpostloading) {
        toast.info("Posting...");
      }
      setPostTitle("");
      setTextareavalue("");
      setPostimages([]);
      setSelected({});
    } else {
      // for creating comment
    }
  };

  return (
    <>
      <form
        className="flex flex-col bg-white border border-gray-300 rounded dark:bg-neutral-900 dark:border-gray-700 mb-5"
        onSubmit={handlepost}
      >
        <label
          className="hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3"
          htmlFor="post-input"
        >
          <Link
            to={"/user/12"}
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
                  src={
                    user?.pimg ||
                    "https://randomuser.me/api/portraits/men/32.jpg"
                  }
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
          <div className="flex w-full flex-col gap-4">
            <div className="flex min-h-[48px] w-full flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center gap-5 pt-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full text-sm min-w-0 outline-none dark:text-white dark:bg-neutral-800 p-2 rounded-md border border-gray-300 dark:border-gray-700"
                  />
                  <textarea
                    className="w-full min-w-0 resize-none bg-transparent text-sm outline-none dark:text-white pl-2 pt-2 pr-14 dark:bg-neutral-800 rounded-md border border-gray-300 dark:border-gray-700"
                    placeholder={iscommnents ? "Write a comment..." : "Text"}
                    style={{ height: "px !important" }}
                    value={textareavalue}
                    onChange={handletextareavalue}
                  ></textarea>
                  
                  <Tags selected={selected} setSelected={setSelected} />
                </div>

                {!iscommnents && postimages.length > 0 && (
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
                          onClick={() =>
                            setPostimages(
                              postimages.filter((_, i) => i !== index)
                            )
                          }
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
              {!iscommnents && (
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
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <div className="invisible absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#666666] px-1 py-0.5 text-xs text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69] group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible group-focus-visible:opacity-100 translate-y-3">
                      <span>Media</span>
                    </div>
                  </button>

                  <button
                    className="group relative rounded-full p-2 mx-1 hover:bg-gray-100 dark:hover:bg-[#2D3748] active:bg-gray-200 dark:active:bg-[#1F2937] hidden sm:block"
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
                      onEmojiClick={(e, emoji) =>
                        setTextareavalue(textareavalue + e.emoji)
                      }
                      emojiStyle="native"
                      theme={theme}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                {!iscommnents ? (
                  <button
                    className={
                      "px-8 py-1.5 font-bold text-white bg-[#3F72AF] rounded-full" +
                      (ispostable
                        ? " cursor-pointer"
                        : " bg-slate-500 cursor-not-allowed")
                    }
                    type="submit"
                  >
                    {createingpostloading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 animate-spin dark:text-gray-600 fill-white mr-3"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>

                        <span>posting...</span>
                      </div>
                    ) : (
                      "Post"
                    )}
                  </button>
                ) : (
                  <button
                    className={
                      "px-8 py-1.5 font-bold text-white bg-[#3F72AF] rounded-full" +
                      (ispostable
                        ? " cursor-pointer"
                        : " bg-slate-500 cursor-not-allowed")
                    }
                    type="submit"
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>
          </div>
        </label>
      </form>
      {emojiPicker && (
        <div
          className="absolute top-0 right-0 z-2 p-2 h-full w-full inset-0"
          onClick={() => setEmojiPicker(false)}
        />
      )}
    </>
  );
};
