import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Submissions.css";


const SubmissionsPage = () => {
    

    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
        setLoading(true);
        axios
        .get("http://localhost:5151/reflections/search?visibility=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
        

            setReflections(res.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });                   
      }, []);

    return(
    <main>

        {/* RECENT REFLECTIONS */}
        <h1>Student submissions</h1>
        <ul className="Recent-reflections">
            <h2>All submissions</h2>

            {reflections.map((reflection, i) => (
            <Link className="Text-link" to={`/submissions/${reflection._id}`}>
                <li className="Recent-reflection" key={reflection._id}>
                    <div>
                        <span><b>{reflection.courseId.title}</b></span> 
                        <span>{reflection.title}</span>
                        <span><b>By: Student-Name</b></span>
                        {/* {user.firstName} */}
                    </div>
                    <div>
                    </div>
                </li>
                </Link>
            ))}
        </ul>
        
    </main>
    );
  }


export default SubmissionsPage;