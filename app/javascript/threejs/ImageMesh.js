import * as THREE from 'three'

class ImageMesh {
  constructor(src, loader) {
    this.src = src
    this.loader = loader
  }

  load = (onLoad) => {
    this.loader.load(this.src, (texture) => {
      this._texture = texture
      onLoad(this)
    })
  }

  mesh = () => {
    this._ensureMesh()

    return this._mesh
  }

  setScaleOfSmallestDimension = (size) => {
    const image = this._texture.image

    if ((image.width / image.height) <= 1) {
      this.setScale(size, null)
    } else {
      this.setScale(null, size)
    }
  }

  setScaleOfLargestDimension = (size) => {
      const image = this._texture.image

      if ((image.width / image.height) > 1) {
      this.setScale(size, null)
    } else {
      this.setScale(null, size)
    }
  }

  parseScaleSize = (width, height) => {
    if (width === null && height === null)
      throw 'You should pass either width or height'

    if (width !== null && height !== null)
      return [width, height]

    const image = this._texture.image

    if (width === null) {
      return [height * image.width / image.height, height]
    } else {
      return [width, width * image.height / image.width]
    }
  }

  setPosition = (x, y, z) => {
    this._mesh.position.set(x, y, z)
  }

  setScale = (width, height) => {
    this._ensureMesh()
    this._mesh.scale.set(...this.parseScaleSize(width, height))
  }

  _ensureGeometry = () => {
    if (Boolean(this._geometry))
      return

    this._geometry = new THREE.PlaneGeometry(1, 1)
  }

  _ensureMaterial = () => {
    if (Boolean(this._material))
      return

    this._material = new THREE.MeshBasicMaterial({
      map: this._texture
    })
  }

  _ensureMesh = () => {
    if (Boolean(this._mesh))
      return

    this._ensureGeometry()
    this._ensureMaterial()

    this._mesh = new THREE.Mesh(this._geometry, this._material)
  }
}

export default ImageMesh
