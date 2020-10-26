import * as THREE from 'three'

import ImageMesh from './ImageMesh'

class ImageMeshWithBorder extends ImageMesh {
  constructor (src, loader) {
    super(src, loader)
  }

  setBorder = (color, thickness, depth=0.1) => {
    this._borderColor = color
    this._borderThickness = thickness
    this._borderDepth = depth
  }

  _ensureMesh = () => {
    if (Boolean(this._mesh))
      return

    this._ensureGeometry()
    this._ensureMaterial()

    this._mesh = new THREE.Mesh(this._geometry, this._material)

    const geometrySize = this._geometry.parameters
    const width = geometrySize.width + this._borderThickness * 2
    const height = geometrySize.height + this._borderThickness * 2

    const geometry = new THREE.BoxGeometry(width, height, this._borderDepth)
    const material = new THREE.MeshBasicMaterial({
      color: this._borderColor,
    })
    this._borderMesh = new THREE.Mesh(geometry, material)
    this._borderMesh.scale.set(...Object.values(this._mesh.scale))
    /* const position = this._mesh.position.clone()
     * position.z -= this._borderDepth
     * console.log(position)
     * this._borderMesh.position.set(position) */
    this._borderMesh.position.z -= this._borderDepth * 0.55

    const group = new THREE.Group()
    group.add(this._mesh, this._borderMesh)
    this._mesh = group
  }
}

export default ImageMeshWithBorder
