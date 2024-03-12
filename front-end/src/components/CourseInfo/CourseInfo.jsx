import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CourseInfo.css";

const CourseInfo = () => {

    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5151/courses/${id}`) //getting the specific course route
            .then((res) => {
                setCourse(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

  return (
    <div className="Course-Information">
        <h2>{course.courseCode} <span>{course.title}</span></h2>
        <span>{course.description}</span>
    </div>
  );
};

export default CourseInfo;