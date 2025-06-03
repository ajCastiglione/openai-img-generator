import { useRef } from "react";
import { ResultProps } from "../../types/Result.interface";
import { ClipboardIcon } from "../../icons/Icons";
import "./Results.scss";

function Results(props: ResultProps) {
  const { imgUrl, msg, outputPrompt } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const value = input.value;

    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(value);
  };

  return (
    <section className="image" data-testid="results">
      <div className="image-container">
        {msg && (
          <h2 className="msg" data-testid="errorMessage">
            {msg}
          </h2>
        )}
        {outputPrompt && (
          <div className="prompt" data-testid="outputPrompt">
            <p>
              <strong>How Dall-e-3 interpreted the request:</strong>
            </p>
            <p>{outputPrompt}</p>
          </div>
        )}
        {imgUrl && (
          <>
            <img
              src={imgUrl}
              alt="OpenAI Generated Image"
              data-testid="generatedImage"
            />
            <div className="input-container">
              <input
                data-testid="input"
                type="text"
                className="input"
                value={imgUrl}
                ref={inputRef}
                readOnly
              />
              <button
                className="copy-btn"
                data-testid="copyBtn"
                onClick={copyToClipboard}
              >
                <ClipboardIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Results;
