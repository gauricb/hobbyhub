import React from "react";
import PostPage from "../pages/PostPage";
import CreatePost from "../pages/CreatePostPage";
import "./Home.css";
import Post from "./Post";

const Home = () => {
  return (
    <div>
      <div id="filters">
        <p>Order by: </p>
        <button>Newest</button>
        <button>Most Popular</button>
      </div>
      <Post />
      <PostPage />
      <CreatePost />
    </div>
  );
};

export default Home;
