import React, { useRef, useState, useImperativeHandle, Suspense, forwardRef, useEffect } from "react";

import { Canvas } from "react-three-fiber";
import { OrbitControls, OrthographicCamera } from "drei";

import { useWebsocket } from "./SocketManager";
import MapPlane from "./MapPlane";
import RobotModel from "./RobotModel";
import RobotShadow from "./RobotShadow";
import UnitTransform from "../helpers/UnitTransform";
import Axis from "./Axis";

import calculateNewTheta from '../helpers/calculateNewTheta';

import { TOUCH } from 'three';

// Coords: should be an enum; but JS does not have enums.
// TS has some though.
const X = 0;
const Y = 1;
const Z = 2;

const Browser = forwardRef((props, ref) => {
  const [isChoosingRotation, setIsChoosingRotation] = useState(false);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostPos, setGhostPos] = useState([]);
  const [ghostRotation, setGhostRotation] = useState([0, 0, 0]);
  const [rotationPickerArrowPos, setRotationPickerArrowPos] = useState([]);

  const socketData = useWebsocket();



  const transf = new UnitTransform(
    { x: socketData.mapCanvas.width / 2, y: socketData.mapCanvas.height / 2 },
    socketData.mapInfo.originPos,
    socketData.mapInfo.resolution
  );

  const [coordSystemCenterX, coordSystemCenterY] = transf.realworldToPx(0, 0);

  const controlsRef = useRef();

  useImperativeHandle(ref,
    () => ({
      resetControls: () => {
        controlsRef.current.reset();
        controlsRef.current.target.set(coordSystemCenterX, 0, coordSystemCenterY);
      }
    }));


  useEffect( () => {
    // 310:            TOUCH_ROTATE: 3,
    // 311:            TOUCH_PAN: 4,
    // 312:            TOUCH_DOLLY_PAN: 5,
    // 313:            TOUCH_DOLLY_ROTATE: 6
    // if (controlsRef.current) {
    //   controlsRef.current.touches.ONE = 3;
    //   controlsRef.current.touches.TWO = 5;
    // }
    console.log("effect", TOUCH.PAN, TOUCH.PAN_ROTATE)
  });

  const targets = props.targets.map((target) => {
    const [realWorldX, realWorldY] = transf.realworldToPx(target.x, target.y);
    return (
      <RobotModel
        key={target.id}
        scale={props.modelSize}
        position={[realWorldX, 0, realWorldY]}
        rotation={[0, target.theta, 0]}
        hoverOn={(e) => {
          props.targetHoverOn(target.id);
        }}
        hoverOff={(e) => {
          props.targetHoverOff();
        }}
      ></RobotModel>
    );
  });

  const handlePointerMove = (e) => {
    if (isChoosingRotation) {
      const newTheta = calculateNewTheta(ghostPos[X], ghostPos[Z], e.point.x, e.point.z);
      setRotationPickerArrowPos([e.point.x, 0, e.point.z]);
      setGhostRotation([0, newTheta, 0]);
    } else if (e.shiftKey || props.isPlacingTarget) {
      setGhostPos([e.point.x, 0, e.point.z]);
      setGhostVisible(true);
    } else {
      setGhostVisible(false);
    }
  };

  const handlePointerDown = (e) => {
    if (e.shiftKey || props.isPlacingTarget) {
      setIsChoosingRotation(true);
      // for mobile devices:
      setGhostVisible(true);
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

  const [oneMeterX, oneMeterY] = transf.realworldToPx(1, 1);

  return (
    <div className="canvas3d">
      <Canvas gl={{ antialias: false }}>
        {/* <axesHelper scale={[500, 500, 5000]} /> */}
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
            <RobotShadow
              scale={props.modelSize}
              position={ghostPos}
              rotation={ghostRotation}
              arrowVisible={isChoosingRotation}
              arrowPos={rotationPickerArrowPos}
            />
          )}
        </Suspense>

        {targets}

        <Axis 
          centerX={coordSystemCenterX} 
          centerY={coordSystemCenterY} 
          oneMeterX={oneMeterX}
          oneMeterY={oneMeterY}
        />

        <OrthographicCamera
          makeDefault
          fov={75}
          near={0.1}
          far={10000}
          position={[0, 0, 500]}
        />

        <ambientLight color={0xffffff} />

        <MapPlane
          pointerDownHandler={handlePointerDown}
          pointerUpHandler={handlePointerUp}
          pointerMoveHandler={handlePointerMove}
          mapCanvas={socketData.mapCanvas}
        />

        <OrbitControls
          ref={controlsRef}
          minDistance={1}
          maxDistance={100000}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          dampingFactor={0.2}
          maxPolarAngle={0}
          maxPolarAngle={0}
          enabled={!isChoosingRotation}
          touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }}
        />
      </Canvas>
    </div>
  );
});

export default Browser;


// 310:            TOUCH_ROTATE: 3,
// 311:            TOUCH_PAN: 4,
// 312:            TOUCH_DOLLY_PAN: 5,
// 313:            TOUCH_DOLLY_ROTATE: 6