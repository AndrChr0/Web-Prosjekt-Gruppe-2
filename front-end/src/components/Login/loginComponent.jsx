import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { decodeAndSetUser } = useAuth(); // Now using the newly exposed function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5151/users/login",
        credentials
      );
      localStorage.setItem("authToken", response.data.token); // Storing the token
      decodeAndSetUser(response.data.token); // Decode and set user upon successful login
      console.log("Login successful:", response.data);
      // Optionally decode role here to navigate accordingly or assume role handling elsewhere
      const userRole = JSON.parse(atob(response.data.token.split(".")[1])).role; // Ensure role is included in the token
      navigate(
        userRole === "teacher" ? "/teacher_dashboard" : "/student-dashboard"
      );
    } catch (error) {
      setLoginError("Failed to login. Please check your input and try again.");
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button id="logInBtn" type="submit" className="login-button">
          Log In
        </button>
      </form>
      {loginError && <p className="error-message">{loginError}</p>}
      <p>
        Don't have an account? <Link to="/register">Sign up here.</Link>
      </p>
    </div>
  );
};

export default Login;
