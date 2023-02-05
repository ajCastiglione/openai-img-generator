import { ResultProps } from "../../types/Result.interface";
import "./Results.scss";

function Results(props: ResultProps) {
  const { imgUrl, alt, msg } = props;

  return (
    <section className="image">
      <div className="image-container">
        <h2 className="msg">{msg}</h2>
        <img src={imgUrl} alt={alt} id="image" />
      </div>
    </section>
  );
}

export default Results;
