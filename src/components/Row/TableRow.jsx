import React from "react";

export function TableRow(props) {
  let { data, index, onAddYarn, onRemoveYarn } = props;
  return (
    <tr key={index}>
      <td>{data.left && data.left.yarn_color}</td>
      <td>{data.left && data.left.yarn_qty}</td>
      <td>
        {data.left && (
          <React.Fragment>
            <button onClick={() => onRemoveYarn(index, "left")}>
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button onClick={() => onAddYarn(index, "left")}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </React.Fragment>
        )}
      </td>
      <td>{data.right.yarn_color}</td>
      <td>{data.right.yarn_qty}</td>
      <td>
        <button onClick={() => onRemoveYarn(index, "right")}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <button onClick={() => onAddYarn(index, "right")}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}
