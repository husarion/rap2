import React from 'react';
import { Vector3 } from 'three';

function thetaToDirectionVector(theta) {
  // note: performance pitfalls state to avoid creation of objects...
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
