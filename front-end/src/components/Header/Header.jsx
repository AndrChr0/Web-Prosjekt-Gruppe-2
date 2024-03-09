import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";


const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/" className="nav-link" id="nav-logo">Sustainability Diary</Link></li>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/diary" className="nav-link">My Diary</Link></li>
            <li><Link to="/courses" className="nav-link">Courses</Link></li>
            <li><Link to="/inbox" className="nav-link">Inbox</Link></li>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
