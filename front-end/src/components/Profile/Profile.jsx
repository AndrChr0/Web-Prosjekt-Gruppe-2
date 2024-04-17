import { useState, useEffect } from "react";
import { jwtDecode }  from "jwt-decode";
import "./Profile.css";

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { email } = decodedToken;
        console.log("Decoded Email: ", email); // Log the email here
        setUserEmail(email); // Assuming the JWT contains an email field
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      console.log("User email updated:", userEmail);
    }
  }, [userEmail]);

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile Page</h1>
      <h2 className="profile-email">Hello, {userEmail || "Guest"}</h2>
    </div>
  );
};

export default Profile;
