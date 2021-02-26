import React from 'react';

export default (props) => {
  return (
    <div
      className="sidebar-resizer"
      onMouseDown={props.mouseDownHandler}>
    </div>
  );
}