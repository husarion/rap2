import React from 'react';

export default (props) => {
  const x2 = Math.pow(props.end[0] - props.begin[0], 2);
  const y2 = Math.pow(props.end[2] - props.begin[2], 2);
  let arrowLength = Math.sqrt(x2 + y2) / 75; // does it have to do with fov?
  // OK I GET IT, THEY ARE SCALED AS ROSBOT MODEL.
  // of course they are, since they are INSIDE it. defacto.
  if (arrowLength < 1) arrowLength = 1;

  console.log(arrowLength);
  // there 's more to it...
  return (
    <arrowHelper args={[undefined, undefined, arrowLength, 0xff00ff, 0.6, 0.1]}/>
  )
}

// so I can build rotation arrow not like this, embodied inside, but also outside,
// so it does not interfere with my hovers.

// i just need the coordinates...
// maybe I can useFrame() here and do it imperatively....
