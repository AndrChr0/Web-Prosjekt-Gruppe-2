// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Ensure this path matches your project structure

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext
    navigate('/login');
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
            <li><Link to="/my_courses" className="nav-link">My courses</Link></li>
            <li><Link to="/submissions" className="nav-link">SubmissionsPage</Link></li>
            <li><Link to="/teacher/profile" className="nav-link">TeacherProfile</Link></li>
              {/* Additional teacher-specific links */}
            </>
          )}
          {currentUser?.role === 'student' && (
            <>
              <li><Link to="/student-dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/Home" className="nav-link">hOME</Link></li>
              <li><Link to="/Courses" className="nav-link">My Diary</Link></li>
              <li><Link to="/Course" className="nav-link">My Diary</Link></li>
              <li><Link to="/Inbox" className="nav-link">Inbox</Link></li>
              <li><Link to="/NewReflection" className="nav-link">NewReflection</Link></li>
              <li><Link to="/AddCourse" className="nav-link">AddCourse</Link></li>
              <li><Link to="/ProfilePage" className="nav-link">ProfilePage</Link></li>
              {/* Additional student-specific links */}
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
