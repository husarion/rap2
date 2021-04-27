/* eslint-disable no-param-reassign */
import React from 'react';

export default (props) => {
  const setNeedsUpdate = (s) => {
    s.needsUpdate = true;
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[props.mapCanvas.width, props.mapCanvas.height, 1]}
      onPointerMove={props.pointerMoveHandler}
      onPointerDown={props.pointerDownHandler}
      onPointerUp={props.pointerUpHandler}
    >
      <planeGeometry
        width={1}
        height={1}
        onUpdate={setNeedsUpdate}
      />
      <meshBasicMaterial attach="material">
        <canvasTexture
          attach="map"
          image={props.mapCanvas}
          onUpdate={setNeedsUpdate}
          flipY={false}
        />
      </meshBasicMaterial>
    </mesh>
  );
};
