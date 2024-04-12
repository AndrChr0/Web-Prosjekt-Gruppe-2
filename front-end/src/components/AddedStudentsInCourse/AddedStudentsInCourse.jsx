// src/pages-teacher/MyCourses/ManageStudents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddedStudentsInCourse.css';

const AddedStudentsInCourse = () => {
  const [addedStudents, setAddedStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  useEffect(() => {
      axios.get(`http://localhost:5151/search?role=student&&courseId=${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => {
        setAddedStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching added students:', error);
      });
  }, []);

  const handleAddStudent = (studentId) => {
    axios.put(`http://localhost:5151/users/${studentId}/add_course`, { courseId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(() => {
      alert('Student added to course successfully');
      
    })
    .catch(error => {
      console.error('Error adding student to course:', error);
      alert('Student already in course');
    });
  };

  return (
    <div>

      <ul className='Added-students-list'>
      <h2>Students in the course</h2>
        {addedStudents.map(addedStudent => (
          <li key={addedStudent._id}>
            {addedStudent.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedStudentsInCourse;