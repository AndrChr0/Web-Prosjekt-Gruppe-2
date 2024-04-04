// src/components/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSetUser() {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Attempt to decode the user from the token first
        decodeAndSetUser(token);
        // Optionally fetch detailed user data from the server
        await fetchUserData(token);
      } else {
        setLoading(false);
      }
    }
    fetchAndSetUser();
  }, []);

  const decodeAndSetUser = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    try {
      const decoded = JSON.parse(jsonPayload);
      setCurrentUser(decoded);
    } catch (error) {
      console.error("Error decoding user token:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5151/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data); // Assuming the response data is the user object
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

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
        setCurrentUser(null); // Clear user context upon successful deletion
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      logout, 
      updateUserEmail, 
      updateUserPassword, 
      deleteUser
    }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
