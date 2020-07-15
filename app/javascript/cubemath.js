import * as math from 'mathjs'
import { jsBezier } from 'jsbezier'

import { addKeyFrames } from './stylesheet'

// function norm(v) {
//     return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
// }
// function normalize(v) {
//     var length = norm(v);
//     return [v[0]/length, v[1]/length, v[2]/length];
// }
// function dotProduct(v1, v2) {
//     return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
// }
// function crossProduct(v1, v2) {
//     return [v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], v1[0]*v2[1] - v1[1]*v2[0]];
// }
// function getAngle(v1, v2) {
//     return Math.acos(dotProduct(v1, v2) / (norm(v1)*norm(v2)));
// }
// function matrixMultiply(matrix, v) {
//     return [dotProduct(matrix[0], v), dotProduct(matrix[1], v), dotProduct(matrix[2], v)];
// }
// function aRotate(p, v, a) {
//     var ca = Math.cos(a), sa = Math.sin(a), t=1-ca, x=v[0], y=v[1], z=v[2];
//     var r = [
//         [ca + x*x*t, x*y*t - z*sa, x*z*t + y*sa],
//         [x*y*t + z*sa, ca + y*y*t, y*z*t - x*sa],
//         [z*x*t - y*sa, z*y*t + x*sa, ca + z*z*t]
//     ];
//     return matrixMultiply(r, p);
// }
// const ccp = [0.45, 0, 0.55, 1]
// const ccp = [0.85, 0, 0.15, 1]
const ccp = [0, 0, 1, 1]
const curve = [{ x: 0, y: 0 }, { x: ccp[0], y: ccp[1] }, { x: ccp[2], y: ccp[3] }, { x: 1, y: 1 }]
const getEasedValue = (location, n=100.0) => jsBezier.pointOnCurve(curve, 1 - location / parseFloat(n))['y'] * n

const get3DVectorMatrix = (a) => {
  return math.matrix([
    [ 0,     -a[2], a[1]  ],
    [ a[2],  0,     -a[0] ],
    [ -a[1], a[0],  0     ]
  ])
}

// https://computergraphics.stackexchange.com/questions/2399/3d-rotation-matrix-around-vector
const get3DRotationMatrixAlongVector = (C, theta) => {
  const I = math.identity(C.size()[0]);
  const Csin = math.multiply(C, Math.sin(-theta));
  const C2cos = math.multiply(math.multiply(C, C), (1 - Math.cos(theta)));

  return math.add(I, math.add(Csin, C2cos));
}

const cameraPos = [0.5, 0.5, -60];
const f = -cameraPos[2] * 0.6;
const zIndexMultiplier = 1;

const projectToScreen = (vector) => {
  const v = vector.toArray()
  let ratio = f / (v[2] - cameraPos[2]);
  if (!isFinite(ratio)) {
    ratio = 0
  }
  const x = ((v[0] - cameraPos[0]) * ratio) + cameraPos[0]
  const y = ((v[1] - cameraPos[1]) * ratio) + cameraPos[1]
  const zIndex = -v[2]
  return [x, y, zIndex]
}

const range = (n) => [...Array(n).keys()]

const getVectorRotationTrajectoryOnScreen = (vector, theta, axis, frequency=100) => {
  const step = theta / frequency
  const C = get3DVectorMatrix(math.divide(axis, math.norm(axis)))
  const rotatedVectors = range(frequency).map(i => {
    const rotatedVector = math.multiply(get3DRotationMatrixAlongVector(C, step * getEasedValue(i + 1, frequency)), vector)
    // const rotatedVector = math.multiply(get3DRotationMatrixAlongVector(C, step * (i + 1)), vector)
    return rotatedVector
  })
  return rotatedVectors.map(vector => projectToScreen(vector))
}

const prepForPolygon = (x, padding, center=0.5) => {
  const xpadded = (x - center) * (1 + padding) + center
  return xpadded * 100
}

const pointToPolygonCoordinate = (p, padding=0.0) => {
  return `${prepForPolygon(p[0], padding)}% ${prepForPolygon(1 - p[1], padding)}%`
}

const getZIndex = (pointNodes, initialFace) => {
  const tl = pointNodes[0]
  const tr = pointNodes[1]
  const br = pointNodes[2]
  const bl = pointNodes[3]
  const flipped = tl[1] >= tr[1]
  // const hflip = tl[0] > tr[0] && bl[0] > br[0]
  // const vflip = tl[0] > bl[0] && tr[0] > br[0]
  // const flipped = vflip !== hflip
  return (initialFace ? 1 : -1) * (flipped ? 1 : -1)
}

const createClipKeyframe = (name, points, initialFace, padding=0.0) => {
  const numberOfPoints = points[0].length
  const numberOfNodes = points.length
  const step = 100 / numberOfPoints // %
  const rules = range(numberOfPoints).map(i => {
    const pointNodes = points.map(p => p[i])
    const ruleComponents = pointNodes.map(p => pointToPolygonCoordinate(p, padding))
    const inner = ruleComponents.join(',')
    const zIndex = getZIndex(pointNodes, initialFace)
    return `${parseInt(i * step)}% { clip-path: polygon(${inner}); z-index: ${zIndex}; }`
  });
  addKeyFrames(name, rules.join(' '));
}

const axis = [1/3, 1/3, 1/3];

export const createCubeKeyframes = (rotations=1, padding=0.05) => {
  const theta = rotations * 2 * Math.PI;

  const p000 = [0, 0, 0]
  const p001 = [0, 0, 1]
  const p010 = [0, 1, 0]
  const p100 = [1, 0, 0]
  const p110 = [1, 1, 0]
  const p101 = [1, 0, 1]
  const p011 = [0, 1, 1]
  const p111 = [1, 1, 1]

  const sides = {
    front: [p010, p000, p100, p110],
    back: [p001, p011, p111, p101],
    left: [p000, p001, p011, p010],
    right: [p100, p101, p111, p110],
    top: [p011, p111, p110, p010],
    bottom: [p100, p000, p001, p101],
  }

  const initialFaces = {
    front: true,
    back: true,
    left: false,
    right: true,
    top: true,
    bottom: true,
  }

  const planeOnDim = {
    front: 2,
    back: 2,
    left: 0,
    right: 0,
    top: 1,
    bottom: 1,
  }

  const padFactor = 1 - padding * 2
  const pad = (p) => p * padFactor + padding

  Object.keys(sides).forEach((side) => {
    const dim = planeOnDim[side]
    const points = sides[side].map(vector => {
      const vecPadded = vector.map((p, i) => i == dim ? p : pad(p));
      return getVectorRotationTrajectoryOnScreen(vecPadded, theta, axis);
    })

    createClipKeyframe(side, points, initialFaces[side], padding)
  })
}
