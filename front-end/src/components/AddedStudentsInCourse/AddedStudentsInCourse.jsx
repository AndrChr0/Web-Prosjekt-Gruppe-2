import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AddedStudentsInCourse.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddedStudentsInCourse = () => {
  const apiURL = import.meta.env.VITE_URL;

  const [addedStudents, setAddedStudents] = useState([]);
  const { courseId } = useParams(); // Use useParams to get courseId from URL

  // Fetch added students when component mounts
  useEffect(() => {
    axios
      .get(`${apiURL}/search?role=student&&courseId=${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setAddedStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching added students:", error);
      });
  }, [courseId]);

  const handleRemoveStudent = (userId) => {
    axios
      .put(
        `${apiURL}/users/${userId}/remove_course`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        // Update the list of added students after removing the student
        setAddedStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== userId)
        );
        // Show success toast
        toast.success("Student removed from course successfully");
      })
      .catch((error) => {
        console.error("Error removing student from course:", error);
        // Show error toast
        toast.error("Error removing student from course");
      });
  };

  return (
    <div>
      <ul className="Student-list">
        <h2>Students in the course</h2>
        {addedStudents.map((addedStudent) => (
          <li key={addedStudent._id}>
            <div>
              <strong>
                {addedStudent.firstName} {addedStudent.lastName}
              </strong>
            </div>
            <div>
              <span>{addedStudent.email}</span>
            </div>
            <button onClick={() => handleRemoveStudent(addedStudent._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedStudentsInCourse;
