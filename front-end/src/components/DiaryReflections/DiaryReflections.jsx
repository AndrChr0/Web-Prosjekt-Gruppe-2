import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiaryReflections.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function DiaryReflections() {
  const apiURL = import.meta.env.VITE_URL;

  const [reflections, setReflections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFeedback, setFeedback] = useState({});

  // Utility function to format date strings into a more readable format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Oslo",
    };
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
        const reflectionsResponse = res.data.data;
        setReflections(reflectionsResponse);
        setLoading(false);

        const feedbackMap = {}; //used to store the feedback status for each reflection
        reflectionsResponse.forEach((reflection) => {
          fetchFeedback(reflection._id)
            .then((hasFeedback) => {
              // hasFeedback is true/false based on if feedback exists for the reflection

              feedbackMap[reflection._id] = hasFeedback;
              setFeedback({ ...feedbackMap }); // spreading the key value pairs
            })
            .catch((error) => {
              console.error("Error fetching feedback:", error);
            });
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const fetchFeedback = async (reflectionId) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get(
        `${apiURL}/feedback?reflectionId=${reflectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data.length > 0;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return false;
    }
  };

  return (
    <main id="test-id-diary-reflections">
      <div>
        {loading ? (
          <h2>Please wait</h2>
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
                  {hasFeedback[reflection._id] && ( // if feedback exists for the reflection, show indicator
                    <div className="feedback-symbol">
                      <FontAwesomeIcon icon={faComment} />
                      <span> Received feedback</span>
                    </div>
                  )}
                  <div className="link-container">
                    <Link to={`/diary/${reflection._id}`}>
                      <button className="main-menu-btn">View</button>
                    </Link>
                    <Link to={`/edit_reflection/${reflection._id}`}>
                      <button className="main-menu-btn">Edit</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {reflections.length === 0 && !loading && (
          <p>You have no reflections yet.</p>
        )}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default DiaryReflections;
