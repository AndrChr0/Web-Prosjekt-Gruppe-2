import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Not authorized. Please login.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${apiURL}/users/profile/user_courses`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if(response.data && response.data.courses) {
          setCourses(response.data.courses);
        } else {
          setError('No courses found.');
        }
        
        setLoading(false);
      } catch (error) {
        setError('Failed to load courses. Please try again.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <h1>My Courses</h1>
      <ul className="Courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course._id} className="Course-item">
              <Link to={`/courses/${course._id}`} className='Text-link'>
                <div>
                  <span><b>{course.courseCode}</b></span> {course.title}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>No courses found.</li>
        )}
      </ul>
    </main>
  );
}

export default Courses;
