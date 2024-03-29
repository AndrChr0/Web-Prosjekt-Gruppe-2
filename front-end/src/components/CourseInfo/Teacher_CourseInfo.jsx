import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CourseInfo.css";

const TeacherCourseInfo = () => {

    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setLoading(true);
        axios
        .get(`http://localhost:5151/courses/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in request headers
            },
          })
            .then((res) => {
                setCourse(res.data.data);
                setEditedDescription(res.data.data.description); // initial edited description
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleEdit = () => {
      if (!isEditing) {
        setIsEditing(true); // enable editing mode
      } else {
        
        const token = localStorage.getItem('authToken');
        axios
          .put(
            `http://localhost:5151/courses/${id}`,
            {
              // updating the all the required fields
              title: course.title, 
              description: editedDescription, // but we are actually just editing this
              courseCode: course.courseCode, 
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            
            setIsEditing(false); // disable editing mode after saving
            setSuccessMessage('Description updated successfully!');
            setCourse((prevCourse) => ({
              ...prevCourse,
              description: editedDescription,
            }));
            setTimeout(() => {
              setSuccessMessage(''); 
            }, 3000); // clear message after 3 sec
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

  const handleCancel = () => {
      setEditedDescription(course.description); // reset edited description to original
      setIsEditing(false); // edit mode set to false
    };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value); // update edited description
    setSuccessMessage('');
  };
  
  return (
    <div className="Course-Information">
      <h2>
        {course.courseCode} <span>{course.title}</span>
      </h2>
      {isEditing ? (
        <textarea
          className="course-description-edit"
          value={editedDescription}
          maxLength={500}
          onChange={handleDescriptionChange}
        />
      ) : (
        <span>{course.description}</span>
      )}
      
      {isEditing ? (
        <div className='edit-save-btns'>
          <button className="main-menu-btn courseInfo-btn" onClick={handleEdit}>
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
      {successMessage && !isEditing && (
        <span className="success-message">{successMessage}</span>
      )}
    </div>
  );
};

export default TeacherCourseInfo;