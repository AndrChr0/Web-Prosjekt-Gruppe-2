import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import '../assets/styles/profilePage.css';

function ProfilePage() {
  const { currentUser, updateUserEmail, updateUserPassword, deleteUser } = useAuth();
  const [editableEmail, setEditableEmail] = useState(false);
  const [editablePassword, setEditablePassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('********');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState('Password');

  useEffect(() => {
    if (currentUser) {
      setNewEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleEdit = (field) => {
    if (field === 'newEmail') {
      setEditableEmail(true);
      setNewEmail(currentUser.email);
    } else if (field === 'newPassword') {
      setEditablePassword(true);
      setPasswordLabel('New Password');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  const handleSave = async () => {
    const isEmailChanged = newEmail !== currentUser.email;
    const isPasswordChanged = newPassword !== '' && newPassword === confirmNewPassword;

    if (isEmailChanged || isPasswordChanged) {
      const confirmation = window.confirm("Are you sure you want to save the changes?");
      if (confirmation) {
        if (isEmailChanged) {
          await updateUserEmail(newEmail);
        }
        if (isPasswordChanged) {
          await updateUserPassword(newPassword);
        }
        setNewEmail(newEmail);
      } else {
        setNewEmail(currentUser.email);
        setNewPassword('');
        setConfirmNewPassword('');
        return;
      }
    } else {
      alert("No changes made.");
      return;
    }

    setEditableEmail(false);
    setEditablePassword(false);
    setPasswordLabel('Password');
  };

  const handleDeleteAccount = async () => {
    try {
        const confirmation = window.confirm("Are you sure you want to delete your account?");
        if (confirmation) {
            await deleteUser();
            window.location.href = '/register'; 
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        alert('Error deleting user account.');
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newEmail') {
      setNewEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmNewPassword') {
      setConfirmNewPassword(value);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      <div className="profile-settings">
        <div className="profile-field">
          <p>Email: </p>
          {editableEmail ? (
            <input
              type="email"
              name="newEmail"
              placeholder="Enter new email"
              value={newEmail}
              onChange={handleInputChange}
              className="profile-value editable"
            />
          ) : (
            <span className="profile-value">{currentUser.email}</span>
          )}
          {!editableEmail && <button onClick={() => handleEdit('newEmail')} className="edit-button">Edit</button>}
        </div>
        <div className="profile-field">
          <p>{passwordLabel}: </p>
          {editablePassword ? (
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleInputChange}
              className="profile-value editable"
            />
          ) : (
            <span className="profile-value">{'*'.repeat(newPassword.length)}</span>
          )}
          {!editablePassword && <button onClick={() => handleEdit('newPassword')} className="edit-button">Edit</button>}
        </div>
        {editablePassword && (
          <div className="profile-field">
            <p>Confirm new password: </p>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={handleInputChange}
              className="profile-value editable"
            />
          </div>
        )}
        <div className="profile-buttons">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
          <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
