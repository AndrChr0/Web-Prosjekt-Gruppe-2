import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReflectionForm.css";
import ActionButton from "../ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function ReflectionForm() {
  const navigate = useNavigate();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    visibility: false,
    files: [],
    courseId: "No course selected",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:5151/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
        } else {
          console.log("No courses found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = formData.files.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const formDataWithFiles = new FormData();
    formDataWithFiles.append("title", formData.title);
    formDataWithFiles.append("content", formData.content);
    formDataWithFiles.append("visibility", formData.visibility);
    if (formData.courseId !== "No course selected") {
      formDataWithFiles.append("courseId", formData.courseId);
    }

    formData.files.forEach((file) => {
      formDataWithFiles.append("files", file);
    });

    try {
      await axios.post(
        "http://localhost:5151/reflections/",
        formDataWithFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        title: "",
        content: "",
        visibility: false,
        files: [],
        courseId: "No course selected",
      });
      setSubmissionSuccess(true);
      navigate("/diary");
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error.message || "An error occurred. Please try again."
      );
    }
  };

  // Rendering the form with input fields and submission button
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="content">Content:</label>
        {/* <textarea
          name="content"
          cols="30"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea> */}
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              content: value,
            }))
          }
          required
        />
        <label id="filesBtn" htmlFor="files">
          Upload a file
        </label>
        <input
          type="file"
          id="files"
          name="files"
          className="custom-file-input"
          multiple // Allow multiple files
          onChange={(e) => {
            // Convert FileList to array and concatenate with the existing files
            const newFiles = Array.from(e.target.files);
            setFormData({
              ...formData,
              files: [...formData.files, ...newFiles],
            });
          }}
        />
        {/* Adds remove button to selected files */}
        {formData.files.length > 0 && (
          <div>
            Selected Files:
            {Array.from(formData.files).map((file, index) => (
              <div key={index}>
                {file.name}
                <button type="button" onClick={() => handleRemoveFile(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
        >
          <option value="No course selected">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseCode} - {course.title}
            </option>
          ))}
        </select>

        {formData.courseId !== "No course selected" && (
          <div className="checkBox-container">
            <label htmlFor="visibility">Share with teacher:</label>
            <input
              type="checkbox"
              name="visibility"
              checked={formData.visibility}
              onChange={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  visibility: !prevFormData.visibility,
                }))
              }
            />
          </div>
        )}
        <ActionButton btnType="submit" btnValue="Submit" />
      </form>
      {/* Displaying a success message if submission is successful */}
      {submissionSuccess && (
        <div className="submission-success">REFLECTION SUBMITTED</div>
      )}
      {submissionError && (
        <div className="submission-error">{submissionError}</div>
      )}
    </>
  );
}

// Exporting the ReflectionForm component
export default ReflectionForm;
