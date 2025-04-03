import React from "react";
import "./App.css";

const Choice = ({ selectedStar, onChange }) => {
  return (
    <div className="choice-container">
      <div className="choice-background"></div>

      <div className="choice-header">
        <div className="choice-title-wrapper">
          <h1 className="choice-title">Select Your TAR</h1>
          <div className="choice-title-underline"></div>
        </div>
      </div>

      <div className="choice-options">
        <div
          className={`choice-card ${
            selectedStar === "3 TAR" ? "choice-card-selected" : ""
          }`}
          onClick={() => onChange("3 TAR")}
        >
          <div className="choice-card-shine"></div>
          <div className="choice-card-content">
            <div className="choice-card-icon">
              <span>3</span>
            </div>
            <h2 className="choice-card-title">3 TAR</h2>

            {selectedStar === "3 TAR" && (
              <div className="choice-card-checkmark">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="choice-card-footer">
            <span className="choice-card-select">Select</span>
          </div>
        </div>

        <div
          className={`choice-card ${
            selectedStar === "5 TAR" ? "choice-card-selected" : ""
          }`}
          onClick={() => onChange("5 TAR")}
        >
          <div className="choice-card-shine"></div>
          <div className="choice-card-content">
            <div className="choice-card-icon choice-card-icon-premium">
              <span>5</span>
            </div>
            <h2 className="choice-card-title">5 TAR</h2>
            {selectedStar === "5 TAR" && (
              <div className="choice-card-checkmark">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="choice-card-footer">
            <span className="choice-card-select">Select</span>
          </div>
        </div>
      </div>

      {selectedStar && (
        <div className="choice-selected-message">
          <div className="choice-selected-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p>
            You've selected <strong>{selectedStar}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Choice;
