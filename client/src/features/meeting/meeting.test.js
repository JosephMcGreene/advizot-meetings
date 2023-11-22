import { render, screen } from "@testing-library/react";
import Meeting from "./Meeting";

describe("Meeting Component", () => {
  it("should render the Meeting component correctly", () => {
    render(<Meeting />);
    const element = screen.getByRole("main");
    expect(element).toBeInTheDocument();
  });
});
