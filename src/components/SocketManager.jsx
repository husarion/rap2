import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

export const SocketContext = createContext({
  mapCanvas: {},
  robotPos: {},
  mapInfo: {},
});

export const useWebsocket = () => useContext(SocketContext);

export class SocketManager extends React.Component {
  state = {
    mapCanvas: this.createFakeCanvas(),
    robotPos: { x: 0, y: 0 },
    mapInfo: {
      resolution: 0.01,
      originPos: {
        x: 0,
        y: 0
      }
    },
  };

  socket = null;

  constructor(props) {
    super(props);

    this.socket = io("http://localhost:3003/"); // for testing with no robot
    //this.socket = io();
    this.socket.on("raw_map_data", (mapdata) => {
      console.log("raw_map_data EVENT", mapdata);
      this.handleRawMapData(mapdata);
    });

    this.socket.on("robot_pose", (data) => {
      console.log("Robot pose - this is often", data);
      this.setState((prevState) => {
        const res = prevState.mapInfo.resolution;
        const ourOriginX = -(prevState.mapCanvas.width/2);
        const ourOriginY = prevState.mapCanvas.height/2;
        const originDiffX = ourOriginX - prevState.mapInfo.originPos.x/res;
        const originDiffY = ourOriginY + prevState.mapInfo.originPos.y/res;

        let x = data.x_pos/res + originDiffX;
        let y = data.y_pos/res + originDiffY;

        return {
          robotPos: { x: x, y: y}
        }
      });
    })

    this.socket.on("map_update", (data) => {
      // It goes every second, and is legacy. Not very useful.
      //console.log("map_update EVENT", data);
    });

    this.socket.on('map_file_list', (data) => {
      console.log('map_file_list EVENT', data);
    });

    this.socket.on('add_target', (data) => {
      console.log('add_target EVENT', data);
    });

    this.socket.on('remove_target_by_id', (data) => {
      console.log('remove_target_by_id EVENT', data);
    });

    this.socket.on('new_route_point', (data) => {
      console.log('new_route_point EVENT', data);
    });

    this.socket.on('del_route_point', (data) => {
      console.log('del_route_point EVENT', data);
    });

    this.socket.on('route_status', (data) => {
      console.log('route_status EVENT', data);
    });

    this.socket.on('current_plan', (data) => {
      console.log('current_pln EVENT', data);
    });

    this.socket.on('set_scale_range', (data) => {
      console.log('set_scale_range EVENT', data);
    });
  }

  handleRawMapData(mapdata) {
    // mapdata.data is the array
    // mapdata.info.width
    // mapdata.info.height

    console.log("handleRawMapData is called")
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = mapdata.info.width;
    canvas.height = mapdata.info.height;

    var len = mapdata.data.length;
    // var valuesInArr = new Set();

    for (var i = 0; i < len; i++) {
      // valuesInArr.add(mapdata.data[i]);
      if (mapdata.data[i] == -1) {
        ctx.fillStyle = "#dfdfdf";
      }
      if (mapdata.data[i] == 0) {
        ctx.fillStyle = "#c98816"; // red/orange
      }
      if (mapdata.data[i] == 100) {
        ctx.fillStyle = "#111111";
      }

      ctx.fillRect(
        i % mapdata.info.width,
        // mapdata.info.height - 1 - (Math.floor(i / mapdata.info.width)),
        Math.floor(i / mapdata.info.width),
        1,
        1
      );
    }

    // console.log(valuesInArr);

    // w zasadzie moglbym to 1 do 1
    this.setState({
      mapCanvas: canvas,
      mapInfo: {
        resolution: mapdata.info.resolution,
        originPos: {
          x: mapdata.info.origin.position.x,
          y: mapdata.info.origin.position.y
        }
      }
    });
  }

  createFakeCanvas() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    ctx.fillStyle = "darkslateblue";
    ctx.fillRect(0, 0, 1000, 1000);
    return canvas;
  }

  createFakeMapData() {
    // map data is just an array of size w * h, having (0, 100 or -1 values)

    const w = 600;
    const h = 1700;

    // somewhere on the heap, we create this monstrosity.
    const arr = [];

    for (let i = 0; i < w * h; i++) {
      arr[i] = -1;

      if (i % 123 == 0) {
        arr[i] = 100;
      }

      if (i % 444 == 0) {
        arr[i] = 0;
      }
    }

    return {
      info: {
        width: w,
        height: h,
        origin:{
          position: {
            x: -5,
            y: -18.44
          }
        }
      },
      data: arr,
    };
  }

  render() {
    return (
      <SocketContext.Provider
        value={{...this.state}}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
