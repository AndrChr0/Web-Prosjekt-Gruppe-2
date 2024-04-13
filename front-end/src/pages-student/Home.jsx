import { useEffect, useState } from "react";
import HomeWelcomeCard from "../components/HomeWelcomeCard/HomeWelcomeCard";
import axios from "axios";
import "../assets/styles/homeStyles.css";

// import AddCourse from "./pages-student/AddCourse";

function Home() {
  // const [reflections, setReflections] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("http://localhost:5151/reflections")
  //     .then((res) => {
  //       setReflections(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <main>
    <h1>Home | Student</h1>
    <HomeWelcomeCard></HomeWelcomeCard>
    </main>
  );
}

export default Home;
