import React, { useState } from "react";
import "./Post.css";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import Comments from "./Comments";
import "bootstrap/dist/css/bootstrap.min.css";

const Post = ({ post, comments }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState(comments);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const addComment = (newComment) => {
    setPostComments([...postComments, newComment]); 
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <h4>{post.title}</h4>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      <div className="post-actions">
        <button className="post-action-button" onClick={handleLike}>
          {liked ? (
            <FaHeart className="liked-icon" />
          ) : (
            <FaRegHeart className="like-icon" />
          )}{" "}
          {likes} Likes
        </button>

        <button className="post-action-button" onClick={handleCommentClick}>
          <FaComment className="comment-icon" /> {postComments.length} Comments
        </button>

        <button className="post-action-button">
          <FaShare className="share-icon" /> Share
        </button>
      </div>

      {showComments && (
        <div className="post-comments-section">
          <Comments
            comments={postComments}
            postId={post._id}
            onAddComment={addComment}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
