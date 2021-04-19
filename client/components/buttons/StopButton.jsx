import React from 'react';
import { Button } from '@material-ui/core';

export default (props) => (
  <Button
    color="primary"
    variant="contained"
    onClick={props.clickHandler}
  >
    STOP
  </Button>
);
