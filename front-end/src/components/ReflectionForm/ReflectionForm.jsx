import React, { useState } from "react";
import axios from "axios";
import "./ReflectionForm.css";
import ActionButton from "../ActionButton/ActionButton";

function ReflectionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: "",
    visibility: false,
    files: [],
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = formData.files.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Retrieve the JWT token from storage
    const formDataWithFiles = new FormData();
    formDataWithFiles.append("title", formData.title);
    formDataWithFiles.append("content", formData.content);
    formDataWithFiles.append("courseId", formData.courseId);
    formDataWithFiles.append("visibility", formData.visibility);
    formData.files.forEach((file) => {
      formDataWithFiles.append("files", file);
    });

    try {
      await axios.post(
        "http://localhost:5151/reflections/",
        formDataWithFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        title: "",
        content: "",
        courseId: "",
        visibility: false,
        files: [],
      });
      setSubmissionSuccess(true);
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
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
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
        <label htmlFor="courseId">Course ID:</label>
        <input
          type="number"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          required
        />
        <div className="checkBox-container">
          <label htmlFor="visibility">Visibility:</label>
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
