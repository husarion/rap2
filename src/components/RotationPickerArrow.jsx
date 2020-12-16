import React from 'react';
import { Line } from 'drei';

export default (props) => {
  const elevationAboveThePlane = 10;
  const begin = [
    props.begin[0],
    elevationAboveThePlane,
    props.begin[2]
  ];

  const end = [
    props.end[0],
    elevationAboveThePlane,
    props.end[2]
  ]

  // there 's more to it...
  return (
    <Line
      points={[begin, end]}
      color="black"              
      lineWidth={10}
      dashed={false}
    />
  )
}