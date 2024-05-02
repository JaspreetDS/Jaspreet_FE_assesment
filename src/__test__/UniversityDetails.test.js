import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UniversityDetails from "../UniversityDetails";

test("renders the UniversityDetails component correctly", () => {
  const mockUniversities = [
    {
      name: "University of Cambridge",
      alpha_two_code: "GB",
      country: "United Kingdom",
      web_pages: "https://www.cam.ac.uk/",
    },
  ];
  jest
    .spyOn(Storage.prototype, "getItem")
    .mockReturnValue(JSON.stringify(mockUniversities));
  render(
    <MemoryRouter initialEntries={["/university/University%20of%20Cambridge"]}>
      <Routes>
        <Route path="/university/:name" element={<UniversityDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("University of Cambridge")).toBeInTheDocument();
  expect(screen.getByText("GB")).toBeInTheDocument();
  expect(screen.getByText("United Kingdom")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "https://www.cam.ac.uk/" })
  ).toBeInTheDocument();
});
