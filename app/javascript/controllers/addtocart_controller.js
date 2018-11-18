import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "select", "button" ]

  add() {
    event.preventDefault();
    const id = this.element.dataset.garmentid
    const size = this.selectTarget.value
    console.log(`adding ${id}[${size}] to cart`)

    this.buttonTarget.innerText = `a ${size} was added`
    this.buttonTarget.disabled = true
  }
}
