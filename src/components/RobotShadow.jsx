import React, { useRef } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import rosbotModel from '../assets/rosbot.gltf';

import RotationPickerArrow from './RotationPickerArrow';

export default (props) => {
  const { nodes } = useLoader(GLTFLoader, rosbotModel);
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null} scale={[props.scale, props.scale, props.scale]}>
      { props.arrowVisible && <RotationPickerArrow begin={props.position} end={props.arrowPos} />}
      <mesh geometry={nodes.mesh_0.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
      <mesh geometry={nodes.mesh_0_1.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
      <mesh geometry={nodes.mesh_0_2.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
      <mesh geometry={nodes.mesh_0_3.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
      <mesh geometry={nodes.mesh_0_4.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
      <mesh geometry={nodes.mesh_0_5.geometry}><meshBasicMaterial color={0x00ff00} /></mesh>
    </group>
  );
};
