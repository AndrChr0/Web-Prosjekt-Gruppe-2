import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyCourses.css";
import MainMenuButton from "../../components/MainmenuButton/MainMenuButton";

const TeacherCourses = () =>{

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const token = localStorage.getItem("authToken");
      setLoading(true);
      axios
      .get(`http://localhost:5151/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            <div className="addCourse-btn">
                <MainMenuButton
                    path="/new_course"
                    buttonName="New Course"
                ></MainMenuButton>
            </div>

            
            <ul className="Courses-list">
            {courses.map((course, i) => (
                <Link className='Text-link' to={`/my_courses/${course._id}`}>
                <li key={course._id} className="Course-item" >
                    <div>
                        <span><b> {course.courseCode} </b></span> {course.title} 
                    </div>
                </li>
                </Link>
            ))}
            </ul>

        </main>
    )}
    
    export default TeacherCourses;