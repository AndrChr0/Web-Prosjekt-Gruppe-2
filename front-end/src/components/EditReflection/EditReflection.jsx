
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ActionButton from "../ActionButton/ActionButton";
import "./EditReflection.css"

function EditReflection() {
  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({
    title: "",
    courseId: "",
    content: "",
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchReflection = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5151/reflections/${reflectionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReflection(response.data.reflection);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred while fetching the reflection.");
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
        const response = await axios.get('http://localhost:5151/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred while fetching courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReflection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5151/reflections/${reflectionId}`,
        reflection,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/diary/${reflectionId}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    const isConfirmed = window.confirm("Are you sure you want to delete this reflection?");
    if (isConfirmed) {
      setLoading(true);
      axios
        .delete(`http://localhost:5151/reflections/${reflectionId}`, {
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
    <main>
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
        <input
          type="text"
          name="title"
          value={reflection.title}
          onChange={handleChange}
        />
      <label>Course ID:</label>
        <input
          type="text"
          name="courseId"
          value={reflection.courseId}
          onChange={handleChange}
        />
      <label>Content:</label>
        <textarea
          name="content"
          value={reflection.content}
          onChange={handleChange}
        />
      {/* <button type="submit">Save</button> */}
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
