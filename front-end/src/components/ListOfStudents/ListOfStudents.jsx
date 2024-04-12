// src/pages-teacher/MyCourses/ManageStudents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ListOfStudents.css';

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  useEffect(() => {
    axios.get('http://localhost:5151/search?role=student', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    }) // Fetch only students
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });

  }, []);

  const handleAddStudent = (userId) => {
    axios.put(`http://localhost:5151/users/${userId}/add_course`, { courseId }, {
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
    <div className='Student-list-container'>
      <ul className='Student-list'>
      <h2>Add students</h2>
        {students.map(student => (
          <li key={student._id}>
            {student.email}
             <button onClick={() => handleAddStudent(student._id)}>Add</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ListOfStudents;
