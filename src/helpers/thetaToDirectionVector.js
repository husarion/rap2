import { Vector3 } from 'three';

export default function thetaToDirectionVector(theta) {
  // note: performance pitfalls state to avoid creation of objects...
  return new Vector3(Math.sin(theta + Math.PI / 2), 0, Math.cos(theta + Math.PI / 2)).normalize();
}
