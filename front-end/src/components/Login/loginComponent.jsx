import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [validationErrors, setValidationErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { decodeAndSetUser } = useAuth();
  const LOGIN_API_ENDPOINT = "http://localhost:5151/users/login";

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[\W_]/.test(password);
    return password.length >= minLength && hasNumbers && hasUpper && hasLower && hasSpecial;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "email") {
      setValidationErrors({ ...validationErrors, email: validateEmail(value) ? "" : "Invalid email format" });
    } else if (name === "password") {
      setValidationErrors({ ...validationErrors, password: validatePassword(value) ? "" : "Password must be 8+ characters and include upper, lower, numbers, and special characters" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(credentials.email) || !validatePassword(credentials.password)) {
      setLoginError("Please correct the errors before submitting.");
      return;
    }
    try {
      const response = await axios.post(LOGIN_API_ENDPOINT, credentials);
      localStorage.setItem("authToken", response.data.token);
      decodeAndSetUser(response.data.token);
      console.log("Login successful:", response.data);
      const userRole = JSON.parse(atob(response.data.token.split('.')[1])).role;
      navigate(userRole === 'teacher' ? '/teacher_dashboard' : '/student-dashboard');
    } catch (error) {
      setLoginError('Failed to login. Please check your input and try again.');
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="login-input"
          aria-describedby="emailHelp"
        />
        {validationErrors.email && <div id="emailHelp" className="error-message">{validationErrors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="login-input"
          aria-describedby="passwordHelp"
        />
        {validationErrors.password && <div id="passwordHelp" className="error-message">{validationErrors.password}</div>}
        <button type="submit" className="login-button">Log In</button>
      </form>
      {loginError && <p className="error-message">{loginError}</p>}
      <p>Don't have an account? <Link to="/register">Sign up here.</Link></p>
    </div>
  );
};

export default Login;
