import React from 'react';
import { Button } from '@material-ui/core';

export default (props) => {
  return (
      <Button 
        color="primary"
        variant="contained"
        onClick={props.clickHandler}>
        Reset camera
      </Button>
  );
}

