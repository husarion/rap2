// import Viewer3D from './Viewer3D';
import './style';
import * as io from 'socket.io-client';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const title = 'React with Webpack and Babel';
 
ReactDOM.render(
  <App />,
  document.getElementById('react-target-div')
);

//        <img src="assets/logo_static.svg"/>
// <button id="set-top-view">TOP VIEW</button>

// const socket = io();
const socket = (() => {
  // just hate this polling so building a mock.
  return {
    on: (someString, someCb) => {} 
  }
})();

document.getElementsByTagName('img')[0].onclick = function () {
  socket.emit('raw_map_request');
}

function handleRawMapData(mapdata) {
  // mapdata.data is the array
  // mapdata.info.width
  // mapdata.info.height
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = mapdata.info.width;
  canvas.height = mapdata.info.height;

  var len = mapdata.data.length;
  var valuesInArr = new Set();

  for (var i = 0; i < len; i++) {
    valuesInArr.add(mapdata.data[i]);
    if (mapdata.data[i] == -1) {
      ctx.fillStyle = "#dfdfdf";
    }
    if (mapdata.data[i] == 0) {
      ctx.fillStyle = "#c98816"; // red/orange
    }
    if (mapdata.data[i] == 100) {
      ctx.fillStyle = "#8870e6"; // violet
    }

    ctx.fillRect(
      i % mapdata.info.width,
      Math.floor(i / mapdata.info.width),
      1,
      1
    );
  }

  console.log(valuesInArr);

  // render map in Three.js....
  // This may take some time...
  // Viewer3D.setMap(canvas)
}

function saveMapSettings() {
  let map_settings = {
    map_static: false,
    map_slam: true,
    map_file: "",
    map_autosave: false,
  };
  console.log(map_settings);
  socket.emit("save_map_settings", map_settings);
}

function createFakeMapData() {
  // map data is just an array of size w * h, having (0, 100 or -1 values)

  const w = 2000;
  const h = 2100;

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
    },
    data: arr
  }
}

function showLoader() {
  console.log("Loading...");
}


showLoader();


// this is blocking.
// const fakeMap = createFakeMapData();

// handleRawMapData(fakeMap);

// socket.on("raw_map_data", function (mapdata) {
//   handleRawMapData(mapdata);
//   console.log("New map arrived ");
//   console.log(mapdata);

//   // var len = some_data.data.length;
//   // var valuesInArr = new Set();

//   // var newCanv = document.getElementById('crazy-canv');
//   // newCanv.width = some_data.info.width;
//   // newCanv.height = some_data.info. height;

//   // var newCtx = newCanv.getContext('2d');

//   // for(var i = 0; i < len ; i++) {
//   //     valuesInArr.add(some_data.data[i]);
//   //     if (some_data.data[i] == -1) {
//   //         newCtx.fillStyle = '#28d155'; //greenish
//   //     }
//   //     if (some_data.data[i] == 0) {
//   //         newCtx.fillStyle = '#c98816'; // red/orange
//   //     }
//   //     if (some_data.data[i] == 100) {
//   //         newCtx.fillStyle = '#8870e6'; // violet
//   //     }

//   //     newCtx.fillRect(i % some_data.info.width, Math.floor(i / some_data.info.width), 1, 1);

//   // }

//   // console.log(valuesInArr);
// });
