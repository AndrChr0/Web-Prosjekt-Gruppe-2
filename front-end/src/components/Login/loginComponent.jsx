import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const LOGIN_API_ENDPOINT = "http://localhost:5151/users/login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_API_ENDPOINT, credentials);
      localStorage.setItem("authToken", response.data.token); // Storing the token
      navigate("/profile"); // Navigate to the profile page upon successful login
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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
      </form>
      {loginError && <p className="error-message">{loginError}</p>}
    </div>
  );
};

export default Login;
