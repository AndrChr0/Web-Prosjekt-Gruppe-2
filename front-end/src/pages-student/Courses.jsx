import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div className="Courses-list">
            <h1>My Courses</h1>
            <ul>
            {courses.map((course, i) => (
                <li className="Course-item" key={course._id}>
                    <div>{i + 1}</div>
                    <div>
                        <span><b>Course name:</b></span> {course.courseCode} {course.title} 
                    </div>
                    <div>
                        <span><b>Course description:</b></span> {course.description} 
                    </div>
                </li>
            ))}
            </ul>
        </div>
    )}
    
    export default Courses;