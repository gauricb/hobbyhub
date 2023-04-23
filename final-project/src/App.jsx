import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";

function App() {
  // set up routes using useRoutes hook

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/details/:id" element={<PostPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
