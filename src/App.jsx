import React, { useState, useRef, useImperativeHandle } from 'react';
import UI from './components/UI';
import Browser from './components/Browser';
import { SocketManager, useWebsocket } from './components/SocketManager';
import DebugArea from './components/DebugArea';
import UnitTransform from './helpers/UnitTransform';

export default () => {
  const [modelSize, setModelSize] = useState(80);
  const [targets, setTargets] = useState([]);
  const [activeTarget, setActiveTarget] = useState(null);
  const [nextId, setNextId] = useState(0);
  const [isPlacingTarget, setIsPlacingTarget] = useState(false);
  const [debugText, setDebugText] = useState('nic');
  const socketData = useWebsocket();

  const browserRef = useRef();

  const getNextId = () => {
    setNextId(nextId + 1);
    return nextId;
  }

  const addTarget = (xOnMap, yOnMap, theta) => {
    console.log("Adding target: ", xOnMap, yOnMap);
    console.log(socketData);

    const transf = new UnitTransform(
      { x: socketData.mapCanvas.width/2, y: socketData.mapCanvas.height/2 }, 
      socketData.mapInfo.originPos,
      socketData.mapInfo.resolution
    );

    const [realWorldX, realWorldY] = transf.pxToRealworld(xOnMap, yOnMap)

    setTargets([...targets, {
      targetPos: [xOnMap, 0, yOnMap],
      x: realWorldX,
      y: realWorldY,
      theta: theta,
      id: getNextId()
    }])
  }

  const updateTargets = (newTargets) => {
    setTargets(newTargets);
  }

  const targetHoverOn = (targetId) => {
    setActiveTarget(targetId);
  }

  const targetHoverOff = () => {
    setActiveTarget(null);
  }

  const handleCameraReset = () => {
    console.log(browserRef);
    browserRef.current.resetControls();
  }

  return (
    <div className="">
        <div className="sidebar">
          <UI 
            changeModelSizeHandler={(e, val) => setModelSize(val)}
            addTargetHandler={(e) => setIsPlacingTarget(!isPlacingTarget)}
            debugModeHandler={(e) => {}}
            resetCameraHandler={handleCameraReset}
            targets={targets}
            activeTargetId={activeTarget}
            updateTargetsHandler={updateTargets}
          />
        </div>
          <Browser
            ref={browserRef}
            modelSize={modelSize}
            targets={targets}
            addTargetHandler={addTarget}
            targetHoverOn={targetHoverOn}
            targetHoverOff={targetHoverOff}
            isPlacingTarget={isPlacingTarget}
          />
          <DebugArea debugText={debugText} />
    </div>
  );
}