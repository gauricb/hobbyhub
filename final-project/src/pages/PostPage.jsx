import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";

const CommentBox = () => {
  return (
    <div className="bg-light p-2 mt-3 comment-box">
      <h5 className="mb-3">Comments</h5>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="comment-item">
          Cras justo odio
        </ListGroup.Item>
        <ListGroup.Item className="comment-item">
          Dapibus ac facilisis in
        </ListGroup.Item>
        <ListGroup.Item className="comment-item">
          Vestibulum at eros
        </ListGroup.Item>
      </ListGroup>
      <Form className="mt-3 d-flex">
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Type your comment"
            style={{ width: "40rem" }}
            className="comment-input"
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginLeft: "10px" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", upvotes: 0 });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData, error } = await supabase
          .from("post")
          .select("*")
          .eq("id", id)
          .single();
        if (postData) {
          setPost(postData);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div
      id="post-page"
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Posted 20 hours ago
          </Card.Subtitle>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {post.upvotes} upvotes
          </Card.Subtitle>
          <CommentBox />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostPage;
