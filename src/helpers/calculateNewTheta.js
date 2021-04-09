export default function calculateNewTheta(originX, originY, arrowheadX, arrowheadY) {
  const xDiff = arrowheadX - originX;
  const yDiff = arrowheadY - originY;
  const xDiffSgn = Math.sign(xDiff);
  const yDiffSgn = Math.sign(yDiff);
  let newTheta = Math.atan(xDiff / yDiff);
  newTheta -= Math.PI / 2; // offset to be checked
  if (yDiffSgn === -1) {
    if (xDiffSgn === 1) {
      newTheta += Math.PI;
    } else if (xDiffSgn === -1) {
      newTheta -= Math.PI;
    } else {
      newTheta = Math.PI;
    }
  }
  return newTheta;
}
