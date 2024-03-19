import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import other components here, like Header, Footer, ProtectedRoute, etc.
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // If you're using a ProtectedRoute component
// Import all your page components

//student pages
import Home from "./pages-student/Home";
import MyDiary from "./pages-student/MyDiary";
import Courses from "./pages-student/Courses";
import Course from "./pages-student/Course";
import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import AddCourse from "./pages-student/AddCourse";
import ProfilePage from "./pages-student/ProfilePage";

//teacher pages
import TeachersHome from "./pages-teacher/Home/Home";
import RecentReflectionPage from "./pages-teacher/RecentReflectionPage/RecentReflectionPage";
import TeacherCourses from "./pages-teacher/MyCourses/MyCourses";
import TeacherCourse from "./pages-teacher/MyCourses/Course";
import SubmissionsPage from "./pages-teacher/SubmissionPage/SubmissionsPage";
import TeacherProfile from "./pages-teacher/TeacherProfile/TeacherProfile";
import NewCourse from "./pages-teacher/NewCourse/NewCourse";


import Login from "./components/loginComponent";
import Profile from "./components/Profile";
import Registration from "./components/Register"; // Assuming Register is the correct import
import { useAuth } from "./components/context/AuthContext";
//Testcommit

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReflectionDetail from "./components/ReflectionDetail/ReflectionDetail"; 
import EditReflection from "./components/EditReflection/EditReflection";

import StudentDashboard from "./pages-student/StudentDashboard";


// teacher ui components
import TeacherNav from "./components/Header/NavTeacher";


import "./assets/styles/App.scss";
import Unauthorized from "./components/Unauthorized";
function App() {
  const { currentUser } = useAuth(); // Use useAuth to access currentUser
  
  return (
    <>
      <Header />
      <TeacherNav />

      <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/student-dashboard" element={
  <ProtectedRoute allowedRoles={['student']}>
    <StudentDashboard />
  </ProtectedRoute>
} />

        <Route path="/" element={<Home />} />
        {/* Wrap routes with ProtectedRoute as necessary */}
        <Route path="/diary" element={
          <ProtectedRoute>
            <MyDiary />
          </ProtectedRoute>
        } />
        {/* Assume Courses and Inbox are accessible to logged-in users only */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
          <Route path="/courses/:id" element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        } />
        <Route path="/inbox" element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        } />
          
        <Route path="/diary/:reflectionId" element={
          <ProtectedRoute>
            <ReflectionDetail/>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
        <Route path="/new_reflection" element={
          <ProtectedRoute>
            <NewReflection />
          </ProtectedRoute>
        } />
          <Route path="/edit_reflection/:reflectionId" element={
          <ProtectedRoute>
            <EditReflection/>
          </ProtectedRoute>
        } />
        {/* AddCourse might be restricted to teachers only */}
        <Route path="/add_course" element={
          <ProtectedRoute allowedRoles={['teacher']}> {/* This assumes your ProtectedRoute supports role checking */}
            <AddCourse />
          </ProtectedRoute>
        } />
        {/* No need to protect login and register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* Profile could be for authenticated users only */}
        <Route path="/profile-page" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />


        {/* routes to teacher pages.  */}
{/*     Hopefully we can get protected routes for this interface using
        same paths as student routes - "/" for home and "/courses" course pages. 
        If not, its not the end of the world.
        */}
        
        <Route path="/teacher_dashboard" element={<TeachersHome />} />
        <Route path="/submissions/:id" element={<RecentReflectionPage />} />
        <Route path="/my_courses" element={<TeacherCourses />} />
        <Route path="/my_courses/:id" element={<TeacherCourse />} />
        <Route path="/new_course" element={<NewCourse />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App;
