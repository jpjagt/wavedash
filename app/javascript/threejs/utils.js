import * as THREE from 'three'

export const getRGBValuesFromColor = (color, factor=255) => {
  return ['r', 'g', 'b'].map(c => Math.floor( color[c] * factor ))
}

export const colorToHexString = (color) => {
  const threeColor = (color instanceof THREE.Color) ? color : new THREE.Color(color)
  return `#${threeColor.getHexString()}`
}
