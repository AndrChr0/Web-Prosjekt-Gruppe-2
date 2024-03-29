import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CourseInfo.css";

const TeacherCourseInfo = () => {

    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      setLoading(true);
      axios
        .get(`http://localhost:5151/courses/${id}`, {
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
          setLoading(false);
        });
    }, [id]);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      setCourse(editedCourse);
      const token = localStorage.getItem('authToken');
      axios
        .put(
          `http://localhost:5151/courses/${id}`,
          editedCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsEditing(false);
          setSuccessMessage('Course info updated!');
          setTimeout(() => {
            setSuccessMessage(''); // clear success message after 3 seconds
          }, 3000);
        })
        .catch((error) => {
          console.log('Error updating course:', error);
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
        <h2>
          {isEditing ?
          (
            <input
              type="text"
              name="courseCode"
              value={editedCourse.courseCode || ''}
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
                value={editedCourse.title || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{course.title}</span>
            )}
          </span>
        </h2>
        {isEditing ? (
          <textarea
            name="description"
            value={editedCourse.description || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{course.description}</span>
        )}
        
        {isEditing ? (
          <div className='edit-save-btns'>
            <button className="main-menu-btn courseInfo-btn" onClick={handleSave}>
              Save
            </button>
            <button className="main-menu-btn courseInfo-btn" onClick={handleCancel}>
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
      </div>
    );
  };

export default TeacherCourseInfo;