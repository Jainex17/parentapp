import React, { useEffect } from "react";
import { ProfileComp } from "../components/ProfileComp";
import { useSelector } from "react-redux";

export const Profile = () => {

  const MyPosts = [
    {
      _id: "1",
      username: "Alice Smith",
      userImage: "https://randomuser.me/api/portraits/women/11.jpg",
      postTime: "2 hours ago",
      postTitle: "Exciting Day at the Beach",
      postContent: "Had an amazing day at the beach with friends! The weather was perfect and we enjoyed swimming and playing beach volleyball.",
      postimage: "https://plus.unsplash.com/premium_photo-1680720885676-81e3bdee4237?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postTag: ["Beach", "Friends"],
      likescount: 10,
      commentscount: 5
    },
    {
      _id: "2",
      username: "Bob Johnson",
      userImage: "https://randomuser.me/api/portraits/men/22.jpg",
      postTime: "5 hours ago",
      postTitle: "New Recipe Experiment",
      postContent: "Tried a new recipe today - spicy chicken curry with homemade naan bread. Turned out delicious!",
      postTag: ["Food", "Cooking"],
      likescount: 5,
      commentscount: 2
    },
    {
      _id: "3",
      username: "Charlie Brown",
      userImage: "https://randomuser.me/api/portraits/men/33.jpg",
      postTime: "1 day ago",
      postTitle: "Hiking Adventure",
      postContent: "Went on an amazing hike in the mountains yesterday. The views were breathtaking!",
      postimage: "https://images.unsplash.com/photo-1503431153573-96e959f4d9b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postTag: ["Hiking", "Nature"],
      likescount: 20,
      commentscount: 8
    }
  ];

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return <>
    <div>
      <ProfileComp posts={MyPosts} user={user} />
    </div>
  </>;
};
