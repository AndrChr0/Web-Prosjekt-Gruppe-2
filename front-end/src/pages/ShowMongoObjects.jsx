import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

function ShowMongoObjects() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5151/reflections")
      .then((res) => {
        setReflections(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="show-mongo-objects">
      <h1>Show reflections</h1>

      {loading ? (
        <h2>please wait</h2>
      ) : (
        <div>
          <ul>
            {reflections.map((reflection, index) => (
              <li key={reflection._id}>
                <div>{index + 1}</div>
                <div>
                  <b> Title:</b> {reflection.title}
                </div>
                <div>
                  <b>Reflection Body:</b> {reflection.content}
                </div>
                <div>
                  <b>Course-ID:</b> {reflection.courseId}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowMongoObjects;