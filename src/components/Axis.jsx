import React from "react";
import { Line } from "drei";

export default (props) => {
  const elevationAbovePlane = 1;
  const boundary = 99999;
  const color = 0xaaaaaa;
  const lineWidth = 0.5;
  const pointLineLength = 10;
  
  return (
    <group>
      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.centerX, elevationAbovePlane, props.centerY],
          [-boundary, elevationAbovePlane, props.centerY],
        ]}
      />
      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.centerX, elevationAbovePlane, props.centerY],
          [boundary, elevationAbovePlane, props.centerY],
        ]}
      />
      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.centerX, elevationAbovePlane, props.centerY],
          [props.centerX, elevationAbovePlane, -boundary],
        ]}
      />
      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.centerX, elevationAbovePlane, props.centerY],
          [props.centerX, elevationAbovePlane, boundary],
        ]}
      />

      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.oneMeterX, elevationAbovePlane, props.centerY - pointLineLength/2],
          [props.oneMeterX, elevationAbovePlane, props.centerY + pointLineLength/2],
        ]}
      />

      <Line
        color={color}
        lineWidth={lineWidth}
        points={[
          [props.centerX - pointLineLength/2, elevationAbovePlane, props.oneMeterY],
          [props.centerX + pointLineLength/2, elevationAbovePlane, props.oneMeterY],
        ]}
      />
    </group>
  );
};
