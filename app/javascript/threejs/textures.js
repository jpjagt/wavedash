import * as THREE from 'three'
import { getRGBValuesFromColor, colorToHexString } from './utils'

export const createGridTexture = (bgColor, edgeColor, repeat=null, length = 1200, borderGirthRatio = 0.015, edgeGirthRatio = 0.005) => {
  var borderGirth = parseInt(length * borderGirthRatio)
  var edgeGirth = parseInt(length * edgeGirthRatio)

  const width = length
  const height = length

  var size = width * height
  var gridLength = parseInt(length / 5)
  var data = new Uint8Array( 3 * size )

  var bgColorRGB = getRGBValuesFromColor(bgColor)
  var edgeColorRGB = getRGBValuesFromColor(edgeColor)

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var stride = (i * width + j) * 3

      var colors = bgColorRGB
      if ((i+1) % gridLength < edgeGirth || (j+1) % gridLength < edgeGirth || i < borderGirth || j < borderGirth || (width - i) < borderGirth || (width - j) < borderGirth) {
        colors = edgeColorRGB
      }

      data[ stride ] = colors[0]
      data[ stride + 1 ] = colors[1]
      data[ stride + 2 ] = colors[2]
    }
  }

  var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat )
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  if (repeat)
    texture.repeat.set(...repeat)

  return texture
}

export const createRadialGradientTexture = (colorStops, width=null, height=null) => {
	const defaultSize = 32
  const cwidth = width || defaultSize
  const cheight = height || defaultSize

	// create canvas
	const canvas = document.createElement('canvas')
	canvas.width = cwidth
	canvas.height = cheight

	// get context
	const context = canvas.getContext('2d')

	// draw gradient
	context.rect(0, 0, cwidth, cheight)
  const maxRadius = Math.max(cwidth, cheight) * 0.5
	const gradient = context.createRadialGradient(cwidth * 0.5, cheight * 0.5, 0, cwidth * 0.5, cheight * 0.5, maxRadius)
  colorStops.forEach(stop => gradient.addColorStop(stop[0], colorToHexString(stop[1])))
	context.fillStyle = gradient
	context.fill()

  // texture
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}
