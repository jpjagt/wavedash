import * as THREE from 'three'
import { isString } from '../utils'

const parseColor = (color) => {
  if (isString(color) && color[0] === '#') {
    return parseInt(color.slice(1), 16)
  }

  return color
}

export default (colors) => {
  const mappedColors = {}

  const get = (name) => mappedColors[name]
  const add = (name, color) => mappedColors[name] = new THREE.Color(parseColor(color))

  Object.keys(colors).forEach(name => add(name, colors[name]))

  return {
    get,
    add
  }
}
