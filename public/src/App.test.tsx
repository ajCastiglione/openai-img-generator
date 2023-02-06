import { render, fireEvent, findByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FetchMock } from "jest-fetch-mock";
import App from "./App";

const fetchMock = fetch as FetchMock;
const mockResolvedValue = {
  success: true,
  data: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6NEDq6es8QJhhUWXLfT934xt/user-pAQftQdGUOnRHTw2bKb9GYna/img-ItMY54G6oHMMrzc54EmdYOUy.png?st=2023-02-06T00%3A53%3A13Z&se=2023-02-06T02%3A53%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-05T21%3A08%3A36Z&ske=2023-02-06T21%3A08%3A36Z&sks=b&skv=2021-08-06&sig=gmuEQehQEE3jJn5Mg5n7W%2B2hlIb9%2B5sonQPtXMxyZb8%3D",
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("sends a request to the API when the form is submitted", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResolvedValue));
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });

    const submitButton = getByText("Generate");
    fireEvent.click(submitButton);

    await findByTestId(
      document.querySelector('[data-testid="results"]') as HTMLDivElement,
      "generatedImage"
    );

    expect(fetchMock).toHaveBeenCalled();

    // Check that the image is rendered.
    const image = getByTestId("generatedImage");
    expect(image).toBeInTheDocument();
  });

  it("renders an error message when the API returns an error", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: false }));
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });

    const submitButton = getByText("Generate");
    fireEvent.click(submitButton);

    await findByTestId(
      document.querySelector('[data-testid="results"]') as HTMLDivElement,
      "errorMessage"
    );

    // Check that the error message is rendered.
    const errorMessage = getByTestId("errorMessage");
    expect(errorMessage).toBeInTheDocument();
  });
});
