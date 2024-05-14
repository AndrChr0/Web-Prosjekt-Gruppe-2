import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CourseInfo.css";

const CourseInfo = () => {
const apiURL = import.meta.env.VITE_URL;
// const apiURL = '/api';


    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setLoading(true);
        axios
        .get(`${apiURL}/courses/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in request headers
            },
          })
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
