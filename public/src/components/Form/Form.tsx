import { useState } from "react";
import "./Form.scss";

function Form() {
  const [size, setSize] = useState("medium");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <section className="showcase">
      <form id="image-form">
        <h1>Describe An Image</h1>
        <div className="form-control">
          <input type="text" placeholder="Enter Text" />
        </div>
        <div className="form-control">
          <select name="size" defaultValue={size} onChange={handleChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Generate
        </button>
      </form>
    </section>
  );
}

export default Form;
