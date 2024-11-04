import React from "react";
import { useNavigate } from "react-router-dom";
import "./Photos.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Photos = ({ photos }) => {
  const navigate = useNavigate(); 

  const goToPhotoGallery = () => {
    navigate("/photogallery", { state: { photos } }); 
  };

  return (
    <div className="photo-folder" onClick={goToPhotoGallery}>
      {photos.length > 0 && (
        <div className="folder-thumbnail">
          <img src={photos[0].url} alt="Thumbnail" className="thumbnail-img" />
          <p className="folder-text">View All Photos</p>
        </div>
      )}
    </div>
  );
};

export default Photos;
