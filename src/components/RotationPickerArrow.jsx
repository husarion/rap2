import React from 'react';
import { Vector3 } from 'three';

export default (props) => {
  const x2 = (props.end[0] - props.begin[0]) ** 2;
  const y2 = (props.end[2] - props.begin[2]) ** 2;

  let arrowLength = Math.sqrt(x2 + y2) / 75; // props.robotSize>?
  if (arrowLength < 1) arrowLength = 1;

  return (
    <arrowHelper args={[new Vector3(1, 0, 0).normalize(), undefined, arrowLength, 0xff00ff, 0.3, 0.1]} />
  );
};
