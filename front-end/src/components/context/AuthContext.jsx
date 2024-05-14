import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

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
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);

        try {
          const response = await axios.get('http://localhost:5151/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchAndSetUser();
  }, []);

  const updateUser = async (updatedProfile) => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.put('http://localhost:5151/users/update_profile', updatedProfile, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Fetch updated user data after successful update
        await fetchUserData(token);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.delete('http://localhost:5151/users/delete', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  const logout = () => {
    // Add logout logic here, such as clearing localStorage
    localStorage.removeItem('authToken'); // Clear authentication token from localStorage
    setCurrentUser(null); // Reset current user state
  };

  const fetchUserData = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5151/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const decodeAndSetUser = (token) => {
    const jsonPayload = jwtDecode(token);
    try {
      setCurrentUser(jsonPayload);
      fetchUserData(token); // Update user data immediately after decoding token
    } catch (error) {
      console.error("Error decoding user token:", error);
    }
  };

  // Implement other functions as needed

  return (
    <AuthContext.Provider value={{
      currentUser,
      updateUser,
      deleteUser,
      logout,
      fetchUserData,
      decodeAndSetUser,
      setCurrentUser // Include setCurrentUser in the context value
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;