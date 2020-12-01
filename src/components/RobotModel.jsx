import React, { useRef} from 'react';
import { useLoader } from 'react-three-fiber';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from 'drei';

import rosbotModel from '../assets/ROSBOT2.gltf';

export default (props) => {
  const { nodes, materials } = useLoader(GLTFLoader, rosbotModel)
  const group = useRef()
  
  // const { scene } = useLoader(GLTFLoader, rosbotModel)

  return (
    <group ref={group} {...props} dispose={null} scale={[props.scale, props.scale, props.scale]}>
      <mesh material={materials['0023_FireBrick']} geometry={nodes.mesh_0.geometry} />
      <mesh material={materials['0136_Charcoal']} geometry={nodes.mesh_0_1.geometry} />
      <mesh material={materials['0135_DarkGray']} geometry={nodes.mesh_0_2.geometry} />
      <mesh material={materials['0131_Silver']} geometry={nodes.mesh_0_3.geometry} />
      <mesh material={materials['0137_Black']} geometry={nodes.mesh_0_4.geometry} />
    </group>
  )

  // return <primitive 
  //          object={scene} 
           
  //          dispose={null} />
}