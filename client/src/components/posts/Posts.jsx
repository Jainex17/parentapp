import { Post } from "./Post";

export const Posts = () => {
  return (
    <>
      <section className="mt-2">
        <Post
          username="John Doe"
          userImage="https://randomuser.me/api/portraits/women/2.jpg"
          postTime="2 hours ago"
          postTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper."
          postContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue."

        />
        <Post 
          username="Test User"
          userImage="https://randomuser.me/api/portraits/men/31.jpg"
          postTime="5 hours ago"
          postTitle="why do we use it?"
          postContent="react is a javascript library for building user interfaces. It is maintained by facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded. However, fetching data is only the beginning of what happens on a web page, which is why we're building a new kind of a component. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem. It's a component that is aware of the loading state, and it knows how to fetch data. It's called a query component, and it's the first of its kind in the react ecosystem."
        />

        <Post 
          username="Jetha Gada"
          userImage="https://randomuser.me/api/portraits/men/2.jpg"
          postTime="1 day ago"
          postTitle="My Elctronic Shop"
          postContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue. loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper. Nullam nec erat id tortor aliquet gravida. Donec eget odio in justo congue."
        />        
      </section>
    </>
  );
};
