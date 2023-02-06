import "./Spinner.scss";

function Spinner({ active }: { active: boolean }) {
  return <div className={`spinner ${active ? "show" : ""}`}></div>;
}

export default Spinner;
