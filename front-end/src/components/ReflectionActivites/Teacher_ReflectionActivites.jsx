import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Activites-list.css";

const ReflectionActivites = () => {
  const apiURL = import.meta.env.VITE_URL;
  // const apiURL = '/api';

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiURL}/activities`)
      .then((res) => {
        setActivities(res.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  

  return (
    <div className="Activities-List">

      <div>
        <h2>Reflection activities</h2>
        <div className="add-activity-link">
        <Link className="Text-link" to="/add-activity">
          <button className="main-menu-btn" >New activity</button>
        </Link>
        </div>
        <ul>
          {activities.map((activity, i) => (
            <li className="Activity" key={activity._id}>
              <div>
                <div className="Activity-title">
                  <b> {activity.title} </b>
                </div>
                <div className="Description-button-row">
                    <span>{activity.description}</span>
                    
                    <button>Edit</button>
                    
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReflectionActivites;
