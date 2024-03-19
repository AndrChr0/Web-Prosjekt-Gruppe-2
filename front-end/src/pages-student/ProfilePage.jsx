import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../assets/styles/profile.css'; 

function ProfilePage() {
  // State variables to store user data
  const [userData, setUserData] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = response.data;
      // Fill the email and password inputs
      setUserData({
        ...userData,
        password: '', // Clear password field for security reasons
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the authentication token from localStorage
      await axios.put(
        '/api/user/profile-page', // Correct endpoint for profile updates
        { fullName: userData.fullName, email: userData.email, password: userData.password }, // Send updated user profile data
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the request headers
      );
      console.log('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Function to handle deleting account
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the authentication token from localStorage
      await axios.delete(
        '/api/user/delete-account', // Endpoint for deleting account
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the request headers
      );
      console.log('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      <div className="profile-settings">
        <div className="profile-field">
          <label>Full Name:</label>
          {isEditingName ? (
            <input
              type="text"
              value={userData ? userData.fullName : ''}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              className="profile-value"
            />
          ) : (
            <span className="profile-value">{userData ? userData.fullName : ''}</span>
          )}
          <button
            className="edit-button"
            onClick={() => setIsEditingName(!isEditingName)}
          >
            {isEditingName ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditingEmail ? (
            <input
              type="email"
              value={userData ? userData.email : ''}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="profile-value"
            />
          ) : (
            <span className="profile-value">{userData ? userData.email : ''}</span>
          )}
          <button
            className="edit-button"
            onClick={() => setIsEditingEmail(!isEditingEmail)}
          >
            {isEditingEmail ? 'Save' : 'Edit'}
          </button>
        </div>
      <div className="profile-field">
        <label>Password:</label>
        {isEditingPassword ? (
          <input
            type="text" // Change input type to text when editing
            value={userData ? userData.password : ''}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="profile-value"
          />
        ) : (
          <span className="profile-value">••••••••</span> // Display dots when not editing
        )}
        <button
          className="edit-button"
          onClick={() => setIsEditingPassword(!isEditingPassword)}
        >
          {isEditingPassword ? 'Save' : 'Edit'}
        </button>
      </div>

        <div className="profile-field">
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="delete-button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
