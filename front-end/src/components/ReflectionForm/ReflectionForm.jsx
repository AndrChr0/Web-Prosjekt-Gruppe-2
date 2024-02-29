import { useState } from "react";
import axios from "axios";
import "./ReflectionForm.css";

function ReflectionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: "",
    visibility: false,
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
        const respons = await axios.post(
            "http://localhost:5151/reflections/",
            formData
        );
        setFormData({
            title: "",
            content: "",
            courseId: "",
            visibility: false,
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
