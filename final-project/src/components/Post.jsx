import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Post.css";
import { supabase } from "../client";
import { Link } from "react-router-dom";

//post component for the main page

const Post = (props) => {
  const [count, setCount] = useState(props.upvotes);
  const updateCount = async (event) => {
    event.preventDefault();
    await supabase
      .from("post")
      .update({ upvotes: count + 1 })
      .eq("id", props.id);
    setCount((count) => count + 1);
  };
  function hoursAgo(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diffMs = now - time;
    const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);

    if (diffHrs < 1) {
      return "less than one hour ago";
    } else {
      return diffHrs + " hours ago";
    }
  }
  return (
    <div id="card">
      <Link to={`/details/${props.id}`} style={{ textDecoration: "none" }}>
        <Card style={{ width: "50rem" }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Posted {hoursAgo(props.time)}
            </Card.Subtitle>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {count} upvotes
            </Card.Subtitle>
            <Button variant="primary" onClick={updateCount}>
              Upvote ⬆️
            </Button>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default Post;
