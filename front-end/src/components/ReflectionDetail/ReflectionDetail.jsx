import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReflectionDetail() {
  const { reflectionId } = useParams();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    axios.get(`http://localhost:5151/reflections/${reflectionId}`)
      .then(res => {
        setReflection(res.data.reflection); // Adjust based on your API response structure
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [reflectionId]);

  const handleEdit = () => {
    history.push(`/edit-reflection/${reflectionId}`);
  };


  if (loading) return <div>Loading...</div>;
  if (!reflection) return <div>Reflection not found</div>;

  return (
    <div>
      <h1>{reflection.title}</h1>
      <p>{reflection.content}</p>
      <p>Course ID: {reflection.courseId}</p>
      {reflection.files && reflection.files.map((file, index) => (
        <div key={index}>
          <a target='_blank' href={`http://localhost:5151/${file}`} download>
            Download File {index + 1}
          </a>
        </div>
      ))}
       <button onClick={handleEdit}>Edit Reflection</button>
    </div>
  );
}

export default ReflectionDetail;
