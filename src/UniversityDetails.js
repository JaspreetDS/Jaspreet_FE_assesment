import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UniversityDetails.css";

const UniversityDetails = () => {
  const [uniName, setUniName] = useState("");
  const params = useParams();
  const { name } = params;

  useEffect(() => {
    const storedData = localStorage.getItem("universities");
    const parsedData = JSON.parse(storedData);
    const matchedUni = parsedData.filter((matchedUni) => {
      return matchedUni.name === name;
    });
    setUniName(matchedUni);
  }, [name]);

  return (
    <div className="university-details-container">
      {uniName.length > 0 &&
        uniName?.map((singleUni) => {
          return (
            <div
              key={singleUni?.name}
              className="single-university-details-container"
            >
              <div className="single-university-details">
                <h2>
                  <span>
                    <p style={{ display: "inline-block" }}>{singleUni?.name}</p>
                  </span>
                </h2>
                <p>
                  <b>Code:</b> {singleUni?.alpha_two_code}
                </p>
                <p>
                  <b>Country:</b> {singleUni?.country}
                </p>
                <p>
                  <b> Web Page Link :</b>{" "}
                  <a
                    href={singleUni?.web_pages}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {singleUni?.web_pages}
                  </a>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UniversityDetails;
