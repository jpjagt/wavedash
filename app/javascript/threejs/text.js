import * as THREE from 'three'
import { padaukJsonPath } from '../assets'

export const materials = {
  black: new THREE.MeshBasicMaterial({ color: 0x000000 }),
  white: new THREE.MeshBasicMaterial({ color: 0xffffff }),
}

export const sizes = {
  h3: 0.05,
}

const loader = new THREE.FontLoader()
let loading = false
let loadedFont = null
let onLoadQueue = []

const startLoader = () => {
  loading = true
  loader.load(padaukJsonPath, (font) => {
    onLoadQueue.forEach(fn => fn(font))
    onLoadQueue = []
    loading = false
    loadedFont = font
  })
}

export const requestCreateText = (text, params = {}) => new Promise((resolve, reject) => {
  if (loadedFont) {
    resolve(new THREE.TextGeometry(text, { font: loadedFont, ...params }))
  } else {
    onLoadQueue.push((font) => {
      resolve(new THREE.TextGeometry(text, { font, ...params }))
    })

    !loading && startLoader()
  }
})

export const textToMesh = (text, material) => {
  const textGeo = new THREE.BufferGeometry().fromGeometry(text)
	return new THREE.Mesh(textGeo, material)
}
