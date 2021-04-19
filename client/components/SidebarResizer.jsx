import React from 'react';

export default (props) => (
  <div
    aria-hidden="true"
    className="sidebar-resizer"
    onMouseDown={props.mouseDownHandler}
  />
);
