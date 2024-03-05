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
        <main>
            <h1>My Courses</h1>
            <ul className="Courses-list">
            {courses.map((course, i) => (
                <li className="Course-item" key={course._id}>
                    <div>{i + 1}</div>
                    <div>
                        <span><b> {course.courseCode} </b></span> {course.title} 
                    </div>
                    <div>
                        <span><b>Description:</b></span> {course.description} 
                    </div>
                </li>
            ))}
            </ul>

        </main>
    )}
    
    export default Courses;