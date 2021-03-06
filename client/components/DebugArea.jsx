import React from 'react';
import { useWebsocket } from './SocketManager';

export default () => {
  const socketData = useWebsocket();

  return (
    <div className="debugs">
      {socketData.debugRobotPos}
      /
      {socketData.debugMapData}
    </div>
  );
};
