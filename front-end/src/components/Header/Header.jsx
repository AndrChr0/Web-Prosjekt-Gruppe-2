// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Ensure this path matches your project structure
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faLeaf } from '@fortawesome/free-solid-svg-icons';

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
            <div className='login-register-links'>
                <li><Link to="/login" className="nav-link">Login</Link></li>
              </div>
            </>
          )}
          {currentUser?.role === 'teacher' && (
            <>
            <div>
              <li><Link to="/teacher_dashboard" className="nav-link" id="nav-logo"><FontAwesomeIcon icon={faLeaf} /> Sustainability Diary</Link></li>
            </div>
            <div className='nav-main-links'>
            <li><Link to="/teacher_dashboard" className="nav-link">Home</Link></li>
            <li><Link to="/my_courses" className="nav-link">Courses</Link></li>
            <li><Link to="/submissions" className="nav-link">Submissions</Link></li>
            <li><Link to="/profile-page" className="nav-link">Profile</Link></li>
            <div className='Logout-link'>
              {currentUser?.role === 'teacher' && (
              <li><button onClick={handleLogout} className="nav-link">Log Out <FontAwesomeIcon icon={faRightFromBracket} /></button></li>
              
            )}
            </div>

            </div>

              {/* Additional teacher-specific links */}
            </>
          )}
          {currentUser?.role === 'student' && (
            <>
              <div>
                <li><Link to="/student_dashboard" className="nav-link" id="nav-logo"><FontAwesomeIcon icon={faLeaf} /> Sustainability Diary</Link></li>
              </div>
              <div className='nav-main-links'>
                <li><Link to="/student_dashboard" className="nav-link">Home</Link></li>
                <li><Link to="/diary" className="nav-link">My Diary</Link></li>
                <li><Link to="/courses" className="nav-link">Courses</Link></li>
                <li><Link to="/inbox" className="nav-link">Inbox</Link></li>
                <li><Link to="/profile-page" className="nav-link">Profile</Link></li>
                <div className='Logout-link'>
                  {currentUser?.role === 'student' && (
                  <li><button onClick={handleLogout} className="nav-link">Log Out <FontAwesomeIcon icon={faRightFromBracket} /></button></li>
                  )}
                </div>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
