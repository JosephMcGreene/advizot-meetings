import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Response from "../components/pages/meeting-responses/Response";

describe(Response, () => {
  it("user response is not missing", () => {
    const { getAllByRole } = render(<Response userResponseBody={{}} />);
  });
});
