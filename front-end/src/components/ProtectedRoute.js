// ProtectedRoute.js
import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken") // Simplified authentication check

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
