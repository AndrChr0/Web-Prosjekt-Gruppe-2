// AuthProvider component
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('http://localhost:5151/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCurrentUser(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  async function updateUserEmail(newEmail) {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.put('http://localhost:5151/users/update-email', { email: newEmail }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentUser(prevUser => ({ ...prevUser, email: newEmail }));
      }
    } catch (error) {
      console.error("Error updating user email:", error);
    }
  }

  async function updateUserPassword(newPassword) {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.put('http://localhost:5151/users/update-password', { password: newPassword }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Error updating user password:", error);
    }
  }

  async function deleteUser() {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.delete('http://localhost:5151/users/delete', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, updateUserEmail, updateUserPassword, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};