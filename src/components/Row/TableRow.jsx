import React, { useState } from "react";

export function TableRow(props) {
  const { data, index, onAddYarn, onRemoveYarn } = props;
  const [intervalId, setIntervalId] = useState(null);

  const handleIncrementMouseDown = (i, pos) => {
    const id = setInterval(() => {
      onAddYarn(i, pos);
    }, 200);
    setIntervalId(id);
  };

  const handleDecrementMouseDown = (i, pos) => {
    const id = setInterval(() => {
      onRemoveYarn(i, pos);
    }, 200);
    setIntervalId(id);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  const renderCell = (cell, pos) => {
    if (!cell) {
      return (
        <>
          <td className="cell-color" />
          <td className="cell-stepper" />
        </>
      );
    }

    const active = cell.yarn_qty > 0;

    return (
      <>
        <td className={`cell-color ${active ? "cell-color-active" : ""}`}>
          {cell.yarn_color}
        </td>
        <td className="cell-stepper">
          <div className="stepper">
            <button
              className="step-btn step-minus"
              onClick={() => onRemoveYarn(index, pos)}
              onMouseDown={() => handleDecrementMouseDown(index, pos)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              aria-label={`Decrease ${cell.yarn_color}`}
            >
              −
            </button>
            <span className={`step-value ${active ? "step-value-active" : ""}`}>
              {cell.yarn_qty}
            </span>
            <button
              className="step-btn step-plus"
              onClick={() => onAddYarn(index, pos)}
              onMouseDown={() => handleIncrementMouseDown(index, pos)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              aria-label={`Increase ${cell.yarn_color}`}
            >
              +
            </button>
          </div>
        </td>
      </>
    );
  };

  return (
    <tr>
      {renderCell(data.left, "left")}
      {renderCell(data.right, "right")}
    </tr>
  );
}
