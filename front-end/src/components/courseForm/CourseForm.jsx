import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./courseForm.css";

const CourseForm = () => {
const apiURL = import.meta.env.VITE_URL;
// const apiURL = '/api';

  const navigate = useNavigate();
  const [courseError, setCourseError] = useState("");
  const [courseData, setCourseData] = useState({
    title: "",
    courseCode: "",
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (courseData.title.length < 3) {
      setCourseError("Course name must be at least 3 characters long.");
      return;
    } else if (courseData.title.length > 100) {
      setCourseError("Course name must be at most 100 characters long.");
      return;
    } else if (courseData.courseCode.length < 4) {
      setCourseError("Course code must be at least 4 characters long.");
      return;
    } else if (courseData.courseCode.length > 10) {
      setCourseError("Course code must be at most 10 characters long.");
      return;
    }
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `${apiURL}/courses`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/my_courses");
      setCourseData({
        title: "",
        courseCode: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="newCourse_form" onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            type="text"
            name="title"
            value={courseData.title}
            placeholder="Enter course name"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Course Code:
          <input
            type="text"
            name="courseCode"
            value={courseData.courseCode}
            placeholder="Enter course code"
            onChange={handleChange}
            required
          />
        </label>

        <input className="submit-btn" type="submit" value="Submit" />
        {courseError && <p className="error">{courseError}</p>}
      </form>
    </div>
  );
};

export default CourseForm;
