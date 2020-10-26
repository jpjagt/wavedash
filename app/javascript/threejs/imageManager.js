import * as THREE from 'three'

import ImageMesh from './ImageMesh'
import { isArray } from '../utils'

const applyToValue = (value, fn) => {
  if (isArray(value)) {
    return value.map(fn)
  }

  return fn(value)
}

export default (imageSrcs, defaultImageClass=ImageMesh) => {
  const loader = new THREE.TextureLoader()
  const get = (key, cls=defaultImageClass) => applyToValue(imageSrcs[key], (src) => new cls(src, loader))

  return {
    get,
  }
}
