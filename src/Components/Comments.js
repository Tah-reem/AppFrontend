import React, { useState } from "react";
import axios from "axios";
import "./Comments.css";
import "bootstrap/dist/css/bootstrap.min.css";

const auth = localStorage.getItem("user");

const Comments = ({ comments, postId, onAddComment }) => {
  const [newComment, setNewComment] = useState(""); 

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return; 

    try {
      const commentData = {
        postId,
        username: `${JSON.parse(auth).name}`, 
        comment: newComment,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://remaining-bella-tahreem-990bcb8d.koyeb.app/comments",
        commentData,
        { headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
         } }
      );

      onAddComment(response.data.comment); 
      setNewComment(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments-container">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment._id || Math.random()} className="comment-item">
          <strong>{comment.username || "Anonymous"}</strong>: {comment.comment || ""}
        </div>
      ))}

      <form onSubmit={handleAddComment} className="add-comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
