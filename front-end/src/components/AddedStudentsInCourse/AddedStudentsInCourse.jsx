import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddedStudentsInCourse.css';

const AddedStudentsInCourse = () => {
  const [addedStudents, setAddedStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  // Fetch added students when component mounts
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

  return (
    <div className="Student-list-container">
      <h2>Students in the course</h2>
      <ul className='Added-students-list Student-list'>
        {addedStudents.map(addedStudent => (
          <li key={addedStudent._id} className="Student-list-item">
            <div className="Student-info">
              <strong>
                {addedStudent.firstName} {addedStudent.lastName}
              </strong>
            </div>
            <div className="Student-info">
              <span>{addedStudent.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedStudentsInCourse;
