
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ActionButton from '../ActionButton/ActionButton';

function EditReflection() {
  const { reflectionId } = useParams();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({ title: '', courseId: '', content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5151/reflections/${reflectionId}`)
      .then(res => {
        setReflection(res.data.reflection); 
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [reflectionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReflection(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Send a PUT request to update the reflection 
    axios.put(`http://localhost:5151/reflections/${reflectionId}`, reflection) 
      .then(() => {
        // Redirect to the reflection page
        navigate(`/diary/${reflectionId}`);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

    // Function to handle deleting a reflection   
  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this reflection?'); // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    if (isConfirmed) {
      setLoading(true);
      axios.delete(`http://localhost:5151/reflections/${reflectionId}`) // Send a DELETE request to the server: https://rapidapi.com/guides/delete-requests-axios
        .then(() => {
          navigate('/diary'); // Redirect to the my-diary page after deletion
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };




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
      <button type="button" onClick={handleDelete}>Delete Reflection</button>
    </form>
  );
}

export default EditReflection;
