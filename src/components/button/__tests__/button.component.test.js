import { render, screen } from "@testing-library/react";
import Button from "../button.component";

describe("button tests", () => {
  test("Should render base button when nothing is passed", () => {
    render(<Button />);

    //const buttonElement = screen.getByText(/test/i);

    // Or you can query from screen by role
    const buttonElement = screen.getByRole("button");

    // to querrying by (altText) that helps with images for screen readers. becouse altText describes images
    // For somebody who might be blind and using screen reader they will encounter your image
    // and the alt text will be read out to them describing what the image is
    expect(buttonElement).toHaveStyle("background-color:black");
  });
});
