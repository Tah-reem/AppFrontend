import React from "react";
import { useLocation } from "react-router-dom";
import "./PhotoGallery.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const PhotoGallery = () => {
  const location = useLocation();
  const photos = location.state.photos || []; 

  return (
    <div>
      <Navbar />
      <div className="photo-gallery">
        <h2>Photo Gallery</h2>
        <div className="photo-grid">
          {photos.map((photo) => (
            <img
              key={photo._id}
              src={photo.url}
              alt={photo.title}
              className="photo-item"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PhotoGallery;
