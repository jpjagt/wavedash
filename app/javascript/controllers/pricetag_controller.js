import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "select", "button" ]

  connect() {
    console.log("hi")
  }

  add() {
    event.preventDefault()

    if (!this.buttonTarget.dataset.added) {
      const id = this.element.dataset.garmentid
      const size = this.selectTarget.value
      console.log(`adding ${id}[${size}] to cart`)

      this.buttonTarget.innerText = `a ${size} was added`
      this.buttonTarget.dataset.added = true
    }
  }
}
