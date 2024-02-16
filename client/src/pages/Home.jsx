import { useEffect, useState } from "react";
import { CreatePost } from "../components/posts/CreatePost.jsx";
import { Posts } from "../components/posts/Posts.jsx";

export const Home = () => {
  const [PostsTab, setPostsTab] = useState(0);
  const [ispostsloading, setIsPostsLoading] = useState(true);

  const ForYouPosts = [
    {
      _id: "1",
      username: "John Doe",
      userImage: "https://randomuser.me/api/portraits/women/2.jpg",
      postTime: "2 hours ago",
      postTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      postContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue.",
      postimage:
        "https://plus.unsplash.com/premium_photo-1680720885676-81e3bdee4237?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postTag: "React",
      likescount: 10,
      commentscount: 5,
    },
    {
      _id: "2",
      username: "Test User",
      userImage: "https://randomuser.me/api/portraits/women/32.jpg",
      postTime: "5 hours ago",
      postTitle: "why do we use it?",
      postContent:
        "react is a javascript library for building user interfaces. It is maintained by facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded. However, fetching data is only the beginning of what happens on a web page, which is why we're building a new kind of a component. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem.",
      postTag: "question",
      likescount: 5,
      commentscount: 2,
    },
    {
      _id: "3",
      username: "Jetha Gada",
      userImage: "https://randomuser.me/api/portraits/women/12.jpg",
      postTime: "1 day ago",
      postTitle: "My Elctronic Shop",
      postContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue.",
      postimage:
        "https://images.unsplash.com/photo-1503431153573-96e959f4d9b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postTag: "Shop",
      likescount: 20,
      commentscount: 8,
    },
  ];

  const FollowingPosts = [
    {
      _id: "4",
      username: "Alice Smith",
      userImage: "https://randomuser.me/api/portraits/women/22.jpg",
      postTime: "3 hours ago",
      postTitle: "Exploring the Wilderness",
      postContent:
        "Today, I went on an amazing adventure through the forest. The sights and sounds of nature were truly breathtaking. I saw deer, rabbits, and even a majestic eagle soaring overhead. It was a reminder of the beauty of our planet and the importance of preserving it for future generations.",
      postTag: "Nature",
      likescount: 132,
      commentscount: 100,
    },
    {
      _id: "5",
      username: "Bob Johnson",
      userImage: "https://randomuser.me/api/portraits/men/11.jpg",
      postTime: "6 hours ago",
      postTitle: "Delicious Homemade Pizza Recipe",
      postContent:
        "Who doesn't love pizza? I just made the most amazing homemade pizza, and I have to share the recipe with you all. It's super easy and incredibly delicious. All you need is some pizza dough, tomato sauce, cheese, and your favorite toppings. Trust me, once you try this recipe, you'll never order pizza delivery again!",
      postTag: "Food",
      likescount: 150,
      commentscount: 8,
    },
    {
      _id: "6",
      username: "Emily Brown",
      userImage: "https://randomuser.me/api/portraits/women/42.jpg",
      postTime: "Yesterday",
      postTitle: "Tips for a Productive Workday",
      postContent:
        "As someone who works from home, I've learned a few tips and tricks to stay productive throughout the day. One thing that has really helped me is creating a dedicated workspace free from distractions. I also like to break up my day into smaller tasks and take regular breaks to avoid burnout. What are some of your favorite productivity tips?",
      postTag: "Productivity",
      likescount: 14,
      commentscount: 5,
    },
    {
      _id: "7",
      username: "David Wilson",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      postTime: "2 days ago",
      postTitle: "Traveling to Japan: A Cultural Experience",
      postContent:
        "Last week, I had the opportunity to travel to Japan, and it was an experience I'll never forget. From the bustling streets of Tokyo to the serene temples in Kyoto, Japan is a country full of rich culture and history. The food was amazing, the people were friendly, and the sights were breathtaking. I can't wait to go back and explore more of this beautiful country!",
      postTag: "Travel",
      likescount: 15,
      commentscount: 1,
    },
  ];

  function handlepostbtn(e) {
    e.preventDefault();
    console.log("Post Created");
  }

  useEffect(() => {
    // fack loading will be removed after integrating with backend
    setTimeout(() => {
      setIsPostsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="mx-8 sm:my-6 my-2 mr-20">
        <div className="flex bg-white border border-gray-300 rounded mb-3 cursor-pointer dark:bg-gray-800 dark:border-gray-700">
          <div
            className={
              "p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all " +
              (PostsTab === 0 ? "border-b-2 border-blue-700 dark:border-gray-300" : "border-none")
            }
            onClick={() => setPostsTab(0)}
          >
            <h4 className={"font-bold " + (PostsTab === 1 && "text-gray-400")}>
              For You
            </h4>
          </div>
          <div
            className={
              "p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all " +
              (PostsTab === 1 ? "border-b-2 border-blue-700 dark:border-gray-300" : "border-none")
            }
            onClick={() => setPostsTab(1)}
          >
            <h4 className={"font-bold " + (PostsTab === 0 && "text-gray-400")}>
              Following
            </h4>
          </div>
        </div>

        <CreatePost handlepost={handlepostbtn} />

        {ispostsloading ? (
          <div className="flex items-center justify-center mt-20">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          </div>
        ) : PostsTab === 0 ? (
          <Posts posts={ForYouPosts} />
        ) : (
          <Posts posts={FollowingPosts} />
        )}
      </div>
    </>
  );
};
