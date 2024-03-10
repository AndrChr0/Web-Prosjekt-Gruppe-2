import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import ReflectionActivites from "../components/ReflectionActivites/ReflectionActivites-list";


const Course = () => {
    return (
        <div>
        <CourseInfo />
        <main>
            <div className="Activities-List">
                <ReflectionActivites />
            </div>
        </main>
        </div>
    );
}

export default Course;