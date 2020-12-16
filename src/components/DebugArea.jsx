import React from 'react';
import { useWebsocket } from './SocketManager';

export default (props) => {

  const socketData = useWebsocket();
  
  return (
    <div className="debugs">
      {socketData.debugData}
    </div>
  );
}

