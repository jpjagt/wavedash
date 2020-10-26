import { Controller } from "stimulus"
import * as scenes from '../scenes'

const garment2scene = {
  'televeyeze-blue': {
    scene: 'TiledTunnelScene',
    args: {
      bgColor: '#60D6F0',
      edgeColor: '#E46335',
      textColor: '#0E3DAA',
    },
  },
  'televeyeze-pink': {
    scene: 'TiledTunnelScene',
    args: {
      // bgColor: '#f2d4e7',
      bgColor: '#9c162d',
      edgeColor: '#E95873',
      textColor: '#ffffff',
    },
  },
}

const parseHTMLHex = (str) => parseInt(str.slice(1), 16)

export default class extends Controller {
  static targets = [ "thumbnail", "header", "images", "structure" ]

  garmentSlug = () => this.data.get('slug')

  connect () {
    this.activateScene()
  }

  disconnect () {
    this.deactivateScene()
  }

  activateScene () {
    const slug = this.garmentSlug()
    const data = garment2scene[slug]
    this.scene = new (scenes[data.scene])({
      ...JSON.parse(this.data.get('args')),
      ...data.args
    })
    this.scene.activate()
  }

  deactivateScene () {
    this.scene.deactivate()
    this.scene = null
  }
}
