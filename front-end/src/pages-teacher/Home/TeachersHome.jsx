import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import MainMenuButton from "../../components/MainmenuButton/MainMenuButton";
import HomeWelcomeCard from "../../components/HomeWelcomeCard/HomeWelcomeCard";
import { LatestReflectionsList } from "./LatestReflectionsList";
const TeachersHome = () => {
  const apiURL = import.meta.env.VITE_URL;

  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/reflections`)
      .then((res) => {
        // displays the 5 most recent reflections
        const topFiveReflections = res.data.data.reverse().splice(0, 5);
        setReflections(topFiveReflections);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Teacher Dashboard</h1>
      <HomeWelcomeCard />

      {/* RECENT REFLECTIONS */}
      <h2>Recent reflections</h2>
      <LatestReflectionsList />

      <div className="submissions_link">
        <MainMenuButton
          path="/submissions"
          buttonName="Show all reflections"
        ></MainMenuButton>
      </div>
    </main>
  );
};

export default TeachersHome;
