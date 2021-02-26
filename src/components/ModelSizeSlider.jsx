import React from 'react';
import { Slider } from '@material-ui/core';

// model size slider is not useful anymore. we need one size. but how to measure?

export default (props) => {

  return (
    <div className="">
      <h3>ROSBOT Model scale:</h3>
      <Slider
        defaultValue={80}
        min={10}
        max={150}
        step={5}
        onChange={props.changeModelSizeHandler}
      />
    </div>
  );
}