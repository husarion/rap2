import React from "react";
import DeleteTargetButton from "./buttons/DeleteTargetButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

export default (props) => {
  // how do I do it... introduce renameTarget(oldId, newId)
  // also enter.

  // THIS SHOULD BE DONE DIFFERENTLY

  const modifyX = e => {
    props.modifyTargetHandler(target.id, {
      x: parseFloat(e.currentTarget.textContent),
    });
  }

  const modifyY = e => {
    props.modifyTargetHandler(target.id, {
      y: parseFloat(e.currentTarget.textContent),
    });
  }

  const modifyTheta = e => {
    props.modifyTargetHandler(target.id, {
      theta: parseFloat(e.currentTarget.textContent),
    });
  }

  const enterToConfirm = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      return true;
    } else {
      return false;
    }
  }

  const targetRows = props.targets.map((target, i) => {
    return (
      <tr
        className={props.activeTargetId === target.id ? "active" : ""}
        key={target.id}
      >
        <td>{target.id}</td>
        <td
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={modifyX}
          onKeyUp={e => enterToConfirm(e) ? modifyX(e, i) : null}
        >
          {target.x.toFixed(3)}
        </td>
        <td
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={modifyY}
          onKeyUp={e => enterToConfirm(e) ? modifyY(e, i) : null}
        >
          {target.y.toFixed(3)}
        </td>
        <td
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={modifyTheta}
          onKeyUp={e => enterToConfirm(e) ? modifyTheta(e, i) : null}
        >
          {target.theta.toFixed(2)}
        </td>
        <td style={{ minWidth: "70px" }}>
          <DeleteTargetButton
            clickHandler={() => {
              props.deleteButtonClickHandler(target.id);
            }}
          />
          <DoubleArrowIcon />
        </td>
      </tr>
    );
  });

  return (
    <div className="dest-table">
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>X</th>
            <th>Y</th>
            <th>&thetasym;</th>
            <th style={{ background: "transparent" }}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{targetRows}</tbody>
      </table>
    </div>
  );
};
