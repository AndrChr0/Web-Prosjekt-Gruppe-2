// Importing necessary dependencies and styles
import { useState } from "react";
import axios from "axios";
import "./ReflectionForm.css";

// Functional component for the ReflectionForm
function ReflectionForm() {
  // State to manage form data and submission success
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: "",
    visibility: false,
    files: [],
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle removing files from the form
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(indexToRemove, 1);
    setFormData({
      ...formData,
      files: updatedFiles,
    });
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creating a FormData object for handling files
      const formDataWithFiles = new FormData();
      formDataWithFiles.append("title", formData.title);
      formDataWithFiles.append("content", formData.content);
      formDataWithFiles.append("courseId", formData.courseId);
      formDataWithFiles.append("visibility", formData.visibility);

      // Appending each file to the FormData object
      for (let i = 0; i < formData.files.length; i++) {
        formDataWithFiles.append("files", formData.files[i]);
      }

      // Sending a POST request to the server using axios
      const response = await axios.post(
        "http://localhost:5151/reflections/",
        formDataWithFiles
      );

      // Resetting the form data and setting submission success to true
      setFormData({
        title: "",
        content: "",
        courseId: "",
        visibility: false,
        files: [],
      });
      setSubmissionSuccess(true);

      // Logging the created reflection data
      console.log("Reflection created:", response.data);
    } catch (error) {
      // Handling errors and logging them
      console.error(error);
      setSubmissionError(error.message || "An error occurred. Please try again.)");
    }
  }

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
        <label id="filesBtn" htmlFor="files">Upload a file</label>
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
        <button type="submit">Submit</button>
      </form>
      {/* Displaying a success message if submission is successful */}
      {submissionSuccess && (
        <div className="submission-success">REFLECTION SUBMITTED</div>
      )}
       {submissionError && (
        <div className="submission-error">{submissionError}</div>)}
    </>
  );
}
      

// Exporting the ReflectionForm component
export default ReflectionForm;
