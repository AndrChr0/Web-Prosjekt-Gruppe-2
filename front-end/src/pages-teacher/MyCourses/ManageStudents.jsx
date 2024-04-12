// src/pages-teacher/MyCourses/ManageStudents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  useEffect(() => {
    axios.get('http://localhost:5151/users?role=student', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    }) // Fetch only students
      .then(response => {
        setStudents(response.data.data); // Set students state with fetched data
      })
      .catch(error => {
        console.error('Error fetching students:', error);
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
      alert('Failed to add student to course');
    });
  };

  return (
    <div>
      <h1>Manage Students</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.email} <button onClick={() => handleAddStudent(student._id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;