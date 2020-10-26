import * as THREE from 'three'
import disposeScene from './disposeScene'

class Scene {
  constructor() {
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.rerender()
  }

  render () { this.renderer.render(this.scene, this.camera) }
  rerender () { this.renderer.render(this.scene, this.camera) }

  initEnv () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )

    const container = document.querySelector('.tunnel-canvas')
    container.appendChild( renderer.domElement )

    this.scene = scene
    this.renderer = renderer
    this.camera = camera

    window.addEventListener( 'resize', this.onWindowResize, false )
  }

  cleanEnv () {
    this.renderer.dispose()
    disposeScene(this.scene)
  }

  deactivate () {
    // clean up the environment
    this.cleanEnv()
    window.removeEventListener( 'resize', this.onWindowResize )
  }
}

export default Scene
