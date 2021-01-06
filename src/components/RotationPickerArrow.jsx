import React from 'react';
import { Line } from 'drei';

export default (props) => {
  const x2 = Math.pow(props.end[0] - props.begin[0], 2);
  const y2 = Math.pow(props.end[2] - props.begin[2], 2);
  let arrowLength = Math.sqrt(x2 + y2) / 75; // does it have to do with fov?
  // OK I GET IT, THEY ARE SCALED AS ROSBOT MODEL.
  
  if (arrowLength < 1) arrowLength = 1;

  console.log(arrowLength);
  // there 's more to it...
  return (
    <arrowHelper args={[undefined, undefined, arrowLength, 0xff00ff, 0.8]}/>
  )
}