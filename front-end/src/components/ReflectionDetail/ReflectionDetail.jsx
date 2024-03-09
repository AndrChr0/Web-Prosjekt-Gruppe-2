// In ReflectionDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReflectionDetail() {
  const { reflectionId } = useParams();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5151/reflections/${reflectionId}`)
      .then(res => {
        console.log('API Response:', res.data); // Log the API response
        console.log(reflection)
        setReflection(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [reflectionId]);

  if (loading) return <div>Loading...</div>;
  if (!reflection) return <div>Reflection not found</div>;

  return (
    <div>
      <h1>{reflection.title}</h1>
      <p>{reflection.content}</p>
      <p>Course ID: {reflection.courseId}</p>
    </div>
  );
}

export default ReflectionDetail;
