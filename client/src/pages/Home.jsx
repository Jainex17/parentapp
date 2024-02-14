import { useState } from "react";
import { CreatePost } from "../components/posts/CreatePost.jsx";
import { Posts } from "../components/posts/Posts.jsx";

export const Home = () => {

  const [PostsTab, setPostsTab] = useState(0);
  
  const ForYouPosts = [
    {
      username: "John Doe",
      userImage: "https://randomuser.me/api/portraits/women/2.jpg",
      postTime: "2 hours ago",
      postTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue.",
      postimage: "https://plus.unsplash.com/premium_photo-1680720885676-81e3bdee4237?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postTag: "React"
    },
    {
      username: "Test User",
      userImage: "https://randomuser.me/api/portraits/women/32.jpg",
      postTime: "5 hours ago",
      postTitle: "why do we use it?",
      postContent: "react is a javascript library for building user interfaces. It is maintained by facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded. However, fetching data is only the beginning of what happens on a web page, which is why we're building a new kind of a component. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem.",
      postTag: "question"
    },
    {
      username: "Jetha Gada",
      userImage: "https://randomuser.me/api/portraits/women/12.jpg",
      postTime: "1 day ago",
      postTitle: "My Elctronic Shop",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue.",
      postimage: "https://images.unsplash.com/photo-1503431153573-96e959f4d9b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const FollowingPosts = [
    {
      username: "Alice Smith",
      userImage: "https://randomuser.me/api/portraits/women/22.jpg",
      postTime: "3 hours ago",
      postTitle: "Exploring the Wilderness",
      postContent: "Today, I went on an amazing adventure through the forest. The sights and sounds of nature were truly breathtaking. I saw deer, rabbits, and even a majestic eagle soaring overhead. It was a reminder of the beauty of our planet and the importance of preserving it for future generations.",
      postTag: "Nature"
    },
    {
      username: "Bob Johnson",
      userImage: "https://randomuser.me/api/portraits/men/11.jpg",
      postTime: "6 hours ago",
      postTitle: "Delicious Homemade Pizza Recipe",
      postContent: "Who doesn't love pizza? I just made the most amazing homemade pizza, and I have to share the recipe with you all. It's super easy and incredibly delicious. All you need is some pizza dough, tomato sauce, cheese, and your favorite toppings. Trust me, once you try this recipe, you'll never order pizza delivery again!",
      postTag: "Food"
    },
    {
      username: "Emily Brown",
      userImage: "https://randomuser.me/api/portraits/women/42.jpg",
      postTime: "Yesterday",
      postTitle: "Tips for a Productive Workday",
      postContent: "As someone who works from home, I've learned a few tips and tricks to stay productive throughout the day. One thing that has really helped me is creating a dedicated workspace free from distractions. I also like to break up my day into smaller tasks and take regular breaks to avoid burnout. What are some of your favorite productivity tips?",
      postTag: "Productivity"
    },
    {
      username: "David Wilson",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      postTime: "2 days ago",
      postTitle: "Traveling to Japan: A Cultural Experience",
      postContent: "Last week, I had the opportunity to travel to Japan, and it was an experience I'll never forget. From the bustling streets of Tokyo to the serene temples in Kyoto, Japan is a country full of rich culture and history. The food was amazing, the people were friendly, and the sights were breathtaking. I can't wait to go back and explore more of this beautiful country!",
      postTag: "Travel"
    }
  ];
  

  return (
    <>
      <div className="mx-8 sm:my-6 my-2 mr-20">

        <div className="flex bg-white border border-grey-light-alt rounded mb-3 cursor-pointer">
          <div className={'p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all ' + (PostsTab === 0 ? 'border-b-2 border-blue-700' : 'border-none' )} onClick={()=> setPostsTab(0)}>
            <h4 className={'font-bold ' + (PostsTab === 1 && 'text-gray-400')}>For You</h4>
          </div>
          <div className={'p-3 w-1/2 text-center hover:bg-[rgb(15,20,25,0.1)] transition-all ' + (PostsTab === 1 ? 'border-b-2 border-blue-700' : 'border-none')} onClick={() => setPostsTab(1)}>
            <h4 className={'font-bold ' + (PostsTab === 0 && 'text-gray-400')}>
              Following
            </h4>
          </div>
        </div>

        <CreatePost />
        
        { PostsTab === 0 ? <Posts posts={ForYouPosts} /> : <Posts posts={FollowingPosts} /> }

      </div>


    </>
  );
};
