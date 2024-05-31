import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Activites-list.css";

const ReflectionActivites = () => {
  const apiURL = import.meta.env.VITE_URL;

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
        <ul>
          {activities.map((activity, i) => (
            <li className="Activity" key={activity._id}>
              <div>
                <div className="Activity-title">
                  <b> {activity.title} </b>
                </div>
                <div className="Description-button-row">
                  <span>{activity.description}</span>
                  <Link to={"/new_reflection"}>
                    <button>New Reflection</button>
                  </Link>
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
