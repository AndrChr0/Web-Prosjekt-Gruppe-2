import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiaryReflections.css";
import { Link } from "react-router-dom";

function DiaryReflections() {

    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get("http://localhost:5151/reflections")
        .then((res) => {
          setReflections(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
  
    return (
      <main>
        <div>
          <h1>My reflections</h1>
  
          {loading ? (
            <h2>please wait</h2>
          ) : (
            <div>
              <ul>
                {reflections.map((reflection, index) => (
                  <li key={reflection._id}>
                    <Link to={`/diary/${reflection._id}`}>View</Link>
                    <br />
                    <Link to={`/edit_reflection/${reflection._id}`}>Edit</Link>
                    <div>
                      <b> Title:</b> {reflection.title}
                    </div>
                    <div>
                      <b>Course-ID:</b> {reflection.courseId}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    );
}


export default DiaryReflections;