import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import Photos from "./Photos";
import Friends from "./Friends";
import "./Timeline.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [friends, setFriends] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const postsResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/postings",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const commentsResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/comments",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(postsResponse.data);
        setComments(commentsResponse.data);

        const photosResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/api/photos",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setPhotos(photosResponse.data);

        const friendsResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/friends",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setFriends(friendsResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="timeline-container">
        <div className="timeline-content">
          <div className="posts-section">
            <h2>Posts</h2>
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                comments={comments.filter(
                  (comment) => comment.postId === post._id
                )}
              />
            ))}
          </div>
          <div className="side-section">
            <div className="photos-section">
              <h2>Photos</h2>
              <Photos photos={photos} />
            </div>
            <div className="friends-section">
              <h2>Friends</h2>
              <Friends friends={friends} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Timeline;
