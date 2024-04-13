import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/context/AuthContext';

const StudentReflections = () => {
    const { currentUser } = useAuth();
    const [reflections, setReflections] = useState([]);

    useEffect(() => {
        if (currentUser && currentUser.role === 'student') {
            axios.get('/api/reflections', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            })
            .then(response => {
                setReflections(response.data);
            })
            .catch(error => {
                console.error("Error fetching reflections:", error);
            });
        }
    }, [currentUser]);

    return (
        <main>
            <h1>My Reflections</h1>
            <ul>
                {reflections.map((reflection, index) => (
                    <li key={index}>
                        <p>{reflection.title}</p>
                        <p>{reflection.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default StudentReflections;