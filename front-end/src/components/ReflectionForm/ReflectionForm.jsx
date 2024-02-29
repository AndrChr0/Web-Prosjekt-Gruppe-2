import { useState } from "react";
import axios from "axios";
import "./ReflectionForm.css";

function ReflectionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: "",
    visibility: false,
    files: [],
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const formDataWithFiles = new FormData();
        formDataWithFiles.append("title", formData.title);
        formDataWithFiles.append("content", formData.content);
        formDataWithFiles.append("courseId", formData.courseId);
        formDataWithFiles.append("visibility", formData.visibility);

        for (let i = 0; i < formData.files.length; i++) {
            formDataWithFiles.append("files", formData.files[i]);
        }


        const respons = await axios.post(
            "http://localhost:5151/reflections/",
            formDataWithFiles
        );
        setFormData({
            title: "",
            content: "",
            courseId: "",
            visibility: false,
            files: [],
        });
        setSubmissionSuccess(true);
        console.log("Reflection created:", respons.data);
    } catch (error) {
        console.error(error);
    }
};

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" >
        Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      <label htmlFor="content">
        Content:
        </label>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <label htmlFor="files">Upload a file</label>
        <input
          type="file"
          name="files"
          multiple  // Allow multiple files
          onChange={(e) => {
           setFormData({
      ...formData,
      files: e.target.files,
    });
  }}
/>
      <label htmlFor="courseId">
        Course ID:
        </label>
        <input
          type="number"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          required
        />
<div className="checkBox-container">
      <label htmlFor="visibility">
        visibility:
      </label>
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
    {submissionSuccess && (
        <div className="submition-success">REFLECTION SUBMITTED</div>
      )}
    </>
  );
}

export default ReflectionForm;
