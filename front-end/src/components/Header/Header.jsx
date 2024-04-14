// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Ensure this path matches your project structure
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  console.log("NAAAV", currentUser);

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          {/* Conditional rendering based on currentUser */}
          {!currentUser && (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
          {currentUser?.role === 'teacher' && (
            <>
            <li><Link to="/teacher_dashboard" className="nav-link" id="nav-logo">Sustainability Diary</Link></li>
            <li><Link to="/teacher_dashboard" className="nav-link">Home</Link></li>
            <li><Link to="/my_courses" className="nav-link">Courses</Link></li>
            <li><Link to="/submissions" className="nav-link">Submissions</Link></li>
            <li><Link to="/profile-page" className="nav-link">Profile</Link></li>
              {/* Additional teacher-specific links */}
            </>
          )}
          {currentUser?.role === 'student' && (
            <>
     <li><Link to="/student_dashboard" className="nav-link">Home</Link></li>
              <li><Link to="/diary" className="nav-link">My Diary</Link></li>
              <li><Link to="/courses" className="nav-link">Courses</Link></li>
              <li><Link to="/inbox" className="nav-link">Inbox</Link></li>
              <li><Link to="/profile-page" className="nav-link">Profile</Link></li>
            </>
          )}
          {currentUser && (
            <li><button onClick={handleLogout} className="nav-link">Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
