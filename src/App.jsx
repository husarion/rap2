import React, {
  useState, useRef, useEffect, Suspense,
} from 'react';
import UI from './components/UI';
import Browser from './components/Browser';
import { SocketManager, useWebsocket } from './components/SocketManager';
import DebugArea from './components/DebugArea';
import UnitTransform from './helpers/UnitTransform';
import SidebarResizer from './components/SidebarResizer';
import calculateNewSidebarWidth from './helpers/calculateNewSidebarWidth';
import MobileButton from './components/buttons/MobileButton';

export default () => {
  const [targets, setTargets] = useState([]);
  const [activeTarget, setActiveTarget] = useState(null);
  const [nextId, setNextId] = useState(0);
  const [isPlacingTarget, setIsPlacingTarget] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(
    calculateNewSidebarWidth(325),
  );

  const socketData = useWebsocket();
  const isResizingSidebar = useRef(null);
  const browserRef = useRef();
  const sidebarRef = useRef();

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      isResizingSidebar.current = false;
      document.body.style.cursor = 'default';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isResizingSidebar.current) {
        return;
      }
      setSidebarWidth(calculateNewSidebarWidth(e.clientX));
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        // it gets insanely complicated now: :(
        // i would love to simply artificially "click" add target button now,
        // like in jquery now....
        // setIsPlacingTarget(false);
      }
    });
  }, []);

  const getNextId = () => {
    setNextId(nextId + 1);
    return nextId;
  };

  const addTarget = (xOnMap, yOnMap, theta) => {
    console.log('Adding target: ', xOnMap, yOnMap);
    console.log(socketData);

    const transf = new UnitTransform(
      { x: socketData.mapCanvas.width / 2, y: socketData.mapCanvas.height / 2 },
      socketData.mapInfo.originPos,
      socketData.mapInfo.resolution,
    );

    const [realWorldX, realWorldY] = transf.pxToRealworld(xOnMap, yOnMap);

    const idForNewTarget = getNextId();

    SocketManager.emitNewTargetRequest({
      x: realWorldX,
      y: realWorldY,
      theta,
      label: idForNewTarget,
    });
  };

  // this will also be changed...
  const updateTargets = (newTargets) => {
    setTargets(newTargets);
  };

  const targetHoverOn = (targetId) => {
    setActiveTarget(targetId);
    // is calling document an anti pattern here?
    // I don't really see a better way rn.
    document.body.style.cursor = 'pointer';
  };

  const targetHoverOff = () => {
    setActiveTarget(null);
    document.body.style.cursor = 'default';
  };

  const handleCameraReset = () => {
    browserRef.current.resetControls();
  };

  const startResizingSidebar = (e) => {
    e.preventDefault();
    isResizingSidebar.current = true;
    document.body.style.cursor = 'col-resize';
  };

  // console.log('rerender app');

  return (
    <div>
      <Suspense fallback={null}>
        <MobileButton />
        <div
          className="sidebar"
          ref={sidebarRef}
          style={{ width: `${sidebarWidth.toString()}px` }}
        >
          <UI
            addTargetHandler={() => setIsPlacingTarget(!isPlacingTarget)}
            debugModeHandler={() => {}}
            resetCameraHandler={handleCameraReset}
            targets={socketData.wsTargets}
            activeTargetId={activeTarget}
            updateTargetsHandler={updateTargets}
            deleteTargetHandler={(id) => SocketManager.emitDeleteTargetRequest(id)}
            driveToTargetHandler={(id) => SocketManager.emitDriveToTarget(id)}
            stopHandler={() => SocketManager.emitStopDrive()}
            isConnected={socketData.isConnected}
          />
          <SidebarResizer mouseDownHandler={startResizingSidebar} />
        </div>
        <Browser
          ref={browserRef}
          modelSize={1 / socketData.mapInfo.resolution}
          targets={socketData.wsTargets}
          addTargetHandler={addTarget}
          targetHoverOn={targetHoverOn}
          targetHoverOff={targetHoverOff}
          isPlacingTarget={isPlacingTarget}
        />
        <DebugArea />
      </Suspense>
    </div>
  );
};
