import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyCourses.css";
import MainMenuButton from "../../components/MainmenuButton/MainMenuButton";

const TeacherCourses = () => {
  const apiURL = import.meta.env.VITE_URL;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${apiURL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <h1>My Courses</h1>
      <div className="addCourse-btn">
        <MainMenuButton
          path="/new_course"
          buttonName="New Course"
        ></MainMenuButton>
      </div>
      <ul className="Courses-list">
        {courses.map((course) => (
          <div key={course._id}>
            <Link className="Text-link" to={`/my_courses/${course._id}`}>
              <li className="Course-item">
                <div className="course-inner-text">
                  <span>
                    <b>{course.courseCode}</b>
                  </span>{" "}
                  {course.title}
                </div>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </main>
  );
};

export default TeacherCourses;
