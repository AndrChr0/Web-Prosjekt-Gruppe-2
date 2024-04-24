import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "student", // Default to 'student'
    firstName: "",
    lastName: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== confirmPassword) {
      setRegistrationError("Passwords do not match.");
      return;
    } else if (credentials.password.length < 8) {
      setRegistrationError("Password must be at least 8 characters long.");
      return;
    }
    try {
      await axios.post("http://localhost:5151/users/register", credentials);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setRegistrationError(
        "Failed to register. Please check your input and try again."
      );
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={credentials.firstName}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={credentials.lastName}
          onChange={handleChange}
          required
          className="login-input"
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
          className="login-input"
        />
        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          required
          className="login-input"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" className="login-button">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      {registrationError && (
        <p className="error-message">{registrationError}</p>
      )}
    </div>
  );
};

export default Register;
