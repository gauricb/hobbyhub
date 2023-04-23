import React from "react";
import Card from "react-bootstrap/Card";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

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
            style={{ width: "50rem" }}
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
  return (
    <div
      id="post-page"
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: "60rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Posted 20 hours ago
          </Card.Subtitle>
          <Card.Title>Post title goes here</Card.Title>
          <Card.Text>Post content goes here</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            numUpVotes upvotes
          </Card.Subtitle>
          <CommentBox />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostPage;
