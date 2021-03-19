self.onmessage = async (e) => {
  console.log(e);
  const imageDataToPut = drawMap(e.data.mapdata);
  self.postMessage({ imagedata: imageDataToPut });
};

function drawMap(mapdata) {
  const len = mapdata.data.length;

  const imageData = new ImageData(mapdata.info.width, mapdata.info.height);

  for (let i = 0; i < len; i += 1) {
    if (mapdata.data[i] === -1) {
      // ctx.fillStyle = "#dfdfdf"; // lightgray
      imageData.data[i * 4] = 0xdf;
      imageData.data[i * 4 + 1] = 0xdf;
      imageData.data[i * 4 + 2] = 0xdf;
      imageData.data[i * 4 + 3] = 0xff;
    }

    if (mapdata.data[i] === 0) {
      // ctx.fillStyle = "#c98816"; // red/orange
      imageData.data[i * 4] = 0xc9;
      imageData.data[i * 4 + 1] = 0x88;
      imageData.data[i * 4 + 2] = 0x16;
      imageData.data[i * 4 + 3] = 0xff;
    }

    if (mapdata.data[i] === 100) {
      // ctx.fillStyle = "#111111"; // almost black
      imageData.data[i * 4] = 0x11;
      imageData.data[i * 4 + 1] = 0x11;
      imageData.data[i * 4 + 2] = 0x11;
      imageData.data[i * 4 + 3] = 0xff;
    }
  }

  return imageData;
}
