import React from 'react';
import RobotModel from './RobotModel';

export default (props) => props.targets.map((target) => {
  const [targetX, targetY] = props.unitTransform.realworldToPx(target.x, target.y);
  return (
    <RobotModel
      key={target.id}
      scale={props.modelSize}
      position={[targetX, 0, targetY]}
      rotation={[0, target.theta, 0]}
      hovered={(target.id === props.activeTargetId)}
      hoverOn={() => {
        props.targetHoverOn(target.id);
      }}
      hoverOff={() => {
        props.targetHoverOff();
      }}
    />
  );
});
