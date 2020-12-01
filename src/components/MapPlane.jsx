import React, { useRef, useMemo } from "react";

export default (props) => {
  const mapPlane = useRef(null);
  const onu = (s) => {
    s.needsUpdate = true;
  }

  return (
    <mesh ref={mapPlane} 
    rotation={[-Math.PI / 2, 0, 0]}
    scale={[props.mapCanvas.width, props.mapCanvas.height, 1]}
    onPointerMove={props.pointerMoveHandler}
    onClick={props.clickHandler}
    >
      <planeGeometry
        width={1}
        height={1}
        position={(0, -300, 0)}
        onUpdate={onu}
      />
      <meshBasicMaterial attach="material">
        <canvasTexture
          attach="map"
          image={props.mapCanvas}
          onUpdate={onu}
          flipY={false} // don't flip the image - we know what we're doing, right?
        />
      </meshBasicMaterial>
    </mesh>
  );
};
