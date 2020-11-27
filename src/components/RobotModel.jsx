import React from 'react';
import { useLoader } from 'react-three-fiber';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from 'drei';

import rosbotModel from '../assets/ROSBOT2.gltf';

export default (props) => {
  const { scene } = useLoader(GLTFLoader, rosbotModel, draco())
  return <primitive object={scene} scale={[props.scale, props.scale, props.scale]} dispose={null} />
}