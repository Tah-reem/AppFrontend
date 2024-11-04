import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Albums.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumsAndPhotos = async () => {
      try {

        const token = localStorage.getItem("token");

        const albumsResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/api/albums",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbums(albumsResponse.data);

        const photosResponse = await axios.get(
          "https://remaining-bella-tahreem-990bcb8d.koyeb.app/api/photos",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setPhotos(photosResponse.data);
      } catch (error) {
        console.error("Error fetching albums or photos: ", error);
      }
    };

    fetchAlbumsAndPhotos();
  }, []);

  const getAlbumThumbnail = (albumId) => {
    const albumPhotos = photos.filter((photo) => photo.albumId === albumId);
    return albumPhotos.length > 0 ? albumPhotos[0].url : null;
  };

  const handleAlbumClick = (albumId) => {
    const albumPhotos = photos.filter((photo) => photo.albumId === albumId);
    navigate("/photogallery", { state: { photos: albumPhotos } });
  };

  return (
    <div>
      <Navbar />
      <div className="albums-container">
        <h2>Albums</h2>
        <div className="albums-grid">
          {albums.slice(0, 20).map((album) => (
            <div
              key={album._id}
              className="album-item"
              onClick={() => handleAlbumClick(album._id)}
            >
              <img
                src={getAlbumThumbnail(album._id)}
                alt={album.title}
                className="album-thumbnail"
              />
              <p className="album-title">{album.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Albums;
