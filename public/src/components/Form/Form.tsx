import { useState } from "react";
import { FormProps } from "../../types/Form.interface";
import "./Form.scss";

function Form(props: FormProps) {
  const { submit } = props;
  const [size, setSize] = useState("medium");
  const [prompt, setPrompt] = useState("");
  const [err, setErr] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErr("");

    setPrompt(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!prompt) {
      setErr("Please enter a prompt");
      return;
    }

    submit(prompt, size);
  };

  return (
    <section className="showcase">
      <form id="image-form">
        <h1>Describe An Image</h1>
        {err && <p className="error">{err}</p>}
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter Text"
            onChange={handleInput}
            value={prompt}
          />
        </div>
        <div className="form-control">
          <select name="size" defaultValue={size} onChange={handleSelect}>
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
