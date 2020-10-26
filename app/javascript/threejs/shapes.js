import * as THREE from 'three'

export const tunnelShape = (width, height, depth, materials) => {
  const widthOffset = width * 0.5
  const heightOffset = height * 0.5
  const depthOffset = depth * 0.5
  const depthReps = parseInt(depth / width)

  const planeGeometry = new THREE.PlaneGeometry(width, height)

  const cuboid = new THREE.Group()

  const tile = (mesh, reps, fn) => {
    return Array.from(Array(reps).keys(), (_, i) => {
      const newMesh = mesh.clone(false)
      fn(newMesh, i)
      return newMesh
    })
  }

  const materialsArray = materials instanceof Array ? materials : [materials]
  const getMaterial = (index) => materialsArray[index % materialsArray.length]

  const right = new THREE.Mesh(planeGeometry, getMaterial(0))
  right.position.x = widthOffset
  right.rotateX(-Math.PI / 2)
  right.rotateY(-Math.PI / 2)

  const left = new THREE.Mesh(planeGeometry, getMaterial(1))
  left.position.x = -widthOffset
  left.rotateX(-Math.PI / 2)
  left.rotateY(Math.PI / 2)

  const top = new THREE.Mesh(planeGeometry, getMaterial(2))
  top.position.y = heightOffset
  top.rotateX(Math.PI / 2)

  const bottom = new THREE.Mesh(planeGeometry, getMaterial(3))
  bottom.position.y = -heightOffset
  bottom.rotateX(-Math.PI / 2)

  const back = new THREE.Mesh(planeGeometry, getMaterial(4))
  back.position.z = -depthOffset

  const sides = [right, left, top, bottom].map(side => (
    tile(side, depthReps, (mesh, i) => {
      mesh.position.z = -depthOffset + widthOffset + i * width
    })
  ))

  cuboid.add(back, ...[].concat(...sides))
  return cuboid
}
