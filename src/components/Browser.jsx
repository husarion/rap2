import React, { useState, useRef, Suspense } from "react";

import { Canvas } from "react-three-fiber";
import { OrbitControls, Html, PerspectiveCamera, Torus } from "drei";

import { useWebsocket } from "./SocketManager";
import MapPlane from "./MapPlane";
import RobotModel from "./RobotModel";
import RobotShadow from "./RobotShadow";

export default (props) => {
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostPos, setGhostPos] = useState([]);

  const socketData = useWebsocket();

  const targets = props.targets.map((target) => {
    return (
      <RobotModel
        scale={props.modelSize}
        position={target.targetPos}
        hoverOn={props.targetHoverOn}
        hoverOff={props.targetHoverOff}
      ></RobotModel>
    );
  });

  const handlePointerMove = (e) => {
    if (e.shiftKey) {
      setGhostPos([e.point.x, 0, e.point.z]);
      setGhostVisible(true);
      console.log(e.point.x, e.point.z);
    } else {
      setGhostVisible(false);
    }
  };

  const handleClick = (e) => {
    if (e.shiftKey) {
      props.addTargetHandler(e.point.x, e.point.z);
    }
  };

  return (
    <div className="canvas3d">
      <Canvas gl={{ antialias: false }}>
        {/* <axesHelper scale={[500, 500, 5000]} /> */}

        <Suspense fallback={null}>
          <RobotModel
            scale={props.modelSize}
            position={[socketData.robotPos.x, 0, socketData.robotPos.y]}
            noDefaultHover
          />
        </Suspense>

        {/* <Torus args={[100, 20, 8, 60]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial attach="material" color="#ffff00" />
        </Torus> */}

        <Suspense fallback={null}>
          {ghostVisible && (
            <RobotShadow scale={props.modelSize} position={ghostPos} />
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
          pointerMoveHandler={handlePointerMove}
          clickHandler={handleClick}
          mapCanvas={socketData.mapCanvas}
        />

        <OrbitControls
          minDistance={1}
          maxDistance={100000}
          dampingFactor={0.2}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          maxPolarAngle={0}
          maxPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};
