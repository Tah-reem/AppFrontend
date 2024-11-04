import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/timeline");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
  
    setErrorMessage(""); // Clear any previous error message
  
    try {
      const response = await axios.post(
        "https://remaining-bella-tahreem-990bcb8d.koyeb.app/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { data } = response;
      console.log("Server response:", data);
  
      // Check if the response contains user and auth (token)
      if (data && data.user && data.auth) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.auth); // Store the auth token
  
        // Navigate to timeline only if the data is valid
        navigate("/timeline");
      } else {
        // Handle the case where the auth token is missing from the response
        setErrorMessage("Login was successful, but the server response is missing the authentication token.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      
      // Check if the server returned an error response
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        <form id="loginForm" onSubmit={handleSubmit}>
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
            <span id="emailError" className="error"></span>
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
            <span id="passwordError" className="error"></span>
          </div>
          <button
            type="submit"
            className="btn btn-darkblue btn-block"
            style={{ color: "white" }}
          >
            Login
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "darkblue" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
