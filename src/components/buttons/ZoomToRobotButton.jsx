import React, { useState } from 'react';
import { Button } from '@material-ui/core';

export default (props) => (
  <div className="">
    <Button
      color="primary"
      onClick={handleClick}
    >
      Zoom to robot
    </Button>
  </div>
);
