import React from 'react';
import { Vector3 } from 'three';
import thetaToDirectionVector from '../helpers/thetaToDirectionVector';

export default (props) => {
  const elevationAbovePlane = 3;
  const directionVector = thetaToDirectionVector(props.theta);
  const originVector = new Vector3(props.targetX, elevationAbovePlane, props.targetY);
  return (
    <arrowHelper args={[directionVector, originVector, 30, 0xff00ff, 6, 6]} />
  );
};
