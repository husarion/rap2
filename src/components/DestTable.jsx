import React, { useRef } from 'react';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import DeleteTargetButton from './buttons/DeleteTargetButton';

export default (props) => {
  // so targets should be in global state anyway... because they are ought to be held on backend...
  // how do I do it... introduce renameTarget(oldId, newId)
  // also enter.

  // THIS SHOULD BE DONE DIFFERENTLY

  const previousLabel = useRef(null);

  const saveLabel = (e) => {
    previousLabel.current = e.currentTarget.textContent;
  };

  const toValidLabel = (value) => {
    // for now, we trim whitespaces and that's it.
    value = value.trim();

    if (value.length === 0) {
      // fallback to previous value
      return previousLabel.current;
    }
    return value;
  };

  // it works only once, thats the problem. weird.

  const modifyLabel = (e, id) => {
    props.modifyTargetHandler(id, {
      label: toValidLabel(e.currentTarget.textContent),
    });
    window.focus(); // czemu to nie działa nie wime.
  };

  const modifyX = (e, id) => {
    props.modifyTargetHandler(id, {
      x: parseFloat(e.currentTarget.textContent),
    });
  };

  const modifyY = (e, id) => {
    props.modifyTargetHandler(id, {
      y: parseFloat(e.currentTarget.textContent),
    });
  };

  const modifyTheta = (e, id) => {
    props.modifyTargetHandler(id, {
      theta: parseFloat(e.currentTarget.textContent),
    });
  };

  // OK but why it only works once.
  const enterToConfirm = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.focus(); // why it does not work?
      return true;
    }
    return false;
  };

  // ID must be unique.... but doesnt have to be a number...
  // the most efficient hashmap is the js obj itsefl.

  // kurde ta zmiana ID będzie problematyczna max.
  // może po prostu hmm nazwać to pole inaczej - label
  // i call it a day.

  // <td> should simply lose focus if value is confirmed.

  const targetRows = props.targets.map((target, i) => (
    <tr
      className={props.activeTargetId === target.id ? 'active' : ''}
      key={target.id}
    >
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => modifyLabel(e, target.id)}
        onKeyPress={(e) => (enterToConfirm(e) ? modifyLabel(e, target.id) : null)}
      >
        {target.label}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => modifyX(e, target.id)}
        onFocus={saveLabel}
        onKeyUp={(e) => (enterToConfirm(e) ? modifyX(e, target.id) : null)}
      >
        {target.x.toFixed(3)}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => modifyY(e, target.id)}
        onKeyUp={(e) => (enterToConfirm(e) ? modifyY(e, target.id) : null)}
      >
        {target.y.toFixed(3)}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => modifyTheta(e, i)}
        onKeyUp={(e) => (enterToConfirm(e) ? modifyTheta(e, i) : null)}
      >
        {target.theta.toFixed(2)}
      </td>
      <td style={{ width: '70px' }}>
        <DeleteTargetButton
          clickHandler={() => {
            props.deleteButtonClickHandler(target.id);
          }}
        />
        <DoubleArrowIcon />
      </td>
    </tr>
  ));

  return (
    <div className="dest-table">
      <h3>Targets:</h3>

      <table>
        <thead>
          <tr>
            <th>label</th>
            <th>X</th>
            <th>Y</th>
            <th>&thetasym;</th>
            <th style={{ background: 'transparent' }}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{targetRows}</tbody>
      </table>

      <div className="guide-text">
        Table cells are editable - adjust the values as needed and press Enter to commit changes.
      </div>
    </div>
  );
};
