import React, { useRef, useState } from 'react';
import { useLoader } from 'react-three-fiber';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import rosbotModel from '../assets/ROSBOT_realSize_fix3.gltf';
import rosbotModelHover from '../assets/ROSBOT_realSize_hover5.gltf';

export default (props) => {
  const hoverModelObj = useLoader(GLTFLoader, rosbotModelHover);

  const nodes2 = { ...hoverModelObj.nodes };
  const materials2 = { ...hoverModelObj.materials };

  // will this thing be loaded over and over? I am unsure.
  const { nodes, materials } = useLoader(GLTFLoader, rosbotModel);
  const group = useRef();
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

  const hoverGroup = (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[props.scale, props.scale, props.scale]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* <arrowHelper args={[undefined, undefined, 0.5, 0xff0000]}/> */}
      <mesh material={materials['0135_DarkGray']} geometry={nodes.mesh_0.geometry} />
      <mesh material={materials['0136_Charcoal']} geometry={nodes.mesh_0_1.geometry} />
      <mesh material={materials['0137_Black']} geometry={nodes.mesh_0_2.geometry} />
      <mesh material={materials['0023_FireBrick']} geometry={nodes.mesh_0_3.geometry} />
      <mesh material={materials['0131_Silver']} geometry={nodes.mesh_0_4.geometry} />
    </group>
  );

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[props.scale, props.scale, props.scale]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh material={materials2['Color M07']} geometry={nodes2.mesh_0.geometry} />
      <mesh material={materials2['0136_Charcoal']} geometry={nodes2.mesh_0_1.geometry} />
      <mesh material={materials2['0135_DarkGray']} geometry={nodes2.mesh_0_2.geometry} />
      {hover || props.noDefaultHover
        ? <mesh geometry={nodes2.mesh_0_3.geometry}><meshBasicMaterial color={0xba0606} /></mesh>
        : <mesh material={materials2['Color M05']} geometry={nodes2.mesh_0_3.geometry} />}
      <mesh material={materials2['0137_Black']} geometry={nodes2.mesh_0_4.geometry} />
      <mesh material={materials2['Color M09']} geometry={nodes2.mesh_0_5.geometry} />
    </group>
  );
};
