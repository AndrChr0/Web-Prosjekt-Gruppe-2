// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages-student/Home";
import MyDiary from "./pages-student/MyDiary";
import Courses from "./pages-student/Courses";
import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import AddCourse from "./pages-student/AddCourse";
// import { Routes, Route } from "react-router-dom";
import "./assets/styles/App.scss";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><span className="nav-link" id="nav-logo">Sustainability Diary</span></li>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/diary" className="nav-link">My Diary</Link></li>
            <li><Link to="/courses" className="nav-link">Courses</Link></li>
            <li><Link to="/inbox" className="nav-link">Inbox</Link></li>
            {/* <li><Link to="/new_reflection" className="nav-link">New Reflection</Link></li> */}
            {/* <li><Link to="/add_course" className="nav-link">Add Course</Link></li> */}
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<MyDiary />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
    </>
  );
}

export default App;
