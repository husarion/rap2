import React from 'react';

export default (props) => (
  <div className="">
    {props.isConnected ? <h3>Connected</h3> : <h3>Disconnected!!!</h3>}
  </div>
);
