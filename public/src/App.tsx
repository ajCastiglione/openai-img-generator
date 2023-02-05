import { useState } from "react";
import { Header, Form, Results, Spinner } from "./components";
import "./App.scss";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <Form />
        <Results />
      </main>
      <Spinner />
    </>
  );
}

export default App;
