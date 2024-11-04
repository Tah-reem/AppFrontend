import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Albums from "./Albums";
import Timeline from "./Timeline";
import PhotoGallery from "./PhotoGallery";
import Users from "./Users";
import Todos from "./Todos";
import PrivateComponent from "./PrivateComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
      <div>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateComponent />}>
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/photogallery" element={<PhotoGallery />} />
          </Route>

        </Routes>

        <HeroSection />
        <Features />
        <Footer />
      </div>
  );
}

export default App;
