import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiaryReflections.css";
import { Link } from "react-router-dom";

function DiaryReflections() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken"); // Retrieve JWT token from storage
    axios
      .get("http://localhost:5151/reflections", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      })
      .then((res) => {
        setReflections(res.data.data); // Assuming your backend response has a 'data' object
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
            <ul className="diary-list">
              {reflections.map((reflection) => (
                <li key={reflection._id} className="reflection-card">
                  <div>
                    <b>Title:</b> {reflection.title}
                  </div>
                  <div>
                    <b>Course:</b> {reflection.courseId}
                  </div>
                  <div className="link-container">
                    <Link to={`/diary/${reflection._id}`}>View</Link>
                    <Link to={`/edit_reflection/${reflection._id}`}>Edit</Link>
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
