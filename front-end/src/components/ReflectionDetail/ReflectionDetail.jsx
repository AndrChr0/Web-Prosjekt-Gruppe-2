import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import axios from "axios";

import "./ReflectionDetail.css";

function ReflectionDetail() {
  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .get(`http://localhost:5151/reflections/${reflectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      })
      .then((res) => {
        setReflection(res.data.reflection);
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


  const handleEdit = () => {
    navigate(`/edit_reflection/${reflectionId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!reflection) return <div>Reflection not found</div>;

  return (
    <main>
    <h1>{reflection.title}</h1>
     <div className="detailContainer">
      <p className="content">{reflection.content}</p>
      <p className="course-id">Course ID: {reflection.courseId}</p>
      {reflection.files &&
        reflection.files.map((file, index) => (
          <div key={index}>
            <a
              className="file-link"
              target="_blank"
              rel="noopener noreferrer" // Added for security
              href={`http://localhost:5151/${file}`}
              download
            >
              Download File {index + 1}
            </a>
    </div>
        ))}
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
