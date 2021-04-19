export default class UnitTransform {
  constructor(canvsOriginPos, robotOriginPos, resolution) {
    this.res = resolution;
    this.originDiffX = canvsOriginPos.x + (robotOriginPos.x / this.res);
    this.originDiffY = canvsOriginPos.y + (robotOriginPos.y / this.res);
  }

  pxToRealworld(x, y) {
    const realWorldX = (x + this.originDiffX) * this.res;
    const realWorldY = -(y + this.originDiffY) * this.res;
    return [realWorldX, realWorldY];
  }

  realworldToPx(x, y) {
    const mapX = x / this.res - this.originDiffX;
    const mapY = -y / this.res - this.originDiffY;
    return [mapX, mapY];
  }
}
