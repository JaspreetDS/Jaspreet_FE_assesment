import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UniversityList from "./UniversityList";
import UniversityDetails from "./UniversityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversityList />} />
        <Route path="/:name" element={<UniversityDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
