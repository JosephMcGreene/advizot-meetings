import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  test("App component rendered", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
