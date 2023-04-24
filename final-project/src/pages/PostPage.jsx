import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    upvotes: 0,
    comments: [],
  });

  const CommentBox = (props) => {
    const [commentInput, setCommentInput] = useState("");

    const handleCommentInputChange = (event) => {
      setCommentInput(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const newComment = commentInput.trim();

      if (newComment) {
        try {
          const { data: updatedPost, error } = await supabase
            .from("post")
            .update({
              comments: [...props.comments, newComment],
            })
            .eq("id", props.id)
            .single();

          if (updatedPost) {
            setPost(updatedPost);
            setCommentInput("");
          }
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    };

    return (
      <div className="d-flex justify-content-center">
        <div
          className="bg-light p-2 mt-3 comment-box "
          style={{ width: "50rem" }}
        >
          <h5 className="mb-3">Comments</h5>
          <ListGroup className="list-group-flush">
            {props.comments && props.comments.length > 0 ? (
              props.comments.map((comment, index) => (
                <ListGroup.Item key={index} className="comment-item">
                  {comment}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="comment-item">
                No comments yet
              </ListGroup.Item>
            )}
          </ListGroup>
          <Form className="mt-3 d-flex" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="Type your comment"
                style={{ width: "40rem" }}
                className="comment-input"
                value={commentInput}
                onChange={handleCommentInputChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  };

  const [isEditing, setIsEditing] = useState(false); // state variable to track edit mode
  const [editedPost, setEditedPost] = useState({ title: "", content: "" });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPost({ title: post.title, content: post.content });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      const { data: updatedPost, error } = await supabase
        .from("post")
        .update({ title: editedPost.title, content: editedPost.content })
        .eq("id", id)
        .single();

      if (updatedPost) {
        setIsEditing(false);
        setPost(updatedPost);
      }
      window.location = "/";
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

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
        //console.log(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("post").delete().eq("id", id);
      if (!error) {
        window.location = "/";
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const renderCardContent = () => {
    if (isEditing) {
      return (
        <div className="d-flex justify-content-center">
          <div style={{ marginTop: "90px", width: "50rem" }}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={editedPost.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter content"
                name="content"
                value={editedPost.content}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="success"
                onClick={handleSaveEdit}
                style={{ marginTop: "10px" }}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancelEdit}
                style={{ marginTop: "10px" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
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
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Subtitle className="mb-2 text-muted">
                    {post.upvotes} upvotes
                  </Card.Subtitle>
                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <CommentBox comments={post.comments} id={id} />
        </div>
      );
    }
  };

  return renderCardContent();
};

export default PostPage;
