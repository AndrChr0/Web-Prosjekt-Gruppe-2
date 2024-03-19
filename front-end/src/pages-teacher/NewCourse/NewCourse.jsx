import React from "react";
import "./NewCourse.css";
const NewCourse = () => {
    return (
        <main>
            <h1>New Course</h1>
            <form className="newCourse_form">
                <label>
                Course Name:
                <input type="text" name="name" />
                </label>
                <label>
                Course Code:
                <input type="text" name="code" />
                </label>
                <input className="submit-btn" type="submit" value="Submit" />
            </form>
        </main>
    );
}

export default NewCourse;