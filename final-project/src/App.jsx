import React, { useState } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";

function App() {
  // set up routes using useRoutes hook

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("App: " + query);
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navigation handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home query={searchQuery} />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/details/:id" element={<PostPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
