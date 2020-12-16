import React, { useState, Suspense } from "react";

import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, } from "drei";

import { useWebsocket } from "./SocketManager";
import MapPlane from "./MapPlane";
import RobotModel from "./RobotModel";
import RobotShadow from "./RobotShadow";
import RotationPickerArrow from "./RotationPickerArrow";

// Coords: should be an enum; but JS does not have enums.
// TS has some though.
const X = 0;
const Y = 1;
const Z = 2;

export default (props) => {
  const [isChoosingRotation, setIsChoosingRotation] = useState(false);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostPos, setGhostPos] = useState([]);
  const [ghostRotation, setGhostRotation] = useState([0, 0, 0]);
  const [rotationPickerArrowPos, setRotationPickerArrowPos] = useState([]);

  const socketData = useWebsocket();

  const targets = props.targets.map((target) => {
    return (
      <RobotModel
        key={target.id}
        scale={props.modelSize}
        position={target.targetPos}
        rotation={[0, target.theta, 0]}
        hoverOn={(e) => { props.targetHoverOn(target.id) }}
        hoverOff={(e) => { props.targetHoverOff() }}
      ></RobotModel>
    );
  });

  const handlePointerMove = (e) => {
    if (isChoosingRotation) {
      const xDiff = e.point.x - ghostPos[X]; 
      const yDiff = e.point.z - ghostPos[Z]; 
      const newTheta = Math.atan(xDiff/yDiff);
      setRotationPickerArrowPos([e.point.x, 0, e.point.z]);
      setGhostRotation([0, newTheta, 0]);
    }
    else if (e.shiftKey || props.isPlacingTarget) {
      setGhostPos([e.point.x, 0, e.point.z]);
      setGhostVisible(true);
    } else {
      setGhostVisible(false);
    }
  };

  const handlePointerDown = (e) => {
    if (e.shiftKey || props.isPlacingTarget) {
      setIsChoosingRotation(true);
      // we are setting it here to avoid visual glitch,
      // when arrow tip is visible in last 'ghost' position for a brief moment
      // when starting to pick new target.
      setRotationPickerArrowPos([e.point.x, 0, e.point.z]);
    }
  };

  const handlePointerUp = (e) => {
    if (e.shiftKey || props.isPlacingTarget) {
      props.addTargetHandler(ghostPos[X], ghostPos[Z], ghostRotation[Y]);
      setIsChoosingRotation(false);
    }
  };

  return (
    <div className="canvas3d">
      <Canvas gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <RobotModel
            scale={props.modelSize}
            position={[socketData.robotPos.x, 0, socketData.robotPos.y]}
            rotation={[0, socketData.robotPos.theta, 0]}
            noDefaultHover
          />
        </Suspense>

        <Suspense fallback={null}>
          {ghostVisible && (
            <RobotShadow scale={props.modelSize} position={ghostPos} rotation={ghostRotation}/>
          )}
        </Suspense>

        {targets}

        <PerspectiveCamera
          makeDefault
          fov={75}
          near={0.1}
          far={10000}
          position={[0, 0, 500]}
        />

        <ambientLight color={0xcccccc} />
        <directionalLight position={[0, 1, 1]} />
        
        <MapPlane
          pointerDownHandler={handlePointerDown}
          pointerUpHandler={handlePointerUp}
          pointerMoveHandler={handlePointerMove}
          mapCanvas={socketData.mapCanvas}
        />

        {isChoosingRotation && (
        <RotationPickerArrow begin={ghostPos} end={rotationPickerArrowPos} />
        )}


        <OrbitControls
          minDistance={1}
          maxDistance={100000}
          dampingFactor={0.2}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          maxPolarAngle={0}
          maxPolarAngle={0}
          enabled={!isChoosingRotation}
        />
      </Canvas>
    </div>
  );
};
