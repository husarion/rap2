import React from 'react';

export default (props) => {
  const x2 = (props.end[0] - props.begin[0]) ** 2;
  const y2 = (props.end[2] - props.begin[2]) ** 2;

  let arrowLength = Math.sqrt(x2 + y2) / 75;
  if (arrowLength < 1) arrowLength = 1;

  return (
    <arrowHelper args={[undefined, undefined, arrowLength, 0xff00ff, 0.6, 0.1]} />
  );
};

// so I can build rotation arrow not like this, embodied inside, but also outside,
// so it does not interfere with my hovers.

// i just need the coordinates...
// maybe I can useFrame() here and do it imperatively....
