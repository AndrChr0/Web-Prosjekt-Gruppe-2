import React from "react"
import "./Homepage.css"
import MainMenuButton from "../../components/MainmenuButton/MainMenuButton"
import HomeWelcomeCard from "../../components/HomeWelcomeCard/HomeWelcomeCard"
import { LatestReflectionsList } from "./LatestReflectionsList"
const TeachersHome = () => {
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
  )
}

export default TeachersHome
