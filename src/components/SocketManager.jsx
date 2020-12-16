import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import Worker from "../helpers/mapdata.worker.js";
import UnitTransform from "../helpers/UnitTransform";

export const SocketContext = createContext({
  mapCanvas: {},
  robotPos: {},
  mapInfo: {},
  debugData: '',
  externalTargets: [] // yeah for now it's uglbyt ok.
});

export const useWebsocket = () => useContext(SocketContext);

export class SocketManager extends React.Component {
  state = {
    debugData: '',
    externalTargets: [],
    mapCanvas: this.createFakeCanvas(),
    robotPos: { x: 0, y: 0, theta: 0 },
    mapInfo: {
      resolution: 0.01,
      originPos: {
        x: 0,
        y: 0
      }
    },
  };

  socket = null;
  worker = null;

  constructor(props) {
    super(props);

    this.worker = new Worker();

    this.worker.onmessage = (e) => {
      console.log("Worker msg ", e );
      const ctx = this.state.mapCanvas.getContext('2d');
      ctx.putImageData(e.data.imagedata, 0, 0);
    }

    this.socket = io("http://localhost:3003/"); // for testing with no robot
    // this.socket = io();

    this.socket.on("raw_map_data", (mapdata) => {
      console.log("raw_map_data EVENT", mapdata);
      // this.handleRawMapData(mapdata);
      this.handleRawMapDataWebWorker(mapdata);

    });

    this.socket.on("robot_pose", (data) => {
      // console.log("Robot pose - this is often", data);
      this.setState((prevState) => {
        const transf = new UnitTransform(
          { x: prevState.mapCanvas.width/2, y: prevState.mapCanvas.height/2 },
          prevState.mapInfo.originPos,
          prevState.mapInfo.resolution
        )

        const [x, y] = transf.realworldToPx(data.x_pos, data.y_pos);

        return {
          robotPos: { x: x, y: y, theta: data.theta},
          debugData: 'x: ' + data.x_pos + ' y: ' + data.y_pos + 't: ' + data.theta
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
      // so the format that is used

      // yeah let's just add target simply.

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

  handleRawMapDataWebWorker(mapdata) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = mapdata.info.width;
    canvas.height = mapdata.info.height;

    console.log("Posting to worker.")
    this.worker.postMessage({ mapdata: mapdata})

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

  handleRawMapData(mapdata) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = mapdata.info.width;
    canvas.height = mapdata.info.height;

    var len = mapdata.data.length;

    for (var i = 0; i < len; i++) {
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

  // fake canvas for when we have no map.
  createFakeCanvas() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    ctx.fillStyle = "darkslateblue";
    ctx.fillRect(0, 0, 1000, 1000);
    return canvas;
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
