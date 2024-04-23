import "../src/assets/styles/App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "./components/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="main__home">
        <h1>
          Welcome to the Sustainability Diary
          <FontAwesomeIcon icon={faLeaf} />
        </h1>
        <p>
          Our platform is dedicated to enhancing sustainability education by
          fostering meaningful discussions and reflections on
          sustainability-related topics. Whether you're a student eager to track
          your learning progress or a teacher looking to engage with students
          dynamically, you've come to the right place.
        </p>
        <p>
          Our platform is designed to be a conversational tool that bridges the
          gap between students and teachers, making sustainability a central
          part of the learning process. By signing up and participating, you
          contribute to a holistic approach to sustainability education,
          aligning with broader ducational objectives.
        </p>
        <p>
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
  );
}

export default Home;
