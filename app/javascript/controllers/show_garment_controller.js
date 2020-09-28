import { Controller } from "stimulus"
import { deactivateTunnel, activateTunnel } from '../tunnel'

export default class extends Controller {
  static targets = [ "thumbnail", "header", "images", "structure" ]

  connect () {
  	this.activateTunnel()
  }

  disconnect () {
  	this.deactivateTunnel()
  }

  activateTunnel () {
    activateTunnel()
  }

  deactivateTunnel () {
    deactivateTunnel()
  }
}
