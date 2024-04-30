import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CourseInfo.css";

const TeacherCourseInfo = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
const apiURL = import.meta.env.VITE_URL;


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .get(`${apiURL}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      })
      .then((res) => {
        setCourse(res.data.data);
        setEditedCourse(res.data.data); // initial edited course data
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error getting course info");
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setCourse(editedCourse);
    const token = localStorage.getItem("authToken");
    axios
      .put(`${apiURL}/courses/${id}`, editedCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsEditing(false);
        setSuccessMessage("Course info updated!");
        setTimeout(() => {
          setSuccessMessage(""); // clear success message after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.log("Error updating course:", error);
        setErrorMessage(
          "Error updating course info: " + error.response.data.message
        );
      });
  };

  const handleCancel = () => {
    setEditedCourse(course);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className="Course-Information">
        {isEditing ? (
          
          <input
            type="text"
            name="courseCode"
            value={editedCourse.courseCode || ""}
            onChange={handleInputChange}
            className="edit-input"
          />
        ) : (
          <span>{course.courseCode} </span>
        )}

        <span>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedCourse.title || ""}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span>{course.title}</span>
          )}
        </span>
      {isEditing ? (
        <textarea
          name="description"
          value={editedCourse.description || ""}
          onChange={handleInputChange}
        />
      ) : (
        <span className="course-description">{course.description}</span>
      )}

      {isEditing ? (
        <div className="edit-save-btns">
          <button className="main-menu-btn courseInfo-btn" onClick={handleSave}>
            Save
          </button>
          <button
            className="main-menu-btn courseInfo-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button className="main-menu-btn courseInfo-btn" onClick={handleEdit}>
          Edit
        </button>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="manage-students-link">
        <Link to={`/my_courses/${id}/manage_students`}>
          <button className="main-menu-btn">Manage Students</button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCourseInfo;
