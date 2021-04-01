import React from 'react';
import { Vector3 } from 'three';

function thetaToDirectionVector(theta) {
  return new Vector3(Math.sin(theta), 0, Math.cos(theta)).normalize();
}

export default (props) => props.targets.map((target) => {
  const [targetX, targetY] = props.unitTransform.realworldToPx(target.x, target.y);
  const directionVector = thetaToDirectionVector(target.theta);
  const originVector = new Vector3(targetX, 0, targetY);
  return (
    <arrowHelper args={[directionVector, originVector, 100, 0xff00ff, 6, 6]} />
  );
});

// ArrowHelper(dir : Vector3, origin : Vector3, length : Number, hex : Number, headLength : Number, headWidth : Number )

// dir -- direction from origin. Must be a unit vector.
// origin -- Point at which the arrow starts.
// length -- length of the arrow. Default is 1.
// hex -- hexadecimal value to define color. Default is 0xffff00.
// headLength -- The length of the head of the arrow. Default is 0.2 * length.
// headWidth -- The width of the head of the arrow. Default is 0.2 * headLength.


// so I can build rotation arrow not like this, embodied inside, but also outside,
// so it does not interfere with my hovers.

// i just need the coordinates...
// maybe I can useFrame() here and do it imperatively....
