import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddedStudentsInCourse.css';

const AddedStudentsInCourse = () => {
  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';

  const [addedStudents, setAddedStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  // Fetch added students when component mounts
  useEffect(() => {
    axios.get(`${apiURL}/search?role=student&&courseId=${courseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(response => {
      setAddedStudents(response.data);
    })
    .catch(error => {
      console.error('Error fetching added students:', error);
    });
  }, [courseId]);

  return (
    <div>
      <ul className='Student-list'>
        <h2>Students in the course</h2>
        {addedStudents.map(addedStudent => (
          <li key={addedStudent._id}>
            <div>
              <strong>
                {addedStudent.firstName} {addedStudent.lastName}
              </strong>
            </div>
            <div>
              <span>{addedStudent.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedStudentsInCourse;
