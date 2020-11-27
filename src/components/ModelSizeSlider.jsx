// let's add a button to control model scale.
import React from 'react';
import { Slider } from '@material-ui/core';

export default (props) => {

  const changeHandler = (e, val) => {
  }

  return (
    <div className="">
      <h3>ROSBOT Model scale:</h3>
      <Slider
        defaultValue={0.1}
        min={0.01}
        max={0.25}
        step={0.01}
        onChange={props.changeModelSizeHandler}
      />
    </div>
  );
}