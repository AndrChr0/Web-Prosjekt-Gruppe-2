import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecentReflection.css";

const RecentReflection = () => {
    const { id } = useParams();
    const [reflection, setReflection] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get(`http://localhost:5151/reflections/${id}`)
        .then(res => {
          setReflection(res.data.reflection);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, [id]);
  

    if (!reflection) return <div>Reflection not found</div>;

    const handleDownload = (fileName) => {
        
        const downloadUrl = `/uploads/${fileName}`;
    
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


    return (
        <div>
            <div className="Reflection_card">
            <h2>Guest Lecture: Grigor Perelman</h2>

                <div className="Reflection_card_title">
                    <h3>" {reflection.title} "</h3>
                    <b>By: Student-Name</b>
                </div>
                <div className="Reflection_card_content">
                    
                    <p> {reflection.content} </p>
            
                </div>

                <div>
                    <span>Attached files:</span>

                    {reflection.files.length > 0 ? (
                        <ul>
                            {reflection.files.map((file, index) => (
                                <li key={index}>
                                    {file}
                                    
                                <button onClick={() => handleDownload(file)}>Download</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No files attached</p>
                    )}
                </div>
            </div>
            
        <button className="action-btn feedback-btn">Give feedback</button>
        </div>
    );
};

export default RecentReflection;
