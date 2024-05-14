import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
const apiURL = import.meta.env.VITE_URL;
// const apiURL = '/api';


export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log("currentUser", currentUser);

  useEffect(() => {
    async function fetchAndSetUser() {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token);
            setCurrentUser(decoded);

            try {
                const response = await axios.get(`${apiURL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCurrentUser(response.data); // set current user to user data
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

  const decodeAndSetUser = (token) => {
   const jsonPayload = jwtDecode(token);
    try {
      setCurrentUser(jsonPayload);
      console.log( "fetching n set user data", jsonPayload);
    } catch (error) {
      console.error("Error decoding user token:", error);
    }
  };

  // se på typ React-Query
  const fetchUserData = async (token) => {
    setLoading(true);  
    try {
      const response = await axios.get(`${apiURL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data);  
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
        await axios.put(`${apiURL}/users/update-email`, { email: newEmail }, {
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
        await axios.put(`${apiURL}/users/update-password`, { password: newPassword }, {
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
        await axios.delete(`${apiURL}/users/delete`, {
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

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      fetchUserData,
      setCurrentUser, 
      logout, 
      updateUserEmail, 
      updateUserPassword, 
      deleteUser,
      decodeAndSetUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
