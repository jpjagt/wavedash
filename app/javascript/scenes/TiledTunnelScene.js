/*
   - animate: https://ryannjohnson.github.io/tutorial-chromebookplaystore-webgl/
   - bs button w raycasting: https://codepen.io/peterschmiz/pen/BjWEgz?editors=0110
   - https://github.com/jasonChen1982/three.interaction.js
   - https://github.com/pablanka/threejs-hotspots
 */

import * as THREE from 'three'
import { Interaction } from 'three.interaction'

import Scene from './Scene'
import * as movementHandler from './movementHandler'
import colorManager from '../threejs/colorManager'
import imageManager from '../threejs/imageManager'
import ImageMeshWithBorder from '../threejs/ImageMeshWithBorder'

import { createGridTexture, createRadialGradientTexture } from '../threejs/textures'
import { tunnelShape } from '../threejs/shapes'
import * as text from '../threejs/text'

import animator from '../threejs/animator'
import AnimationStateManager from '../animejs/AnimationStateManager'
import nestedAnimation from '../animejs/nestedAnimation'

class TiledTunnelScene extends Scene {
  constructor(args) {
    super()

    this.size = 2
    this.tunnelScale = 5

    this.imageManager = imageManager(args.images)

    this.colors = colorManager({
      bg: args.bgColor,
      edge: args.edgeColor,
      text: args.textColor,
    })

    const edgeDark = this.colors.get('edge').clone()
    edgeDark.multiplyScalar(0.8)
    this.colors.add('edgeDark', edgeDark)
  }

  createLights = () => {
    const light = new THREE.PointLight(0xfffff0, 1.1, 4 * this.size * this.tunnelScale * 0.3, 1)
    light.position.set(0, 0, 0.5)
    this.scene.add(light)

    const ambientLight = new THREE.AmbientLight( 0xbbbbbb ) // soft white light
    this.scene.add(ambientLight)
  }

