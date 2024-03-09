// import React, { useState } from 'react';
import '../assets/styles/profile.css'; 

function Profile() {

    // IMPORTANT! Alt som er kommentert ut er forslag til løsning for backend biten(ChatGPT)

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Function to handle saving changes
//   const handleSaveChanges = () => {
//     // Logic to save changes
//     console.log('Changes saved:', { fullName, email, password });
//   };

  return (
    <>
        <h1>Profile</h1>
        <div className="profile-container">
        <h1 className="profile-heading">Change profile settings</h1>
        <div className="profile-settings">
            <div className="profile-field">
            <label>Full Name:</label>
            <input
                type="text"
                placeholder="Enter new full name"
                // value={fullName}
                // onChange={(e) => setFullName(e.target.value)}
            />
            </div>
            <div className="profile-field">
            <label>Email:</label>
            <input
                type="email"
                placeholder="Enter new email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="profile-field">
            <label>Password:</label>
            <input
                type="password"
                placeholder="Enter new password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            {/* onClick={handleSaveChanges} */}
            <button className="save-button">
            Save Changes
            </button>
        </div>
        </div>
    </>
  );
}

export default Profile;
