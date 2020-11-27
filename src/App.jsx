import React, { useState } from 'react';
import UI from './components/UI';
import Browser from './components/Browser';

export default () => {

  const [modelSize, setModelSize] = useState(0.1);

  return (
    <div className="">
      <div className="sidebar">
        <UI 
          changeModelSizeHandler={(e, val) => setModelSize(val)}
        />
      </div>
      <Browser 
        modelSize={modelSize}
      />
    </div>
  );
}