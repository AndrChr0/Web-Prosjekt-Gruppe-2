import "../src/assets/styles/App.css"
import "../src/assets/styles/Home.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeaf } from "@fortawesome/free-solid-svg-icons"
import ActionButton from "./components/ActionButton/ActionButton"
import { useNavigate } from "react-router-dom"

const apiURL = import.meta.env.VITE_URL

// Leaf Icon Component
const LeafIcon = () => <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />

function Home() {
  const navigate = useNavigate()

  return (
    <main className="home-main">
      <div className="home-card">
        <h1 className="home-card-header">
          <span className="welcome-text">Welcome</span>

          <span className="remaining-text">to the Sustainability Diary</span>
          <LeafIcon />
        </h1>
        <p className="home-card-text">
          Our platform is dedicated to enhancing sustainability education by
          fostering meaningful discussions and reflections on
          sustainability-related topics. Whether you're a student eager to track
          your learning progress or a teacher looking to engage with students
          dynamically, you've come to the right place.
        </p>
        <p className="home-card-text">
          Our platform is designed to be a conversational tool that bridges the
          gap between students and teachers, making sustainability a central
          part of the learning process. By signing up and participating, you
          contribute to a holistic approach to sustainability education,
          aligning with broader educational objectives.
        </p>
        <p className="home-card-text">
          We are excited to see how you will use this platform to grow and
          learn. Get started today by creating an account or logging into your
          existing profile. Let's make sustainability an integral part of our
          education and future!
        </p>

        <div className="move__button">
          <ActionButton
            id="register"
            btnType="button"
            btnValue="Click here to register"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
    </main>
  )
}

export default Home
