import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import other components here, like Header, Footer, ProtectedRoute, etc.
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // If you're using a ProtectedRoute component
// Import all your page components
import Home from "./pages-student/Home";
import MyDiary from "./pages-student/MyDiary";

import Courses from "./pages-student/Courses";
import Course from "./pages-student/Course";

import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import AddCourse from "./pages-student/AddCourse";
import Login from "./components/loginComponent";
import Profile from "./components/Profile";
import Registration from "./components/Register"; // Assuming Register is the correct import
import { useAuth } from "./components/context/AuthContext";
//Testcommit
import ProfilePage from "./pages-student/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReflectionDetail from "./components/ReflectionDetail/ReflectionDetail"; 
import EditReflection from "./components/EditReflection/EditReflection";

import "./assets/styles/App.scss";
function App() {
  const { currentUser } = useAuth(); // Use useAuth to access currentUser
  
  return (
    <>
      <Header />
      <Routes>
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
      </Routes>
      <Footer />
    </>
  )
}

export default App;
