import React from "react"
import { Link } from "react-router-dom"
import "./Submissions.css"
import { useSubmissions } from "./useSubmissions"

const SubmissionsPage = () => {
  const { reflections } = useSubmissions()

  return (
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
