import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link
          class="navbar-brand mr-auto"
          to="/"
          style={{
            fontFamily: "Lucida Handwriting, cursive",
            fontSize: "xxx-large",
          }}
        >
          <b>NexMeet</b>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        {auth ? (

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link
                class="nav-link mr-2"
                style={{ fontSize: "x-large", color: "white" }}
                to="/users"
              >
                Users
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link mr-2"
                style={{ fontSize: "x-large", color: "white" }}
                to="/todos"
              >
                Todos
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link mr-2"
                style={{ fontSize: "x-large", color: "white" }}
                to="/albums"
              >
                Albums
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link mr-2"
                style={{ fontSize: "x-large", color: "white" }}
                to="/timeline"
              >
                TimeLine
              </Link>
            </li>
            <li>
                <Link
                  onClick={logout}
                  to="/"
                  className="nav-link btn btn-outline-light text-light px-4"
                  style={{
                    borderRadius: "25px",
                    fontSize: "1.1rem",
                    border: "2px solid #f0f0f0",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  LogOut({JSON.parse(auth).name})
                </Link>
              </li>
              </ul>
              ) : (
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    {" "}
                    <Link
                      className="nav-link btn btn-primary text-dark px-3 mr-2"
                      style={{
                        borderRadius: "25px",
                        fontSize: "1.1rem",
                        border: "2px solid #f0f0f0",
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                      }}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      className="nav-link btn btn-outline-light text-light px-4"
                      style={{
                        borderRadius: "25px",
                        fontSize: "1.1rem",
                        border: "2px solid #f0f0f0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                      }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
