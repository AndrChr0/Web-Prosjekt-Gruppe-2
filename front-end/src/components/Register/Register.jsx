// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'student', // Default to 'student'; users can change this if they are a teacher.
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const REGISTRATION_API_ENDPOINT = 'http://localhost:5151/users/register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== confirmPassword) {
      setRegistrationError('Passwords do not match.');
      return;
    }
    try {
      await axios.post(REGISTRATION_API_ENDPOINT, credentials);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setRegistrationError('Failed to register. Please check your input and try again.');
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <select name="role" value={credentials.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {registrationError && <p className="error-message">{registrationError}</p>}
    </div>
  );
};

export default Register;
