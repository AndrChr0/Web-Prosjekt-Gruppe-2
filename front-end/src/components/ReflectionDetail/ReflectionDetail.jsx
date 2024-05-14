import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import axios from "axios";

import "./ReflectionDetail.css";

function ReflectionDetail() {

  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';


  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true);

  const [enlargedImage, setEnlargedImage] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .get(`${apiURL}/reflections/${reflectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReflection(res.data.reflection);
        fetchFeedback(reflectionId); // Call fetchFeedback after setting reflection
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  }, [reflectionId, navigate]);

  const fetchFeedback = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${apiURL}/feedback?reflectionId=${reflectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedback(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  };

  const handleClick = (image) => {
    setEnlargedImage(image);
  };

  const handleClose = () => {
    setEnlargedImage(null);
  };

  const renderFeedback = () => {
    if (feedback.length === 0) {
      return <p>No feedback for this reflection yet</p>;
    }

    return feedback.map((item) => (
      <div className="feedback-item" key={item._id}>
        <p>
          {" "}
          <b>Teacher's comment:</b>{" "}
        </p>
        <p>{item.content}</p>
        <p>
          {" "}
          <b>Name: </b>
        </p>
        <p>{item.userId}</p>
      </div>
    ));
  };

  const handleEdit = () => {
    navigate(`/edit_reflection/${reflectionId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!reflection) return <div>Reflection not found</div>;

  return (
    <main>
      <div className="Reflection_card">
        <div className="Reflection_card_title">
          <h2>" {reflection.title} "</h2>
          <b>By: Student-Name</b>
        </div>
        <div className="Reflection_card_content">
          <p dangerouslySetInnerHTML={{ __html: reflection.content }}></p>
        </div>

        <div className="Reflection-files-area">
          <span>Attached files:</span>
          {reflection.files &&
            reflection.files.map((file, index) => {
              const fileExtension = file.split(".").pop().toLowerCase();
              if (
                fileExtension === "jpg" ||
                fileExtension === "jpeg" ||
                fileExtension === "png"
              ) {
                return (
                  <div key={index}>
                    <img
                      onClick={() => handleClick(file)}
                      className="reflection-image"
                      src={`${apiURL}/${file}`}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                );
              } else if (fileExtension === "pdf") {
                return (
                  <div key={index}>
                    <a
                      href={`${apiURL}/${file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>
                  </div>
                );
              } else if (fileExtension === "mp4") {
                return (
                  <div key={index}>
                    <video width="320" height="240" controls>
                      <source
                        className="reflection-video"
                        src={`${apiURL}/${file}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              } else if (fileExtension === "zip" || fileExtension === "gz") {
                return (
                  <div key={index}>
                    <a
                      href={`${apiURL}/${file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download zip file
                    </a>
                  </div>
                );
              }
            })}
          {reflection.files.length === 0 && <p>No files attached</p>}
        </div>

        {/* COURSE LINK */}
        {reflection.courseId && (
          <p className="course-id">
            Course:{" "}
            <Link to={`/courses/${reflection.courseId}`}>Course link</Link>{" "}
          </p>
        )}

        <div className="feedback-section">
          <h3>Feedback</h3>
          {renderFeedback()}
        </div>
        {enlargedImage && (
          <div className="popup">
            <div className="popup-content">
              <img
                src={`${apiURL}/${enlargedImage}`}
                alt="Enlarged Image"
              />
              <button className="main-menu-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}

        <ActionButton
          onClick={handleEdit}
          btnType="button"
          btnValue="Edit Reflection"
        />
      </div>
    </main>
  );
}

export default ReflectionDetail;
