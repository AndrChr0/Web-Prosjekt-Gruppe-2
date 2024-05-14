import React from "react"
import { Link } from "react-router-dom"
import "./Submissions.css"
import { useSubmissions } from "./useSubmissions"

const SubmissionsPage = () => {
    
  const apiURL = import.meta.env.VITE_URL;
// const apiURL = '/api';


    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
        setLoading(true);
        axios
        .get(`${apiURL}/reflections/search?visibility=true`, {
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
      <h2>All submissions</h2>
      <ul className="Recent-reflections">
        {reflections.map((reflection, i) => (
          <li className="Recent-reflection" key={reflection._id}>
            <Link className="Text-link" to={`/submissions/${reflection._id}`}>
              <div>
                <span>{reflection.courseId.title}</span>
                <span>{reflection.title}</span>
                <span>By: Student-Name</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default SubmissionsPage
