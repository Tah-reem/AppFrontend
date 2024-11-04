import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/timeline");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (name.length < 5) {
      setErrorMessage("Full name must be at least 5 characters long.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    setErrorMessage(""); // Clear any previous error message
  
    try {
      const response = await axios.post(
        "https://remaining-bella-tahreem-990bcb8d.koyeb.app/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { data } = response;
      console.log("Server response:", data);
  
      // Check if the response contains user data and auth token
      if (data && data.result && data.auth) {
        // Store user and token in local storage
        localStorage.setItem("user", JSON.stringify(data.result));
        localStorage.setItem("token", data.auth);
  
        // Navigate to the timeline page after successful registration
        navigate("/timeline");
      } else {
        setErrorMessage("Registration was successful, but the server response is missing required data.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      
      // Display error message if registration fails
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form">
        <h2 className="text-center mb-4">Sign Up</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-darkblue btn-block"
            style={{ color: "white" }}
          >
            Sign Up
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "darkblue" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
