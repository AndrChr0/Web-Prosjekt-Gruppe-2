import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import "../assets/styles/profilePage.css";

function ProfilePage() {
  const { currentUser, updateUser, deleteUser, setCurrentUser } = useAuth();
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "", // Initialize with empty string
    confirmNewPassword: "", // Initialize with empty string
  });

  useEffect(() => {
    if (currentUser) {
      setUpdatedProfile({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const handleEdit = (field) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [field]: true,
    }));
  };

  const handleCancelEdit = (field) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [field]: false,
    }));
    // Reset the updatedProfile state to the original values from currentUser
    setUpdatedProfile({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      newPassword: "", // Reset password fields
      confirmNewPassword: "", // Reset password fields
    });
  };

  const handleSave = async () => {
    try {
      // Check if the password fields are being edited
      if (editableFields.password) {
        // Check if the new password and confirm password match
        if (updatedProfile.newPassword !== updatedProfile.confirmNewPassword) {
          console.error("New password and confirm password do not match");
          return;
        }
        
        // Set the password field in the updatedProfile state to the new password
        updatedProfile.password = updatedProfile.newPassword;
      }
  
      // Update the user profile with the updated profile data
      await updateUser(updatedProfile);
  
      // Reset the editableFields state and update the currentUser object
      setEditableFields({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      });
  
      // Update the currentUser object with the updated profile
      setCurrentUser((prevUser) => ({
        ...prevUser,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  const handleDeleteAccount = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmation) {
        await deleteUser();
        window.location.href = "/register";
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>My Profile</h1>
      <div className="profile_container">
        <div className="profile-settings">
          {/* First Name */}
          <div className="profile-field">
            <p>First Name: </p>
            {editableFields.firstName ? (
              <input
                type="text"
                name="firstName"
                placeholder="Enter new first name"
                value={updatedProfile.firstName}
                onChange={handleInputChange}
                className="profile-value editable"
              />
            ) : (
              <span className="profile-value">{currentUser.firstName}</span>
            )}
            {!editableFields.firstName ? (
              <button
                onClick={() => handleEdit("firstName")}
                className="edit-button"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleCancelEdit("firstName")}
                className="edit-button"
              >
                Cancel
              </button>
            )}
          </div>
          {/* Last Name */}
          <div className="profile-field">
            <p>Last Name: </p>
            {editableFields.lastName ? (
              <input
                type="text"
                name="lastName"
                placeholder="Enter new last name"
                value={updatedProfile.lastName}
                onChange={handleInputChange}
                className="profile-value editable"
              />
            ) : (
              <span className="profile-value">{currentUser.lastName}</span>
            )}
            {!editableFields.lastName ? (
              <button
                onClick={() => handleEdit("lastName")}
                className="edit-button"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleCancelEdit("lastName")}
                className="edit-button"
              >
                Cancel
              </button>
            )}
          </div>
          {/* Email */}
          <div className="profile-field">
            <p>Email: </p>
            {editableFields.email ? (
              <input
                type="email"
                name="email"
                placeholder="Enter new email"
                value={updatedProfile.email}
                onChange={handleInputChange}
                className="profile-value editable"
              />
            ) : (
              <span className="profile-value">{currentUser.email}</span>
            )}
            {!editableFields.email ? (
              <button
                onClick={() => handleEdit("email")}
                className="edit-button"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleCancelEdit("email")}
                className="edit-button"
              >
                Cancel
              </button>
            )}
          </div>
          {/* Password */}
          <div className="profile-field password-field">
            <p>Password: </p>
            {editableFields.password ? (
              <div className="password-input">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={updatedProfile.newPassword}
                  onChange={handleInputChange}
                  className="profile-value editable"
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  value={updatedProfile.confirmNewPassword}
                  onChange={handleInputChange}
                  className="profile-value editable"
                />
              </div>
            ) : (
              <span className="profile-value password-input">
                {/* For security reasons, don't show the current password */}
                ************
              </span>
            )}
            {!editableFields.password ? (
              <button
                onClick={() => handleEdit("password")}
                className="edit-button"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleCancelEdit("password")}
                className="edit-button"
              >
                Cancel
              </button>
            )}
          </div>
          {/* Buttons */}
          <div className="profile-buttons">
            <button onClick={handleSave} className="save-button">
              Save Changes
            </button>
            <button onClick={handleDeleteAccount} className="delete-button">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
