import { useState } from "react";
import { Header, Form, Results, Spinner } from "./components";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = async (prompt: string, size: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.VITE_API_URL}/openai/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, size }),
        }
      );

      if (!res.ok) {
        throw new Error("That image could not be generated");
      }

      const data = await res.json();

      setImgUrl(data.data);
      setLoading(false);
      setMsg("");
    } catch (err) {
      let message = "";
      console.log(err);

      if (err instanceof Error) message = err.message;
      setMsg(message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Form submit={submitHandler} />
        <Results imgUrl={imgUrl} msg={msg} />
      </main>
      <Spinner active={loading} />
    </>
  );
}

export default App;
