import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";

const mockSubmit = jest.fn();

// Reset form values after each test.
afterEach(() => {
  mockSubmit.mockReset();
});

describe("Form component", () => {
  it("renders without crashing", () => {
    render(<Form submit={mockSubmit} />);
  });

  it("renders form with the select, input and submit fields", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <Form submit={mockSubmit} />
    );

    const selectInput = getByDisplayValue("Medium");
    expect(selectInput).toBeInTheDocument();

    const submitButton = getByText("Generate");
    expect(submitButton).toBeInTheDocument();

    const textInput = getByPlaceholderText("Enter Text");
    expect(textInput).toBeInTheDocument();
  });

  it("updates select value on change", () => {
    const { getByDisplayValue } = render(<Form submit={mockSubmit} />);

    const selectInput = getByDisplayValue("Medium");
    fireEvent.change(selectInput, { target: { value: "small" } });
    expect(selectInput).toHaveValue("small");
  });

  it("updates text input value on change", () => {
    const { getByPlaceholderText } = render(<Form submit={mockSubmit} />);

    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });
    expect(textInput).toHaveValue("test prompt");
  });

  it("calls submit function on submit if the input has a value", () => {
    const { getByText, getByPlaceholderText } = render(
      <Form submit={mockSubmit} />
    );

    // Set input value so the submit handler doesn't return early.
    const textInput = getByPlaceholderText("Enter Text");
    fireEvent.change(textInput, { target: { value: "test prompt" } });

    const submitButton = getByText("Generate");
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("does not call submit function on submit if the input is empty", () => {
    const { getByText } = render(<Form submit={mockSubmit} />);

    const submitButton = getByText("Generate");
    fireEvent.click(submitButton);
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
