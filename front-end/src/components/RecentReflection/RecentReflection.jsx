import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecentReflection.css";

const RecentReflection = () => {
  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';
  
  const { id } = useParams();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${apiURL}/reflections/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      })
      .then((res) => {
        setReflection(res.data.reflection);
        setLoading(false);
        fetchFeedback(id);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const fetchFeedback = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${apiURL}/feedback?reflectionId=${id}`, {
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

  if (!reflection) return <div>Reflection not found</div>;

  const handleClick = (image) => {
    setEnlargedImage(image);
  };

  const handleClose = () => {
    setEnlargedImage(null);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmitFeedback = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiURL}/feedback`,
        { content: feedbackText, reflectionId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );

      console.log("Feedback submitted:", res.data.content);
      setShowFeedbackForm(false);
      sendNotificationOfFeedback(reflection.userId, reflection.title);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleDelete = (feedbackId) => {
    const token = localStorage.getItem("authToken");
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (isConfirmed) {
      axios
        .delete(`${apiURL}/feedback/${feedbackId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        })
        .then(() => {
          fetchFeedback(id);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };
  const renderFeedback = () => {
    if (feedback.length === 0) {
      return <p>No feedback for this reflection yet</p>;
    }

    return feedback.map((item) => (
      <div className="feedback-item" key={item._id}>
        <p>
          {" "}
          <b>My feedback:</b>{" "}
        </p>
        <p>{item.content}</p>
        {/* <p> <b>By: </b></p> */}
        {/* <p>{item.userId}</p> */}
        <button className="remove-btn" onClick={() => handleDelete(item._id)}>
          Remove
        </button>
      </div>
    ));
  };

  const sendNotificationOfFeedback = (userId) => {
    axios
      .post(
        `${apiURL}/notifications` ,
        {
          content: `You have received feedback on your reflection: "${reflection.title}"`,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        console.log("Notification was sent to student");
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  }


  return (
    <div className="Reflection_card--wrapper">
      <div className="Reflection_card">
        <div className="Reflection_card_title">
          <h2>{reflection.title}</h2>
          <p>By: {reflection.userId.firstName} {reflection.userId.lastName}</p>
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
        <div className="feedback-section">
          <h3>Feedback </h3>
          {renderFeedback()}
        </div>
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
      {showFeedbackForm && (
        <form className="feedback-form">
          <textarea
            value={feedbackText}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback here"
          ></textarea>
          <button className="main-menu-btn" onClick={handleSubmitFeedback}>
            Submit Feedback
          </button>
        </form>
      )}
      {!showFeedbackForm && (
        <button
          className="main-menu-btn feedback-btn"
          onClick={() => setShowFeedbackForm(true)}
        >
          Give feedback
        </button>
      )}
    </div>
  );
};

export default RecentReflection;
