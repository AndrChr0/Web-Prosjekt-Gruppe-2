import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Homepage.css";
import MainMenuButton from "../../components/MainmenuButton/MainMenuButton";
import HomeWelcomeCard from "../../components/HomeWelcomeCard/HomeWelcomeCard";

const TeachersHome = () => {


    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
          .get("http://localhost:5151/reflections")
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

    return(
    <main>
        <h1>Home</h1>

        {/* WELCOME CARD */}
        <HomeWelcomeCard></HomeWelcomeCard>

        {/* RECENT REFLECTIONS */}
        <ul className="Recent-reflections">
            <h2>Recent reflections</h2>    
            {reflections.map((reflection, i) => (
            <Link className="Text-link" to={`/submissions/${reflection._id}`}>
                <li className="Recent-reflection" key={reflection._id}>
                    <div>
                        <span><b>{reflection.courseCode}</b></span> 
                        <span>{reflection.title}</span>
                        {/* {user.firstName} */}
                        <b>Student-Name</b> {/* the user associated with the reflection */}
                    </div>
                    <div>
                        
                    </div>
                </li>
                </Link>
            ))}
        </ul>
        <div className="submissions_link">
            <MainMenuButton 
                path="/submissions"
                buttonName="Show all reflections"
            ></MainMenuButton>
        
        </div>

    </main>
    );
  }



export default TeachersHome;