// import React, { act } from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders App component", () => {
//   render(<App />);
//   const linkElements = screen.getAllByText((content, element) => {
//     return element.textContent.includes("University List");
//   });
//   expect(linkElements.length).toBeGreaterThan(0);
// });

import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

test("renders App component", async () => {
  await act(async () => {
    render(<App />);
  });

  const linkElement = screen.getByText(/University List/i);
  expect(linkElement).toBeInTheDocument();
});
