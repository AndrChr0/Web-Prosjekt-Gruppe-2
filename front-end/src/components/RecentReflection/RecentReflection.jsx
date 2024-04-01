import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecentReflection.css";


const RecentReflection = () => {
    const { id } = useParams();
    const [reflection, setReflection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enlargedImage, setEnlargedImage] = useState(null);
  
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios
            .get(`http://localhost:5151/reflections/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include JWT token in request headers
                },
            })
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



    const handleClick = (image) => {
        setEnlargedImage(image);
    }

    const handleClose = () => {
        setEnlargedImage(null);
    }

    return (
        <div>
            <div className="Reflection_card">
                <div className="Reflection_card_title">
                    <h2>" {reflection.title} "</h2>
                    <b>By: Student-Name</b>
                </div>
                <div className="Reflection_card_content">
                    <p> {reflection.content} </p>
                </div>

                <div>
                    <span>Attached files:</span>
                    {reflection.files &&
                        reflection.files.map((file, index) => {
                            const fileExtension = file.split('.').pop().toLowerCase();
                            if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                                return (
                                    <div key={index}>
                                        <img
                                            onClick={() => handleClick(file)}
                                            className="reflection-image"
                                            src={`http://localhost:5151/${file}`}
                                            alt={`Image ${index + 1}`}
                                        />
                                    </div>
                                );
                            } else if (fileExtension === 'pdf') {
                                return (
                                    <div key={index}>
                                        <a
                                            href={`http://localhost:5151/${file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                );
                            } else if (fileExtension === 'mp4') {
                                return (
                                    <div key={index}>
                                        <video width="320" height="240" controls>
                                            <source
                                                className="reflection-video"
                                                src={`http://localhost:5151/${file}`}
                                                type="video/mp4"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                );
                            } else if (fileExtension === 'zip' || fileExtension === 'gz') {
                                return (
                                    <div key={index}>
                                        <a
                                            href={`http://localhost:5151/${file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Download zip file
                                        </a>
                                    </div>
                                );
                            } 
                        })
                        
                    }
                    {reflection.files.length === 0 && <p>No files attached</p>}
                    </div>
            </div>
            <button className="action-btn feedback-btn">Give feedback</button>


            {enlargedImage && (
                <div className="popup">
                    <div className="popup-content">
                    <img src={`http://localhost:5151/${enlargedImage}`} alt="Enlarged Image" />
                    <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentReflection;
