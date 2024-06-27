import React from "react";
import "./App.css";

const Choice = ({ selectedStar, onChange }) => {
  return (
    <div className="app-choice">
      <header className="app-choice-header">
        <div className="please-msg">Please Click on TAR</div>
        <div className="container">
          <div
            className="box"
            onClick={() => onChange("3 TAR")}
            style={{
              backgroundColor: selectedStar === "3 TAR" ? "#2196f3" : "white",
              color: selectedStar === "3 TAR" ? "white" : "black",
            }}
          >
            3 TAR
          </div>
          <div
            className="box"
            onClick={() => onChange("5 TAR")}
            style={{
              backgroundColor: selectedStar === "5 TAR" ? "#2196f3" : "white",
              color: selectedStar === "5 TAR" ? "white" : "black",
            }}
          >
            5 TAR
          </div>
          <div className="box"></div>
        </div>
      </header>
    </div>
  );
};

export default Choice;
