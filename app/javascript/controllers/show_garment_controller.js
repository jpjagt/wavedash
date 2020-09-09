import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "thumbnail", "header", "images" ]

  padHeader () {
    const padding = `${this.headerTarget.offsetHeight}px`
    this.thumbnailTarget.style.marginBottom = padding
    this.imagesTarget.style.paddingBottom = padding
  }
}
