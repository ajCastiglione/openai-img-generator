import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";

describe("Form component", () => {
  it("renders form with default value of medium for select input", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <Form />
    );

    const selectInput = getByDisplayValue("Medium");
    expect(selectInput).toBeInTheDocument();

    const submitButton = getByText("Generate");
    expect(submitButton).toBeInTheDocument();

    const textInput = getByPlaceholderText("Enter Text");
    expect(textInput).toBeInTheDocument();
  });

  it("updates select value on change and logs submit on button click", () => {
    console.log = jest.fn();
    const { getByText, getByDisplayValue } = render(<Form />);

    const selectInput = getByDisplayValue("Medium");
    fireEvent.change(selectInput, { target: { value: "small" } });
    expect(selectInput).toHaveValue("small");

    const submitButton = getByText("Generate");
    fireEvent.click(submitButton);
    expect(console.log).toHaveBeenCalledWith("submit");
  });
});
