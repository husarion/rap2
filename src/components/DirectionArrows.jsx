import React from 'react';
import { Vector3 } from 'three';
import thetaToDirectionVector from '../helpers/thetaToDirectionVector';

export default (props) => props.targets.map((target) => {
  const [targetX, targetY] = props.unitTransform.realworldToPx(target.x, target.y);
  const directionVector = thetaToDirectionVector(target.theta);
  const originVector = new Vector3(targetX, 3, targetY);
  return (
    <arrowHelper args={[directionVector, originVector, 30, 0xff00ff, 6, 6]} />
  );
});
