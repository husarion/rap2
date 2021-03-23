import React, {
  useState, useRef, useEffect,
} from 'react';
import UI from './components/UI';
import Browser from './components/Browser';
import { useWebsocket } from './components/SocketManager';
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
  const [debugText, setDebugText] = useState('nic');
  const [sidebarWidth, setSidebarWidth] = useState(calculateNewSidebarWidth(325));
  const isResizingSidebar = useRef(null);

  const socketData = useWebsocket();

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

  // could it be a coustom hook?
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

    setTargets([...targets, {
      targetPos: [xOnMap, 0, yOnMap],
      x: realWorldX,
      y: realWorldY,
      theta,
      id: idForNewTarget,
      label: idForNewTarget, // user can name it anything they want later.
    }]);
  };

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

  return (
    <div>
      <MobileButton />
      <div className="sidebar" ref={sidebarRef} style={{ width: `${sidebarWidth.toString()}px` }}>
        <UI
          addTargetHandler={() => setIsPlacingTarget(!isPlacingTarget)}
          debugModeHandler={() => {}}
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
        modelSize={1 / socketData.mapInfo.resolution}
        targets={targets}
        addTargetHandler={addTarget}
        targetHoverOn={targetHoverOn}
        targetHoverOff={targetHoverOff}
        isPlacingTarget={isPlacingTarget}
      />
      <DebugArea debugText={debugText} />
    </div>
  );
};
