import React from 'react';
import DeleteTargetButton from './DeleteTargetButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export default (props) => {

  const targetRows = props.targets.map((target, i) => {
    return (
      <tr className={ props.activeTargetId === target.id ? 'active' : ''} key={target.id}>
        <td>{target.id}</td>
        <td>{target.x.toFixed(3)}</td>
        <td>{target.y.toFixed(3)}</td>
        <td>{target.theta.toFixed(2)}</td>
        <td style={{ minWidth: '70px' }}>
          <DeleteTargetButton clickHandler={() => { props.deleteButtonClickHandler(target.id) }}/>
          <DoubleArrowIcon />
        </td>
      </tr>
    )
  })

  return (
    <div className="dest-table">
      <table>
        <thead>
          <tr>
          <th>LP</th>
          <th>X</th>
          <th>Y</th>
          <th>&thetasym;</th>
          <th style={{ background: 'transparent' }}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
            {targetRows}
        </tbody>
      </table>
    </div>
  );
}