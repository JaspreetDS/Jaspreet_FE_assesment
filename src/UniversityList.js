import React, { useState, useEffect } from "react";
import "./UniversityList.css";
import ConfirmationModal from "./ConfirmationModal";
import { NavLink } from "react-router-dom";

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null);

  useEffect(() => {
    fetch(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
    )
      .then(async (response) => {
        const res = await response.json();
        if (res && res.length > 0) {
          setUniversities(res);
          localStorage.setItem("universities", JSON.stringify(res));
        } else {
          const cachedUniversities = localStorage.getItem("universities");
          if (cachedUniversities) {
            setUniversities(JSON.parse(cachedUniversities));
          } else {
            setError("No data available.");
          }
        }
      })
      .catch((error) => {
        const cachedUniversities = localStorage.getItem("universities");
        if (cachedUniversities) {
          setUniversities(JSON.parse(cachedUniversities));
        } else {
          setError("Failed to fetch data.");
        }
        console.error("Error fetching universities:", error);
      });
  }, []);

  const handleSort = () => {
    const sortedUniversities = [...universities].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUniversities(sortedUniversities);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMore = () => {
    console.log("View more clicked:");
  };

  const handleDelete = (universityToDelete) => {
    setUniversityToDelete(universityToDelete);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedUniversities = universities.filter(
      (university) => university.name !== universityToDelete.name
    );
    setUniversities(updatedUniversities);
    localStorage.setItem("universities", JSON.stringify(updatedUniversities));
    setShowModal(false);
  };

  return (
    <div className="main-container">
      <div className="university-container">
        <div className="university-header">
          <div>
            <h2 className="university-title">University List</h2>
          </div>
          <div className="input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="sort-button" onClick={handleSort}>
              {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        <ul className="university-list">
          {filteredUniversities.length <= 0 ? (
            <li className="no-university-item">No University Found.</li>
          ) : (
            filteredUniversities.map((university) => (
              <li key={university.name} className="university-item">
                <div>
                  <span>{university.name}</span>
                </div>
                <div className="btn-group">
                  <NavLink to={`/${university.name}`}>
                    <button
                      className="button1"
                      onClick={() => handleViewMore(university)}
                    >
                      View More
                    </button>
                  </NavLink>
                  <button
                    className="button2"
                    onClick={() => handleDelete(university)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UniversityList;
