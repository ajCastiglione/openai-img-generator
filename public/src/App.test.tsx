import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("updates the state and displays the generated image", async () => {
    const fakeFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6NEDq6es8QJhhUWXLfT934xt/user-pAQftQdGUOnRHTw2bKb9GYna/img-ItMY54G6oHMMrzc54EmdYOUy.png?st=2023-02-06T00%3A53%3A13Z&se=2023-02-06T02%3A53%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-05T21%3A08%3A36Z&ske=2023-02-06T21%3A08%3A36Z&sks=b&skv=2021-08-06&sig=gmuEQehQEE3jJn5Mg5n7W%2B2hlIb9%2B5sonQPtXMxyZb8%3D",
      }),
    });
    window.fetch = fakeFetch;

    const { getByTestId } = render(<App />);
    const form = getByTestId("image-form");
    const promptInput = form.querySelector(
      "input[name='prompt']"
    ) as HTMLInputElement;
    const sizeInput = form.querySelector(
      "select[name='size']"
    ) as HTMLInputElement;
    const submitButton = form.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;

    promptInput.value = "test prompt";
    sizeInput.value = "256x256";
    fireEvent.click(submitButton);

    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    await new Promise(resolve => setTimeout(resolve, 0));

    const results = getByTestId("results");
    expect(results).toBeInTheDocument();

    // Expect the image to be displayed within the results
    const img = results.querySelector("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
  });

  it("displays an error message if the image cannot be generated", async () => {
    const fakeFetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    window.fetch = fakeFetch;

    const { getByTestId, getByText } = render(<App />);
    const form = getByTestId("image-form");
    const promptInput = form.querySelector(
      "input[name='prompt']"
    ) as HTMLInputElement;
    const sizeInput = form.querySelector(
      "select[name='size']"
    ) as HTMLInputElement;
    const submitButton = form.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;

    promptInput.value = "test prompt";
    sizeInput.value = "256x256";
    fireEvent.click(submitButton);

    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(getByText("That image could not be generated")).toBeInTheDocument();
  });
});
