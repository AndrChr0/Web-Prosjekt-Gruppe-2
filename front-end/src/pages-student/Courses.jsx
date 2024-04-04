import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Courses(){

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get("http://localhost:5151/courses")
        .then((res) => {
          setCourses(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

    return(
        <main>
            <h1>My Courses | Student</h1>
            <ul className="Courses-list">
            {courses.map((course, i) => (
                <Link className='Text-link' to={`/courses/${course._id}`}>
                <li className="Course-item" key={course._id}>
                    <div>
                        <span><b> {course.courseCode} </b></span> {course.title} 
                    </div>
                </li>
                </Link>
            ))}
            </ul>

        </main>
    )}
    
    export default Courses;