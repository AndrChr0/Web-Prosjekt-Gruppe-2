import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ActionButton from "../ActionButton/ActionButton";

function EditReflection() {
  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({
    title: "",
    courseId: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    axios
      .get(`http://localhost:5151/reflections/${reflectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      })
      .then((res) => {
        setReflection(res.data.reflection);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [reflectionId]);

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
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this reflection?"
    );
    if (isConfirmed) {
      setLoading(true);
      axios
        .delete(`http://localhost:5151/reflections/${reflectionId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
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

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={reflection.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Course ID:
        <input
          type="text"
          name="courseId"
          value={reflection.courseId}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={reflection.content}
          onChange={handleChange}
        />
      </label>
      {/* <button type="submit">Save</button> */}
      <ActionButton btnType="submit" btnValue="Save" />
      <ActionButton
        onClick={handleDelete}
        btnType="button"
        btnValue="Delete Reflection"
      />
    </form>
  );
}

export default EditReflection;
