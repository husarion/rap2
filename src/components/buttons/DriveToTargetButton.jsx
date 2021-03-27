import React, { useState } from 'react';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export default (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <DoubleArrowIcon
      className={hovered ? 'active' : ''}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={props.clickHandler}
    />
  );
};
