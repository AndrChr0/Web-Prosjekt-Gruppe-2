import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ListOfStudents.css';

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
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


    // fetching course title (to display in the notification)
    axios.get(`http://localhost:5151/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(response => {

        setCourseTitle(response.data.data.title);
        setCourseCode(response.data.data.courseCode);
        console.log('course:', response.data.data.title);
      })
      .catch(error => {
        console.error('Error fetching course title:', error);
      });
  }, [courseId]);

  const handleAddStudent = (userId) => {
    axios.put(`http://localhost:5151/users/${userId}/add_course`, { courseId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
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
    axios.post('http://localhost:5151/notifications', {
      content: `You have been added to a course: ${courseCode} ${courseTitle}`,
      userId: userId,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(() => {
        console.log('Notification was sent to student');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
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
