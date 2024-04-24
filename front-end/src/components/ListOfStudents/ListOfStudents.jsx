import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ListOfStudents.css";

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const { courseId } = useParams();

  const handleSearch = async () => {
    if (!searchQuery) {
      window.alert('Please enter a search query');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5151/users/students`, {
        params: {
          query: searchQuery
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      });
  
      setStudents(response.data || []);
      setSearchClicked(true);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const handleAddStudent = async (userId) => {
    try {
      const courseResponse = await axios.get(`http://localhost:5151/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      console.log(courseResponse.data);
  
      if (courseResponse.data.students && courseResponse.data.students.includes(userId)) {
        alert("This student is already in the course");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5151/users/${userId}/add_course`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Student added to course successfully");
        window.location.reload();
      } else {
        alert("Failed to add student to course");
      }
    } catch (error) {
      console.error("Error adding student to course:", error);
      alert("Failed to add student to course");
    }
  };

  return (
    <div className="Student-list-container">
      <h2>Add students</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          className="SearchBar"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchClicked && students !== null && students.length > 0 ? (
        <ul className="Student-list">
          {students.map((student) => (
            <li key={student._id}>
              <div>
                <strong>
                  {student.firstName} {student.lastName}
                </strong>
              </div>
              <div>
                <span>{student.email}</span>
              </div>
              <button onClick={() => handleAddStudent(student._id)}>Add</button>
            </li>
          ))}
        </ul>
      ) : (
        searchClicked && <p>No students found.</p>
      )}
    </div>
  );
};

export default ListOfStudents;