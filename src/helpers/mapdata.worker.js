self.onmessage = async (e) => {
  console.log(e);
  const imageDataToPut = drawMap(e.data.mapdata);
  self.postMessage({ imagedata: imageDataToPut });

};

function drawMap(mapdata) {
  var len = mapdata.data.length;

  const imageData = new ImageData(mapdata.info.width, mapdata.info.height);
  
  for (var i = 0; i < len; i++) {
    
    if (mapdata.data[i] == -1) {
      imageData.data[i*4]   = 0xdf;
      imageData.data[i*4+1] = 0xdf;
      imageData.data[i*4+2] = 0xdf;
      imageData.data[i*4+3] = 0xff;
    }

    if (mapdata.data[i] == 0) {
      // ctx.fillStyle = "#c98816"; // red/orange
      imageData.data[i*4]   = 0xc9;
      imageData.data[i*4+1] = 0x88;
      imageData.data[i*4+2] = 0x16;
      imageData.data[i*4+3] = 0xff;
    }
    
    if (mapdata.data[i] == 100) {
      imageData.data[i*4]   = 0x11;
      imageData.data[i*4+1] = 0x11;
      imageData.data[i*4+2] = 0x11;
      imageData.data[i*4+3] = 0xff;
      // ctx.fillStyle = "#111111";
    }
  }

  return imageData;

  // ctx.fillRect(
  //   i % mapdata.info.width,
  //   // mapdata.info.height - 1 - (Math.floor(i / mapdata.info.width)),
  //   Math.floor(i / mapdata.info.width),
  //   1,
  //   1
  // );
}