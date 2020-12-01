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
        defaultValue={80}
        min={10}
        max={150}
        step={5}
        onChange={props.changeModelSizeHandler}
      />
    </div>
  );
}