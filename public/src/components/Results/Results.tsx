import { ResultProps } from "../../types/Result.interface";
import "./Results.scss";

function Results(props: ResultProps) {
  const { imgUrl, msg } = props;

  return (
    <section className="image" data-testid="results">
      <div className="image-container">
        {msg && (
          <h2 className="msg" data-testid="errorMessage">
            {msg}
          </h2>
        )}
        {imgUrl && (
          <img
            src={imgUrl}
            alt="OpenAI Generated Image"
            data-testid="generatedImage"
          />
        )}
      </div>
    </section>
  );
}

export default Results;