  createBackground = () => {
    const bgBox = new THREE.BoxGeometry(100 * this.size, 100 * this.size, 100 * this.size)
    const bgTexture = createRadialGradientTexture([
      [0, this.colors.get('edge')],
      [0.5, this.colors.get('edge')],
      [1, this.colors.get('edgeDark')]
    ])
    const bgMat = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.BackSide,
    })
    this.bgMesh = new THREE.Mesh(bgBox, bgMat)
    this.bgMesh.position.set(0, 0, -10 * this.size)
    this.scene.add(this.bgMesh)
  }

  createTunnel = () => {
    const material = new THREE.MeshStandardMaterial({
      color: this.colors.get('bg'),
      transparent: true,
      alphaMap: createGridTexture(
        new THREE.Color(0xffffff), new THREE.Color(0x000000)
      )
    })

    this.tunnel = tunnelShape(this.size * this.tunnelScale, this.size * this.tunnelScale, 100 * this.size, material)
  }

  createTunnelFace = () => {
    const getOnFaceImageLoad = (x, y) => (img) => {
      const mesh = img.mesh()
      mesh.position.set(x * this.size, y * this.size, this.facePlaneDepth)
      movementHandler.addOnUpdate((y) => {
        mesh.position.z = this.facePlaneDepth + (y * this.scrollSpeed * 0.2)
      })
      img.setScale(0.4 * this.size, null)
      this.tunnel.add(mesh)
      super.rerender()
    }

    const artistImage = this.imageManager.get('artist')
    artistImage.load(getOnFaceImageLoad(-0.3, -0.3))
    const thumbnailImage = this.imageManager.get('thumbnail')
    thumbnailImage.load(getOnFaceImageLoad(0.3, 0.3))

    text.requestCreateText('televeyeze pink', {
      size: text.sizes.h3 * this.size,
      height: 0.002 * this.size,
    })
      .then(textObj => {
        const textMesh = text.textToMesh(textObj, text.materials.black)
        textMesh.position.set(-0.4 * this.size, 0.4 * this.size, this.facePlaneDepth)
        this.tunnel.add(textMesh)
        super.rerender()
      })
  }

  getDepthFromScrollY = (y) => this.initialTunnelZ - (y * this.scrollSpeed)

  setProductImages = () => {
    const createToggleImageAnimation = (imageMesh) => {
      const scale = 2
      const animations = [
        {
          'scale.x': imageMesh.scale.x * scale,
          'scale.y': imageMesh.scale.y * scale,
          'position.x': 0.0001,
          'position.y': 0.0001,
        },
        {
          'scale.x': imageMesh.scale.x,
          'scale.y': imageMesh.scale.y,
          'position.x': imageMesh.position.x,
          'position.y': imageMesh.position.y,
        }
      ].map((animation) => animator(nestedAnimation(
        imageMesh, {}, animation
      ), () => super.rerender()))

      return new AnimationStateManager({
        easing: 'easeInOutQuart',
        duration: 400,
      }, animations)
    }

    this.imageManager.get('productImages', ImageMeshWithBorder).forEach((img, i) => {
      img.load((image) => {
        image.setBorder(this.colors.get('edge'), 0.025, 0.05)
        image.setScaleOfSmallestDimension(0.4 * this.size)
        const mesh = image.mesh()
        const imageZ = this.facePlaneDepth + (3 + 2 * i) * this.size

        const randomSign = (n) => (Math.random() < 0.5 ? -1 : 1) * n
        const edgeOfImage = 0.5 * this.size
        image.setPosition(
          randomSign(edgeOfImage - mesh.scale.x * 0.5),
          randomSign(edgeOfImage - mesh.scale.y * 0.5),
          imageZ
        )

        // three.interaction and animation onclick
        mesh.cursor = 'pointer'
        const asm = createToggleImageAnimation(mesh)
        mesh.on('click', () => {
          asm.next()
        })

        /* movementHandler.addOnUpdate((y) => {
         *   if (asm.getIndex() == 0) {
         *     if (Math.abs(-this.getDepthFromScrollY(y) - imageZ) < 0.6) {
         *       asm.next()
         *     }
         *   }
         * }) */

        this.tunnel.add(mesh)
        super.rerender()
      })
    })
  }

  createCTA = () => {
    text.requestCreateText('buy', {
      size: text.sizes.h3,
      height: 0.01,
    })
        .then(textObj => {
          const boxSize = 0.2
          const textMesh = text.textToMesh(textObj, text.materials.black)
          textMesh.position.z = boxSize

          const box = new THREE.Mesh(
            new THREE.BoxGeometry(boxSize, boxSize, boxSize),
            new THREE.MeshStandardMaterial({
              color: this.colors.get('edge'),
            })
          )

          const button = new THREE.Group()
          button.add(textMesh, box)
          console.log(this.facePlaneDepth)
          /*           button.position.set(0.5 - boxSize / 2, -(0.5 - boxSize / 2), (this.facePlaneDepth * 1.6)) */
          window.button = button

          this.scene.add(button)
          super.rerender()
      })
  }

  handleMovement = () => {
    const update = (y) => {
      this.tunnel.position.z = this.getDepthFromScrollY(y)
      super.rerender()
    }

    movementHandler.addOnUpdate(update)
    movementHandler.activate()
  }

  activate = () => {
    super.initEnv()
    this.interaction = new Interaction(this.renderer, this.scene, this.camera)

    this.depth = 50 * this.size
    this.startingDepth = 1.3 * this.size
    this.scrollSpeed = 0.005 * this.size

    this.facePlaneDepth = -this.depth + 0.01
    this.initialTunnelZ = this.depth - this.startingDepth

    this.createBackground()

    this.createTunnel()
    this.tunnel.position.set(0, 0, this.initialTunnelZ)
    this.scene.add(this.tunnel)
    this.createTunnelFace()

    this.createLights()

    this.setProductImages()

    this.createCTA()

    super.render()

    this.handleMovement()
  }

  deactivate = () => {
    movementHandler.deactivate()
    super.deactivate()
  }
}

export default TiledTunnelScene
