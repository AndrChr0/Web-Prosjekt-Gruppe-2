import React from "react";
import CourseForm from "../../components/courseForm/CourseForm";
import "./NewCourse.css";
const NewCourse = () => {
    return (
        <main>
            <h1>Create course:</h1>
            <CourseForm />
        </main>
        
    );
}

export default NewCourse;