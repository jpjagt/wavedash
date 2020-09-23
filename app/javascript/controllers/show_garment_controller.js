import { Controller } from "stimulus"
import { activateTunnel } from '../tunnel'

export default class extends Controller {
  static targets = [ "thumbnail", "header", "images", "structure" ]

  padHeader () {
    const padding = `${this.headerTarget.offsetHeight}px`
    this.thumbnailTarget.style.marginBottom = padding
    this.imagesTarget.style.paddingBottom = padding
  }

  activateTunnel () {
    activateTunnel()
  }
}
