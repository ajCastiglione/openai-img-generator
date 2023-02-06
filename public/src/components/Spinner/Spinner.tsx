import "./Spinner.scss";

function Spinner({ active }: { active: boolean }) {
  return (
    <div
      data-testid="spinner"
      className={`spinner ${active ? "show" : ""}`}
    ></div>
  );
}

export default Spinner;
