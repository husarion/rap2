import React from 'react';

export default (props) => {

  const targetRows = props.targets.map((target, i) => {
    return (
      <tr>
      <td>{i}</td>
      <td>{target.x}</td>
      <td>{target.y}</td>
      <td>{target.theta}</td>
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
          </tr>
        </thead>
        <tbody>
            {targetRows}
        </tbody>
      </table>
    </div>
  );
}