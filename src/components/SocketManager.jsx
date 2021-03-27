import React, { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import Worker from '../helpers/mapdata.worker';
import UnitTransform from '../helpers/UnitTransform';

// fake canvas for when we have no map.
function createFakeCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 1000;

  ctx.fillStyle = 'darkslateblue';
  ctx.fillRect(0, 0, 1000, 1000);
  return canvas;
}


export const SocketContext = createContext({
  mapCanvas: {},
  robotPos: {},
  mapInfo: {},
  debugData: '',
  wsTargets: [],
  isConnected: false,
});

export const useWebsocket = () => useContext(SocketContext);

// const ws = io('http://192.168.1.14:3003/'); // for testing with no robot
const ws = io();

export class SocketManager extends React.Component {
  /**
   * @typedef {Object} TargetPoint
   * @property {string} label
   * @property {number} x
   * @property {number} y
   * @property {number} theta
   * @param {TargetPoint} targetObj
   */
  static emitNewTarget(targetObj) {
    if (!ws) return;
    console.log('emitting new_target', targetObj);
    ws.emit('new_target', targetObj);
  }

  /**
   * @param {number} targetID
   */
  static emitDriveToTarget(targetID) {
    if (!ws) return;
    console.log('emitting driveToTarget', targetID);
    ws.emit('drive_to_target', targetID);
  }

  static emitPing() {
    if (!ws) return;
    ws.emit('ping', '');
  }

  state = {
    debugData: '',
    wsTargets: [], // change it to simply "targets" later
    mapCanvas: createFakeCanvas(),
    robotPos: { x: 0, y: 0, theta: 0 },
    mapInfo: {
      resolution: 0.01,
      originPos: {
        x: 0,
        y: 0,
      },
    },
    isConnected: false,
  };

  socket = null;

  worker = null;

  keepaliveTimer = null;

  constructor(props) {
    super(props);

    // we are using web worker to draw robot occupancy grid from raw data because it's quite costly
    this.initWebWorker();
    // keepalive/ping-pong procedure allows us to have nice connection indicator on frontend
    this.initKeepalive();

    ws.on('raw_map_data', (mapdata) => {
      console.log('raw_map_data EVENT', mapdata);
      this.handleRawMapDataWebWorker(mapdata);
    });

    ws.on('robot_pose', (data) => {
      this.setState((prevState) => {
        const transf = new UnitTransform(
          { x: prevState.mapCanvas.width / 2, y: prevState.mapCanvas.height / 2 },
          prevState.mapInfo.originPos,
          prevState.mapInfo.resolution,
        );

        const [x, y] = transf.realworldToPx(data.x_pos, data.y_pos);

        return {
          robotPos: { x, y, theta: data.theta },
          debugData: `x: ${data.x_pos} y: ${data.y_pos}t: ${data.theta}`,
        };
      });
    });

    ws.on('map_update', (data) => {
      // It goes every second, and is legacy. Not very useful.
      // console.log("map_update EVENT", data);
    });

    ws.on('map_file_list', (data) => {
      console.log('map_file_list EVENT', data);
    });

    ws.on('add_target', (data) => {
      console.log('add_target EVENT', data);
      // so the format that is used

      // yeah let's just add target simply.

      this.setState((prevState) => ({
        wsTargets: [...prevState.wsTargets, data], // id, x, y, theta, label
      }));
    });

    ws.on('remove_target_by_id', (data) => {
      console.log('remove_target_by_id EVENT', data);
    });

    ws.on('new_route_point', (data) => {
      console.log('new_route_point EVENT', data);
    });

    ws.on('del_route_point', (data) => {
      console.log('del_route_point EVENT', data);
    });

    ws.on('route_status', (data) => {
      console.log('route_status EVENT', data);
    });

    ws.on('current_plan', (data) => {
      console.log('current_pln EVENT', data);
    });

    ws.on('set_scale_range', (data) => {
      console.log('set_scale_range EVENT', data);
    });

    ws.on('pong', () => {
      this.setState({
        isConnected: true,
      });
    });
  }

  handleRawMapDataWebWorker(mapdata) {
    const canvas = document.createElement('canvas');

    canvas.width = mapdata.info.width;
    canvas.height = mapdata.info.height;

    console.log('Posting to worker.');
    this.worker.postMessage({ mapdata });

    this.setState({
      mapCanvas: canvas,
      mapInfo: {
        resolution: mapdata.info.resolution,
        originPos: {
          x: mapdata.info.origin.position.x,
          y: mapdata.info.origin.position.y,
        },
      },
    });
  }

  initWebWorker() {
    this.worker = new Worker();

    this.worker.onmessage = (e) => {
      console.log('Worker msg ', e);
      const ctx = this.state.mapCanvas.getContext('2d');
      ctx.putImageData(e.data.imagedata, 0, 0);
    };
  }

  initKeepalive() {
    this.emitPing();
    this.resetKeepaliveTimer();

    ws.on('pong', () => {
      this.setState({
        isConnected: true,
      });
      this.resetKeepaliveTimer();
    });
  }

  resetKeepaliveTimer() {
    clearTimeout(this.keepaliveTimer);

    this.keepaliveTimer = setTimeout(() => {
      this.setState({
        isConnected: false,
      });
    }, 2000);
  }

  render() {
    return (
      <SocketContext.Provider
        value={{ ...this.state }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

// when in doubt, do it the dumb way first.
