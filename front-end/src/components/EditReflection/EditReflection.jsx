import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ActionButton from "../ActionButton/ActionButton";
import "./EditReflection.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditReflection() {
  const apiURL = import.meta.env.VITE_URL;

  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({
    title: "",
    courseId: "",
    content: "",
    visibility: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchReflection = async () => {
      try {
        setLoading(true);
        // fetch reflection by id
        const response = await axios.get(
          `${apiURL}/reflections/${reflectionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReflection(response.data.reflection);
        console.log(response.data.reflection);
      } catch (error) {
        console.error(error);
        setError(
          error.message || "An error occurred while fetching the reflection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReflection();
  }, [reflectionId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiURL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred while fetching courses.");
      }
    };

    fetchCourses();
  }, []);

  // function to handle changes in form fields
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setReflection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      await axios.put(`${apiURL}/reflections/${reflectionId}`, reflection, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/diary/${reflectionId}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this reflection?"
    );
    if (isConfirmed) {
      setLoading(true);
      axios
        .delete(`${apiURL}/reflections/${reflectionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          navigate("/diary");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main id="test-id">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={reflection.title}
          onChange={handleChange}
        />

        <label>Content:</label>
        <ReactQuill
          theme="snow"
          value={reflection.content}
          onChange={(value) => setReflection({ ...reflection, content: value })}
        />
        <label htmlFor="visibility">Share with teacher:</label>
        <input
          type="checkbox"
          name="visibility"
          checked={reflection.visibility}
          onChange={handleChange}
        />

        <div className="actions-container">
          <ActionButton btnType="submit" btnValue="Save" />
          <ActionButton
            onClick={handleDelete}
            btnType="button"
            btnValue="Delete Reflection"
          />
        </div>
      </form>
    </main>
  );
}

export default EditReflection;
