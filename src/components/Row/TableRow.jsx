import React, { useState } from "react";

export function TableRow(props) {
  const { data, index, onAddYarn, onRemoveYarn } = props;
  const [intervalId, setIntervalId] = useState(null);

  const handleIncrementMouseDown = (index, pos) => {
    const id = setInterval(() => {
      onAddYarn(index, pos);
    }, 200); // Adjust the interval duration as needed
    setIntervalId(id);
  };

  const handleDecrementMouseDown = (index, pos) => {
    const id = setInterval(() => {
      onRemoveYarn(index, pos);
    }, 200); // Adjust the interval duration as needed
    setIntervalId(id);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  return (
    <tr key={index}>
      <td>{data.left && data.left.yarn_color}</td>
      <td>{data.left && data.left.yarn_qty}</td>
      <td>
        {data.left && (
          <React.Fragment>
            <button
              onClick={() => onRemoveYarn(index, "left")}
              onMouseDown={() => handleDecrementMouseDown(index, "left")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              onClick={() => onAddYarn(index, "left")}
              onMouseDown={() => handleIncrementMouseDown(index, "left")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </React.Fragment>
        )}
      </td>
      <td>{data.right?.yarn_color}</td>
      <td>{data.right?.yarn_qty}</td>
      <td>
        <button
          onClick={() => onRemoveYarn(index, "right")}
          onMouseDown={() => handleDecrementMouseDown(index, "right")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <button
          onClick={() => onAddYarn(index, "right")}
          onMouseDown={() => handleIncrementMouseDown(index, "right")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}
