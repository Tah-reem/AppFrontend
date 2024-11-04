import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <section class="hero-section text-center">
      <div class="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 class="display-4">Welcome to NexMeet</h1>
            <p class="lead">
              Connect with your friends, share moments, and discover new
              experiences.
            </p>
            <Link to="/signup" class="btn btn-outline-light btn-lg">
              Get Started
            </Link>
          </div>
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1615494488088-43ac74d0c232?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg5fHxzb2NpYWwlMjBtZWRpYSUyMGludGVyYWN0aW9ufGVufDB8fDB8fHww" alt="NexMeet" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
