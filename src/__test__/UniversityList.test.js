import React from "react";
import { render, screen } from "@testing-library/react";
import UniversityList from "../UniversityList";
import fetchMock from "jest-fetch-mock";

// Mocking the fetch API
global.fetch = fetchMock;
describe("UniversityList Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders without crashing", () => {
    render(<UniversityList />);
    screen.logTestingPlaygroundURL();
  });

  it("renders textbox", () => {
    render(<UniversityList />);
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });

  it("renders heading", () => {
    render(<UniversityList />);
    const heading = screen.getByRole("heading", {
      name: /university list/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders sort button", () => {
    render(<UniversityList />);
    const sortButton = screen.getByRole("button", {
      name: /sort a\-z/i,
    });
    expect(sortButton).toBeInTheDocument();
  });

  it("renders no list item", () => {
    render(<UniversityList />);
    const noListItem = screen.getByRole('listitem')
    expect(noListItem).toBeInTheDocument();
  });
});
