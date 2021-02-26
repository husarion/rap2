import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import UI from './components/UI';
import Browser from './components/Browser';
import { useWebsocket } from './components/SocketManager';
import DebugArea from './components/DebugArea';
import UnitTransform from './helpers/UnitTransform';
import SidebarResizer from './components/SidebarResizer';

export default () => {
  const [targets, setTargets] = useState([]);
  const [activeTarget, setActiveTarget] = useState(null);
  const [nextId, setNextId] = useState(0);
  const [isPlacingTarget, setIsPlacingTarget] = useState(false);
  const [debugText, setDebugText] = useState('nic');

  // OK it works... now I need to clean this up...

  const [sidebarWidth, setSidebarWidth] = useState(325);
  // const [mouseX, setMouseX] = useState(0);
  const isResizingSidebar = useRef(null);

  const socketData = useWebsocket();

  const browserRef = useRef();
  const sidebarRef = useRef();

  const calculateNewSidebarWidth = (currentX) => {
    // simplicity of this function is based on an assumption
    // that sidebar is positioned on the left side of the viewport
    // hence we only need cursor X position to effectively resize.
    const minSidebarWidth = 300;
    return (minSidebarWidth > currentX) ? minSidebarWidth : currentX;
  }
  
  useEffect( () => {
    window.addEventListener('mouseup', function () {
      isResizingSidebar.current = false;
      document.body.style.cursor = 'default'; 
    });

    window.addEventListener('mousemove', function (e) {
      if (!isResizingSidebar.current) {
        return;
      }
      setSidebarWidth(calculateNewSidebarWidth(e.clientX));
    });
  }, []);

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
    // is calling document an anti pattern here?
    // I don't really see a better way rn.
    document.body.style.cursor = 'pointer'; 
  }

  const targetHoverOff = () => {
    setActiveTarget(null);
    document.body.style.cursor = 'default'; 
  }

  const handleCameraReset = () => {
    console.log(browserRef);
    browserRef.current.resetControls();
  }

  const startResizingSidebar = (e) => {
    e.preventDefault();
    isResizingSidebar.current = true;
    document.body.style.cursor = 'col-resize';
  }

  return (
    <div>
        <div className="sidebar" ref={sidebarRef} style={{ width: sidebarWidth.toString() + "px" }}>
          <UI 
            addTargetHandler={(e) => setIsPlacingTarget(!isPlacingTarget)}
            debugModeHandler={(e) => {}}
            resetCameraHandler={handleCameraReset}
            targets={targets}
            activeTargetId={activeTarget}
            updateTargetsHandler={updateTargets}
          />
          <SidebarResizer 
            mouseDownHandler={startResizingSidebar}
            />
        </div>
          <Browser
            ref={browserRef}
            modelSize={1/socketData.mapInfo.resolution}
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