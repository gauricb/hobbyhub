import React from "react";
import Card from "react-bootstrap/Card";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CreatePost = () => {
  return (
    <div
      id="post-page"
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <Form className="mt-3 ">
            <Form.Group>
              <Form.Control type="email" placeholder="Post Title" />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Content (optional)"
                style={{ height: "200px", marginTop: "10px" }}
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
