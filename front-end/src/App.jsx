import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages-student/Home";
import MyDiary from "./pages-student/MyDiary";
import Courses from "./pages-student/Courses";
import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import AddCourse from "./pages-student/AddCourse";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReflectionDetail from "./components/ReflectionDetail/ReflectionDetail"; 
import EditReflection from "./components/EditReflection/EditReflection";

import "./assets/styles/App.scss";

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<MyDiary />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/new_reflection" element={<NewReflection/>}/>
          <Route path="/add_course" element={<AddCourse/>}/>
          <Route path="/diary/:reflectionId" element={<ReflectionDetail/>} /> 
          <Route path="/edit_reflection/:reflectionId" element={<EditReflection/>}/>
        </Routes>
        <Footer></Footer>
    </>
  );
}

export default App;
