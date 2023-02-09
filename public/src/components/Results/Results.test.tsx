import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Results from "./Results";

const imgUrl = "https://example.com/image.jpg";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("Results component", () => {
  jest.spyOn(navigator.clipboard, "writeText");

  test("renders error message when msg prop is passed", () => {
    const msg = "An error occurred";
    const { getByTestId } = render(<Results imgUrl={imgUrl} msg={msg} />);
    const errorMessage = getByTestId("errorMessage");
    expect(errorMessage).toHaveTextContent(msg);
  });

  test("renders generated image and copy to clipboard button when imgUrl prop is passed", () => {
    const { getByTestId } = render(<Results imgUrl={imgUrl} />);
    const generatedImage = getByTestId("generatedImage");
    expect(generatedImage).toHaveAttribute("src", imgUrl);

    const input = getByTestId("input");
    expect(input).toHaveValue(imgUrl);

    const copyBtn = getByTestId("copyBtn");
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(imgUrl);
  });
});
