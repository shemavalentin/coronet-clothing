import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

//Test for BaseButton

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

  test("should render google button when passed google button type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const goobleButtonElement = screen.getByRole("button");
    expect(goobleButtonElement).toHaveStyle("background-color: #4285f4");
  });

  test("Should render inverted button when passed inverted button type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const invertedButton = screen.getByRole("button");
    expect(invertedButton).toHaveStyle("background-color: white");
  });

  test("Should be disabled if isLoading is true", () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
