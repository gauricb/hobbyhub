import React, { useState, useEffect } from "react";
import PostPage from "../pages/PostPage";
import CreatePost from "../pages/CreatePostPage";
import "./Home.css";
import Post from "./Post";
import { supabase } from "../client";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .order("created_at", { ascending: true });

    setPosts(post);
  };

  useEffect(() => {
    fetchPosts();
  });

  return (
    <div>
      <div id="filters">
        <p>Order by: </p>
        <button>Newest</button>
        <button>Most Popular</button>
      </div>

      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={post.id}
            id={post.id}
            time={post.created_at}
            title={post.title}
            upvotes={post.upvotes}
          />
        ))
      ) : (
        <h2>{"No Posts Yet"}</h2>
      )}
    </div>
  );
};

export default Home;
