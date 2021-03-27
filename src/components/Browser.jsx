import React, {
  useRef, useState, useImperativeHandle, Suspense, forwardRef,
} from 'react';

import { Canvas } from 'react-three-fiber';
import { OrbitControls, OrthographicCamera } from 'drei';

import { TOUCH } from 'three';
import { useWebsocket } from './SocketManager';
import MapPlane from './MapPlane';
import RobotModel from './RobotModel';
import RobotShadow from './RobotShadow';
import Targets from './Targets';
import UnitTransform from '../helpers/UnitTransform';
import Axis from './Axis';

import calculateNewTheta from '../helpers/calculateNewTheta';

// Coords: should be an enum; but JS does not have enums.
// TS has some though.
const X = 0;
const Y = 1;
const Z = 2;

const Browser = forwardRef((props, ref) => {
  const socketData = useWebsocket();

  const transf = new UnitTransform(
    { x: socketData.mapCanvas.width / 2, y: socketData.mapCanvas.height / 2 },
    socketData.mapInfo.originPos,
    socketData.mapInfo.resolution,
  );

  const [coordSystemCenterX, coordSystemCenterY] = transf.realworldToPx(0, 0);

  const controlsRef = useRef();

  useImperativeHandle(ref,
    () => ({
      resetControls: () => {
        controlsRef.current.reset();
        controlsRef.current.target.set(coordSystemCenterX, 0, coordSystemCenterY);
      },
    }));

  const [isChoosingRotation, setIsChoosingRotation] = useState(false);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostPos, setGhostPos] = useState([]);
  const [ghostRotation, setGhostRotation] = useState([0, 0, 0]);
  const [rotationPickerArrowPos, setRotationPickerArrowPos] = useState([]);

  const handlePointerMove = (e) => {
    if (e.shiftKey || props.isPlacingTarget) {
      if (isChoosingRotation) {
        const newTheta = calculateNewTheta(ghostPos[X], ghostPos[Z], e.point.x, e.point.z);
        setRotationPickerArrowPos([e.point.x, 0, e.point.z]);
        setGhostRotation([0, newTheta, 0]);
      } else {
        setGhostPos([e.point.x, 0, e.point.z]);
        setGhostVisible(true);
      }
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
    setIsChoosingRotation(false);
    if (e.shiftKey || props.isPlacingTarget) {
      props.addTargetHandler(ghostPos[X], ghostPos[Z], ghostRotation[Y]);
    }
  };

  const [oneMeterX, oneMeterY] = transf.realworldToPx(1, 1);

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
            <RobotShadow
              scale={props.modelSize}
              position={ghostPos}
              rotation={ghostRotation}
              arrowVisible={isChoosingRotation}
              arrowPos={rotationPickerArrowPos}
            />
          )}
        </Suspense>

        <Suspense fallback={null}>

          <Targets
            targets={props.targets}
            unitTransform={transf}
            modelSize={props.modelSize}
            targetHoverOn={(id) => props.targetHoverOn(id)}
            targetHoverOff={() => props.targetHoverOff()}
          />
        </Suspense>

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
          minPolarAngle={0}
          maxPolarAngle={0}
          enabled={!isChoosingRotation}
          touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }}
        />
      </Canvas>
    </div>
  );
});

export default Browser;
