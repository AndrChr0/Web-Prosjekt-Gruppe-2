// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages-student/Home";
import MyDiary from "./pages-student/MyDiary";

import Courses from "./pages-student/Courses";
import Course from "./pages-student/Course";

import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import AddCourse from "./pages-student/AddCourse";
import Profile from "./pages-student/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./assets/styles/App.scss";

function App() {
  return (
    <>
    <body>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<MyDiary />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/new_reflection" element={<NewReflection/>}/>
          <Route path="/add_course" element={<AddCourse/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        <Footer></Footer>
      </body>
    </>
  );
}

export default App;
