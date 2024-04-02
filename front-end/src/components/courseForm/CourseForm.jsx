import React, { useState } from "react";
import axios from "axios";
import "./courseForm.css";

const CourseForm = () => {

    const  [courseData, setCourseData] = useState({
        title: "",
        courseCode: "",
    });

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        
        try {
            const response = await axios.post(
                "http://localhost:5151/courses",
                courseData,
                {
                    headers: {
                      Authorization: `Bearer ${token}`, // Include the JWT token
                      "Content-Type": "application/json",
                    },
                  }
            );
            console.log("Response:", response.data); 
            setCourseData({
                title: "",
                courseCode: "",
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form className="newCourse_form" onSubmit={handleSubmit}>
                <label>
                Course Name:
                <input 
                type="text" 
                name="title" 
                value={courseData.title}
                onChange={handleChange}
                required />
                </label>

                <label>
                Course Code:
                <input 
                type="text" 
                name="courseCode" 
                value={courseData.courseCode}
                onChange={handleChange}
                required />
                </label>
                
                <input className="submit-btn" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CourseForm;
