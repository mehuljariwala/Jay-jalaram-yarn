import React from "react";
import "./App.css";

const CATEGORIES = [
  {
    type: "Bullet",
    accent: "bullet",
    hint: "Bullet design sets",
    options: [
      { id: "3 TAR BULLET", number: "3" },
      { id: "5 TAR BULLET", number: "5" },
    ],
  },
  {
    type: "Button",
    accent: "button",
    hint: "Button design sets",
    options: [
      { id: "3 TAR BUTTON", number: "3" },
      { id: "5 TAR BUTTON", number: "5" },
      { id: "6 TAR BUTTON", number: "6" },
    ],
  },
  {
    type: "Yarn",
    accent: "yarn",
    hint: "Plain yarn order",
    options: [{ id: "YARN", number: null, label: "Yarn" }],
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
      fill="currentColor"
    />
  </svg>
);

const Choice = ({ selectedStar, onChange }) => {
  return (
    <div className="choice-container">
      <div className="choice-header">
        <h1 className="choice-title">Place Your Order</h1>
        <p className="choice-intro">Pick a product type, then choose the TAR</p>
      </div>

      <div className="choice-sections">
        {CATEGORIES.map((cat) => (
          <section
            key={cat.type}
            className={`choice-section choice-section-${cat.accent}`}
          >
            <div className="choice-section-head">
              <span className="choice-section-chip">{cat.type.charAt(0)}</span>
              <div className="choice-section-titles">
                <h2 className="choice-section-title">{cat.type}</h2>
                <span className="choice-section-hint">{cat.hint}</span>
              </div>
            </div>

            <div className="choice-section-grid">
              {cat.options.map((opt) => {
                const isSelected = selectedStar === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`tar-tile ${
                      opt.number ? "" : "tar-tile-wide"
                    } ${isSelected ? "tar-tile-selected" : ""}`}
                    onClick={() => onChange(opt.id)}
                  >
                    {opt.number ? (
                      <span className="tar-tile-main">
                        <span className="tar-tile-num">{opt.number}</span>
                        <span className="tar-tile-unit">TAR</span>
                      </span>
                    ) : (
                      <span className="tar-tile-yarn-label">{opt.label}</span>
                    )}
                    <span className="tar-tile-go">
                      {isSelected ? <CheckIcon /> : "Select"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Choice;
