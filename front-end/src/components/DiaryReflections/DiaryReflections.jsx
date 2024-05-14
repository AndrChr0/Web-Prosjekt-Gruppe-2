import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiaryReflections.css";
import { Link } from "react-router-dom";

function DiaryReflections() {
const apiURL = import.meta.env.VITE_URL;
// const apiURL = '/api';

  const [reflections, setReflections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
    // Utility function to format date strings into a more readable format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Oslo' };
    return `${date.toLocaleDateString("no-NO", options)}`;
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken"); 
    axios
      .get(`${apiURL}/reflections`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => {
        setReflections(res.data.data); 
        console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
        setError("Failed to load reflections. Please try again.");
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
        {reflections.length === 0 && !loading && <p>No reflections found</p>}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default DiaryReflections;
