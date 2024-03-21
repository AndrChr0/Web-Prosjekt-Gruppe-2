import React, { useState, useEffect } from 'react';
//Had issues using decode jwt so used a manual decode
const Profile = () => {
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64url to base64
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            try {
                const { email } = JSON.parse(jsonPayload);
                console.log("Decoded Email: ", email); // Log the email here
                setUserEmail(email); // Assuming the JWT contains an email field
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    // Optional: useEffect to log userEmail when it changes
    useEffect(() => {
        if (userEmail) {
            console.log("User email updated:", userEmail);
        }
    }, [userEmail]);

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Hello, {userEmail || "Guest"}</h2>
        </div>
    );
};

export default Profile;
