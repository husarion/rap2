import React, { useRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Html } from 'drei';

import RobotModel from './RobotModel';

export default (props) => {
  const mapPlane = useRef(null);

  return (
    <div className="canvas3d">
      <Canvas>
        <Suspense fallback={<Html><h1>Loading model...</h1></Html>}>
            <RobotModel scale={props.modelSize}/>
        </Suspense>
        <ambientLight color={0xcccccc} />
        <directionalLight position={[0, 1, 1]} />
        <mesh 
          ref={mapPlane}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeBufferGeometry width="2000" height="2000" position={0, -200, 0}/>
          <meshStandardMaterial attach='material' />
        </mesh>

        <OrbitControls 
          dampingFactor={0.2} 
          maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}


// import React, { Suspense } from 'react'
// import { Canvas, useLoader } from 'react-three-fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OrbitControls, Html, draco } from 'drei'


// function Model({ url }) {
//   const { scene } = useLoader(GLTFLoader, url, draco())
//   return <primitive object={scene} dispose={null} />
// }

// export default function App() {
//   return (
//     <Canvas invalidateFrameloop camera={{ position: [0, 5, 1] }}>
//       <directionalLight position={[10, 10, 5]} intensity={2} />
//       <directionalLight position={[-10, -10, -5]} intensity={1} />
//       <OrbitControls />
//       <Suspense fallback={<Html>loading..</Html>}>
//         <Model url={MojModel} />
//       </Suspense>
//     </Canvas>
//   )
// }
