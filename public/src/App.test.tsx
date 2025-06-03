import { render, fireEvent, findByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FetchMock } from "jest-fetch-mock";
import App from "./App";

const fetchMock = fetch as FetchMock;
const mockResolvedValue = {
  success: true,
  data: "https://placehold.co/600x400",
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
    const { getByPlaceholderText, getByTestId } = render(<App />);

    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });

    const submitButton = getByTestId("submitBtn");
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
    const { getByPlaceholderText, getByTestId } = render(<App />);

    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });

    const submitButton = getByTestId("submitBtn");
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
