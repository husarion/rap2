import React, { useState } from 'react';
import UI from './components/UI';
import Browser from './components/Browser';
import { SocketManager } from './components/SocketManager';

export default () => {
  const [modelSize, setModelSize] = useState(80);
  const [targets, setTargets] = useState([]);

  const addTarget = (xOnMap, yOnMap) => {
    console.log("Adding target: ", xOnMap, yOnMap);

    // transform xOnMap, yOnMap to actual data for robot.
    // that is, target relative to origin of robot map.


    setTargets([...targets, {
      targetPos: [xOnMap, 0, yOnMap],
      x: xOnMap,
      y: yOnMap,
      theta: 0.1235
    }])
  }

  return (
    <div className="">
      <SocketManager>
        <div className="sidebar">
          <UI 
            changeModelSizeHandler={(e, val) => setModelSize(val)}
            targets={targets}
          />
        </div>
          <Browser 
            modelSize={modelSize}
            targets={targets}
            addTargetHandler={addTarget}
          />
      </SocketManager>
    </div>
  );
}