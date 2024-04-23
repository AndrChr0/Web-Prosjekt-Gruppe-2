import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiaryReflections.css";
import { Link } from "react-router-dom";

function DiaryReflections() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}/${date.toLocaleTimeString()}`;
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken"); 
    axios
      .get("http://localhost:5151/reflections", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => {
        setReflections(res.data.data); 
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <main id="test-id-diary-reflections">
      <div>
        <h2>My reflections</h2>
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
                    <b>Last updated:</b> {formatDate(reflection.updatedAt)}
                  </div>
                  <div className="link-container">
                    <Link to={`/diary/${reflection._id}`}><button className="main-menu-btn">View</button></Link>
                    <Link to={`/edit_reflection/${reflection._id}`}><button className="main-menu-btn">Edit</button></Link>
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
