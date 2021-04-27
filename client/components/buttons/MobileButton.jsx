import React, { useState } from 'react';

export default () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    // props.clickHandler(e);
  };

  return (
    <div role="button" className={`mobile-button-cnt ${active ? 'active' : ''}`} onClick={handleClick}>
      <div className="mobile-button">
        <svg className="closed" fill="#fff" viewBox="0 0 100 100" width="40" height="40">
          <rect y="20" width="100" height="10" />
          <rect y="50" width="100" height="10" />
          <rect y="80" width="100" height="10" />
        </svg>

        <svg className="opened" fill="#fff" viewBox="0 0 100 100" width="40" height="40">
          <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="10" />
          <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="10" />
        </svg>
      </div>
    </div>
  );
};

// 1st step... make it clickable...
// but 0st step is to design

// mobile version should, in my opinion, be full-featured, but less verbose...
