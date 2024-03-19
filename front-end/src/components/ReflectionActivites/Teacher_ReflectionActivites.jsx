import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Activites-list.css";

const ReflectionActivites = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5151/activities")
      .then((res) => {
        setActivities(res.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // I guess we could toggle show hide certain descriptions if needed.

  return (
    <div className="Activities-List">
      <div>
        <h2>Reflection activities</h2>
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
