import React, { useState, useEffect } from "react";
import PostPage from "../pages/PostPage";
import CreatePost from "../pages/CreatePostPage";
import "./Home.css";
import Post from "./Post";
import { supabase } from "../client";

const Home = ({ query }) => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("oldest");

  const fetchPosts = async () => {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .order("created_at", { ascending: true });

    setPosts(post);
  };

  useEffect(() => {
    if (query) {
      filterPosts(query);
    } else {
      fetchPosts();
    }
  }, [query]);

  const filterPosts = async (query) => {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .ilike("title", `%${query}%`)
      .order("created_at", { ascending: true });

    setPosts(post);
  };

  const handleSort = () => {
    console.log(sortBy);
    if (sortBy === "newest") {
      //setSortBy("oldest");
      setPosts([...posts].reverse());
    } else if (sortBy === "oldest") {
      //setSortBy("newest");
      fetchPosts();
    } else if (sortBy === "popular") {
      //setSortBy("popular");
      fetchPopularPosts();
    }
  };

  const fetchPopularPosts = async () => {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .order("upvotes", { ascending: false });

    setPosts(post);
  };

  return (
    <div>
      <div id="filters">
        <p>Order by: </p>
        <button
          onClick={() => {
            setSortBy("newest");
            handleSort();
          }}
        >
          Newest
        </button>
        <button
          onClick={() => {
            setSortBy("popular");
            handleSort();
          }}
        >
          Most Popular
        </button>
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
