import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActionButton from '../ActionButton/ActionButton';
import axios from 'axios';

import './ReflectionDetail.css';

function ReflectionDetail() {
  const { reflectionId } = useParams();
  const [reflection, setReflection] = useState(null);
  const navigate = useNavigate();
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
    navigate(`/edit_reflection/${reflectionId}`);
  };


  if (loading) return <div>Loading...</div>;
  if (!reflection) return <div>Reflection not found</div>;

  return (
    <div>
      <h1>{reflection.title}</h1>
      <p className='content'>{reflection.content}</p>
      <p className='course-id'>Course ID: {reflection.courseId}</p>
      {reflection.files && reflection.files.map((file, index) => (
        <div key={index}>
          <a className='file-link' target='_blank' href={`http://localhost:5151/${file}`} download>
            Download File {index + 1}
          </a>
        </div>
      ))}
       {/* <button onClick={handleEdit}>Edit Reflection</button> */}
       <ActionButton onClick={handleEdit} btnType="button" btnValue="Edit Reflection" />
    </div>
  );
}

export default ReflectionDetail;
