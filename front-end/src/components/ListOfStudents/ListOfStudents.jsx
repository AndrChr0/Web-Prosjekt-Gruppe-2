import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ListOfStudents.css';

const ListOfStudents = () => {
  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';

  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  useEffect(() => {
    fetchStudents();
    fetchCourseTitle();
  }, [courseId]);

  const fetchStudents = () => {
    if (searchInput.trim() === '') {
      setStudents([]);
      return;
    }

    axios
      .get(`${apiURL}/users/students?query=${searchInput}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  };

  const fetchCourseTitle = () => {
    axios
      .get(`${apiURL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => {
        setCourseTitle(response.data.data.title);
        setCourseCode(response.data.data.courseCode);
      })
      .catch(error => {
        console.error('Error fetching course title:', error);
      });
  };

  const handleAddStudent = userId => {
    axios
      .put(
        `${apiURL}/users/${userId}/add_course`,
        { courseId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        }
      )
      .then(() => {
        alert('Student added to course successfully');
        sendNotification(userId, courseTitle, courseCode);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding student to course:', error);
        alert('Student already in course');
      });
  };

  const sendNotification = (userId, courseTitle, courseCode) => {
    axios
      .post(
        `${apiURL}/notifications`,
        {
          content: `You have been added to a course: ${courseCode} ${courseTitle}`,
          userId: userId
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        }
      )
      .then(() => {
        console.log('Notification was sent to student');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
  };

  const handleSearch = () => {
    fetchStudents();
  };

  return (
    <div className='Student-list-container'>
      <h2>Add students</h2>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by email, first name, or last name'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className='SearchBar'
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchInput.trim() !== '' && (
        <ul className='Student-list'>
          {students.map(student => (
            <li key={student._id}>
              <div>
                {student.firstName && student.lastName && (
                  <strong>
                    {student.firstName} {student.lastName}
                  </strong>
                )}
              </div>
              <div>
                <span>{student.email}</span>
              </div>
              <button onClick={() => handleAddStudent(student._id)}>Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListOfStudents;
