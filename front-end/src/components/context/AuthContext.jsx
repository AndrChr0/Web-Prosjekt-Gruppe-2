// src/components/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      decodeAndSetUser(token);
    }
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
//Logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

// Add decodeAndSetUser to the value object of AuthContext.Provider
return (
  <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, decodeAndSetUser }}>
    {children}
  </AuthContext.Provider>
);
  
};
