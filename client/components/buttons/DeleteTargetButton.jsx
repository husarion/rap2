import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export default (props) => {
  const [hovered, setHovered] = useState(false);

  // const handleClick = (e) => {
  //   setActive(!active);
  //   props.clickHandler(e);
  // }

  return (
    <DeleteIcon
      className={hovered ? 'active' : ''}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={props.clickHandler}
    />
  );
};
