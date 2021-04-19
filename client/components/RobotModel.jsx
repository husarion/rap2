import React, { useState } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import rosbotModel from '../assets/rosbot.gltf';

export default (props) => {
  const { nodes, materials } = useLoader(GLTFLoader, rosbotModel);
  const [hover, setHover] = useState(false);

  const handlePointerOver = (e) => {
    if (!props.noDefaultHover) {
      setHover(true);
      props.hoverOn(e);
    }
  };

  const handlePointerOut = (e) => {
    if (!props.noDefaultHover) {
      setHover(false);
      props.hoverOff(e);
    }
  };

  return (
    <group
      {...props}
      dispose={null}
      scale={[props.scale, props.scale, props.scale]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh material={materials['Color M07']} geometry={nodes.mesh_0.geometry} />
      <mesh material={materials['0136_Charcoal']} geometry={nodes.mesh_0_1.geometry} />
      <mesh material={materials['0135_DarkGray']} geometry={nodes.mesh_0_2.geometry} />
      {hover || props.noDefaultHover || props.hovered
        ? <mesh geometry={nodes.mesh_0_3.geometry}><meshBasicMaterial color={0xba0606} /></mesh>
        : <mesh material={materials['Color M05']} geometry={nodes.mesh_0_3.geometry} />}
      <mesh material={materials['0137_Black']} geometry={nodes.mesh_0_4.geometry} />
      <mesh material={materials['Color M09']} geometry={nodes.mesh_0_5.geometry} />
    </group>
  );
};
