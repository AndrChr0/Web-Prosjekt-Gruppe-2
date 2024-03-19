import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";


const TeacherNav = () => {
  return (
    <header>
      <nav>
        <ul>
            <li><Link to="/teacher_dashboard" className="nav-link" id="nav-logo">Sustainability Diary</Link></li>
            <li><Link to="/teacher_dashboard" className="nav-link">Home</Link></li>
            <li><Link to="/my_courses" className="nav-link">My courses</Link></li>
            <li><Link to="/submissions" className="nav-link">Submissions</Link></li>
            <li><Link to="/teacher/profile" className="nav-link">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default TeacherNav;
