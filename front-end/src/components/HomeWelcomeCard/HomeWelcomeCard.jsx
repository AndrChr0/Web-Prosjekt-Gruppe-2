import React from "react";
import { useAuth } from "../context/AuthContext"; // Import your authentication context

import "./HomeWelcomeCard.css";

function HomeWelcomeCard() {
  const { currentUser } = useAuth(); // Access the current user data from your authentication context

  const showWelcomeCard = localStorage.getItem('showWelcomeCard');

  if (showWelcomeCard === 'false') {
    return null;
  }

  function doNotShow() {
    localStorage.setItem('showWelcomeCard', false);
  }

  return (
    <div className="card-container">
      <h2 className="home-card-header">Welcome to the sustainability diary, {currentUser && `${currentUser.firstName}🌱`}</h2>
      <p className="home-card-text">
        Welcome to the Sustainability Diary, your new space for growth and
        reflection on sustainability! Created as part of NTNU's initiative to
        integrate sustainability into education, this platform offers you a
        unique opportunity to document, reflect, and share your sustainability
        journey. Whether you're a student exploring your thoughts and projects,
        or a teacher guiding the next generation, the Sustainability Diary is
        designed to foster a deeper understanding of sustainability practices.
        Track your progress, and become part of a community dedicated to making
        a difference. Dive in and start your sustainability diary today, where
        every entry is a step towards a more sustainable future.
      </p>
      <i>
        Please note that you're exploring the beta version of our site, where
        we're still fine-tuning features and not all functionalities are fully
        implemented yet.
      </i>
      <button className="remove-text-button" onClick={() => {
        doNotShow();
        document.querySelector('.card-container').style.display = 'none';
      }}>Do not show this again</button>
    </div>
  );
}

export default HomeWelcomeCard;
