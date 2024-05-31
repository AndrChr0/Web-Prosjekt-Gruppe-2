import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//student pages
import Home from "./Home";
import MyDiary from "./pages-student/MyDiary";
import Courses from "./pages-student/Courses";
import Course from "./pages-student/Course";
import Inbox from "./pages-student/Inbox";
import NewReflection from "./pages-student/NewReflection";
import ProfilePage from "./pages-student/ProfilePage";

//teacher pages
import TeachersHome from "./pages-teacher/Home/TeachersHome";
import RecentReflectionPage from "./pages-teacher/RecentReflectionPage/RecentReflectionPage";
import TeacherCourses from "./pages-teacher/MyCourses/MyCourses";
import TeacherCourse from "./pages-teacher/MyCourses/Course";
import SubmissionsPage from "./pages-teacher/SubmissionPage/SubmissionsPage";
import NewCourse from "./pages-teacher/NewCourse/NewCourse";
import ManageStudents from "./pages-teacher/MyCourses/ManageStudents";

import Login from "./components/Login/loginComponent";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReflectionDetail from "./components/ReflectionDetail/ReflectionDetail";
import EditReflection from "./components/EditReflection/EditReflection";

import StudentDashboard from "./pages-student/StudentDashboard";

import "./assets/styles/App.css";
import Unauthorized from "./components/Unauthorized/Unauthorized";
function App() {
  return (
    <>
      <ToastContainer />
      <div className="App-wrapper">
        <Header />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Routes without protection */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes requiring student role */}
          <Route
            path="/diary"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MyDiary />
              </ProtectedRoute>
            }
          />

          {/* Protected routes requiring TEACHER role */}
          <Route
            path="/teacher_dashboard"
            element={
              <ProtectedRoute allowedRoles={["teacher", "student"]}>
                <TeachersHome />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions/:id"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <RecentReflectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my_courses"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my_courses/:id"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new_course"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <NewCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <SubmissionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my_courses/:courseId/manage_students"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <ManageStudents />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home />} />
          <Route
            path="/student_dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diary/:reflectionId"
            element={
              <ProtectedRoute>
                <ReflectionDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new_reflection"
            element={
              <ProtectedRoute>
                <NewReflection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit_reflection/:reflectionId"
            element={
              <ProtectedRoute>
                <EditReflection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile-page"
            element={
              <ProtectedRoute allowedRoles={["student", "teacher"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
