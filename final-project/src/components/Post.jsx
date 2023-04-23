import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Post.css";

const Post = () => {
  const [count, setCount] = useState(0);
  const updateCount = () => {
    setCount((count) => count + 1);
  };
  return (
    <div id="card">
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Posted 20 hours ago
          </Card.Subtitle>
          <Card.Text>Post title goes here</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {count} upvotes
          </Card.Subtitle>
          <Button variant="primary" onClick={updateCount}>
            Upvote ⬆️
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
