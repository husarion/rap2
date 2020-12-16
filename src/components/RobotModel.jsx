import React, { useRef, useState } from "react";
import { useLoader } from "react-three-fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import rosbotModel from "../assets/ROSBOT3.gltf";
import { MeshBasicMaterial, Color } from "three";

export default (props) => {
  const { nodes, materials } = useLoader(GLTFLoader, rosbotModel);
  const group = useRef();
  const [hovered, setHover] = useState(false);

  const handlePointerOver = (e) => {
    if (!props.noDefaultHover) {
      setHover(true);
      props.hoverOn(e);
    }
  }

  const handlePointerOut = (e) => {
    if (!props.noDefaultHover) {
      setHover(false);
      props.hoverOff(e);
    }
  }

  const hoverMaterial = new MeshBasicMaterial({ color: new Color(0x0afca8)});

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[props.scale, props.scale, props.scale]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh
        material={
          hovered
            ? hoverMaterial
            : materials["0023_FireBrick"]
        }
        geometry={nodes.mesh_0.geometry}
      />
      <mesh
        material={materials["0136_Charcoal"]}
        geometry={nodes.mesh_0_1.geometry}
      />
      <mesh
        material={materials["0135_DarkGray"]}
        geometry={nodes.mesh_0_2.geometry}
      />
      <mesh
        material={materials["0131_Silver"]}
        geometry={nodes.mesh_0_3.geometry}
      />
      <mesh
        material={materials["0137_Black"]}
        geometry={nodes.mesh_0_4.geometry}
      />
    </group>
  );
};
