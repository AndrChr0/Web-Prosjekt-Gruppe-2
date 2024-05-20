import React,{ useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Header.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faLeaf } from "@fortawesome/free-solid-svg-icons"
import * as FaIcons from "@fortawesome/free-solid-svg-icons"


const Header = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout() // Use the logout function from AuthContext
    navigate("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false); 
  };

  return (
    <header>
      <nav>
      
          {/* Conditional rendering based on currentUser */}
          {!currentUser && (
            <>

              <ul className="home-page-nav">

                <li>
                  <NavLink to="/" className="nav-logo nav-link" id="nav-logo">
                    <FontAwesomeIcon icon={faLeaf} /> Sustainability Diary
                  </NavLink>
                </li>
              
              
                <li>
                  <NavLink to="/login" className="nav-link" id="login">
                    Login
                  </NavLink>
                </li>
              </ul>
            </>
          )}
          {currentUser?.role === "teacher" && (
            <>

            <div className="hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? FaIcons.faTimes : FaIcons.faBars} />
            </div>
            
            <ul className={isMenuOpen ? "active" : ""}>

            <div className="logo-wrapper">

              <li>
                  <NavLink
                    to="/student_dashboard"
                    className="nav-logo nav-link"
          
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon icon={faLeaf} /> Sustainability Diary
                  </NavLink>
                </li>
              </div>

              <div className="nav-main-links">

                <li>
                  <NavLink to="/teacher_dashboard" className="nav-link" onClick={handleNavLinkClick}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my_courses" className="nav-link" onClick={handleNavLinkClick}>
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/submissions" className="nav-link" onClick={handleNavLinkClick}>
                    Submissions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile-page" className="nav-link" onClick={handleNavLinkClick}>
                    Profile
                  </NavLink>
                </li>
                <div className="Logout-link">
                  {currentUser?.role === "teacher" && (
                    <li>
                      <button onClick={handleLogout} className="nav-link">
                        Log Out <FontAwesomeIcon icon={faRightFromBracket} />
                      </button>
                    </li>
                  )}
                </div>
              </div>
              
              </ul>

            </>
          )}
          {currentUser?.role === "student" && (
            <>

            <div className="hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? FaIcons.faTimes : FaIcons.faBars} />
            </div>

            <ul className={isMenuOpen ? "active" : ""}>


              <li>
                  <NavLink
                    to="/student_dashboard"
                    className="nav-link nav-logo"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon icon={faLeaf} /> Sustainability Diary
                  </NavLink>
                </li>
                 
              <div className="nav-main-links">
                <li>
                  <NavLink to="/student_dashboard" className="nav-link" onClick={handleNavLinkClick}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/diary" className="nav-link" onClick={handleNavLinkClick}>
                    My Diary
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/courses" className="nav-link" onClick={handleNavLinkClick}>
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inbox" className="nav-link" onClick={handleNavLinkClick}>
                    Inbox
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile-page" className="nav-link" onClick={handleNavLinkClick}>
                    Profile
                  </NavLink>
                </li>
                <div className="Logout-link">
                  {currentUser?.role === "student" && (
                    <li>
                      <button onClick={handleLogout} className="nav-link">
                        Log Out <FontAwesomeIcon icon={faRightFromBracket} />
                      </button>
                    </li>
                  )}
                </div>
              </div>
              </ul>
            </>
          )}
      </nav>
    </header>
  )
}

export default Header
