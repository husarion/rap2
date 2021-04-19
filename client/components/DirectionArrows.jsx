import React from 'react';
import { Vector3 } from 'three';
import thetaToDirectionVector from '../helpers/thetaToDirectionVector';

export default (props) => props.targets.map((target) => {
  const elevationAbovePlane = 3;
  const [targetX, targetY] = props.unitTransform.realworldToPx(target.x, target.y);
  const directionVector = thetaToDirectionVector(target.theta);
  const originVector = new Vector3(targetX, elevationAbovePlane, targetY);
  return (
    <arrowHelper args={[directionVector, originVector, 30, 0xff00ff, 6, 6]} />
  );
});
