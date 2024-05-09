import React from "react"
import { Link } from "react-router-dom"
import { useLatestReflections } from "./useLatestReflections"

export const LatestReflectionsList = () => {
  const { reflections, isError, isLoading } = useLatestReflections()
  if (isError) return "Error fetching Data"
  if (isLoading) return "Loading..."
  return (
    <ul className="Recent-reflections">
      {reflections?.map((reflection) => (
        <li className="Recent-reflection" key={reflection._id}>
          <Link className="Text-link" to={`/submissions/${reflection._id}`}>
            <div>
              <span>{reflection.courseId.title}</span>
              <span>{reflection.title}</span>
              <b>Student-Name</b>{" "}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
