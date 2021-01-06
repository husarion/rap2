import React, { useState } from 'react';
import { Button } from '@material-ui/core';

export default (props) => {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setActive(!active);
    props.clickHandler(e);
  }

  return (
    <div className="">
      <h3>Add target bytton:</h3>
      <Button 
        variant={ active ? "outlined" : "contained"} 
        color="primary" 
        onClick={handleClick}>
        Add target
      </Button>
    </div>
  );
}

