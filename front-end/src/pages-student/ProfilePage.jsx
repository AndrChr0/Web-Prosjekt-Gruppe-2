import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/styles/profilePage.css";

function ProfilePage() {
  const { currentUser, updateUser, deleteUser, setCurrentUser, logout } = useAuth();
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
    newPassword: "",
    confirmNewPassword: "",
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
    setUpdatedProfile({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSave = async () => {
    const profileUnchanged =
      updatedProfile.firstName === currentUser.firstName &&
      updatedProfile.lastName === currentUser.lastName &&
      updatedProfile.email === currentUser.email &&
      !updatedProfile.newPassword &&
      !updatedProfile.confirmNewPassword;

    if (profileUnchanged) {
      toast.error("No changes have been made");
      return;
    }

    if (editableFields.password) {
      if (updatedProfile.newPassword !== updatedProfile.confirmNewPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      updatedProfile.password = updatedProfile.newPassword;
    }

    try {
      await updateUser(updatedProfile);

      setEditableFields({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      });

      setCurrentUser((prevUser) => ({
        ...prevUser,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete your account?");
      if (confirmation) {
        await deleteUser();
        logout();
        window.location.href = "/register";
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting user account: " + error.message);
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
      <ToastContainer />
    </main>
  );
}

export default ProfilePage;
