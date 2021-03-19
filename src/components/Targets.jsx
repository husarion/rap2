import React from 'react';
import RobotModel from './RobotModel';

export default (props) => props.targets.map((target) => {
  const [realWorldX, realWorldY] = props.unitTransform.realworldToPx(target.x, target.y);
  return (
    <RobotModel
      key={target.id}
      scale={props.modelSize}
      position={[realWorldX, 0, realWorldY]}
      rotation={[0, target.theta, 0]}
      hoverOn={() => {
        props.targetHoverOn(target.id);
      }}
      hoverOff={() => {
        props.targetHoverOff();
      }}
    />
  );
});
