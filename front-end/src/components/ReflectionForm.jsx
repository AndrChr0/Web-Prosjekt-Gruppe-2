import { useState } from "react";
import axios from "axios";

function ReflectionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: "",
    visibility: false,
  });

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
      console.log("Reflection created:", respons.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <br />
      <label>
        Course ID:
        <input
          type="number"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
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
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReflectionForm;
