import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./CreatePostPage.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    upvotes: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name: ", name, " value: ", value);
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("post").insert({
      title: post.title,
      content: post.content,
      upvotes: 1,
    });
    console.log(data);

    window.location = "/";
  };

  return (
    <div
      id="post-page"
      className="d-flex justify-content-center align-items-center"
    >
      <h1>Make a post</h1>
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <Form className="mt-3 " onSubmit={createPost}>
            <Form.Group>
              <Form.Control
                placeholder="Post Title"
                onChange={handleChange}
                name="title"
                value={post.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="content"
                placeholder="Content (optional)"
                value={post.content}
                style={{ height: "200px", marginTop: "10px" }}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Create Post
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreatePost;
