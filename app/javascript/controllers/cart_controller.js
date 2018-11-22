import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "subtotal" ]

  update_subtotal = (amount) => {
    const subtotal = parseInt(this.subtotalTarget.innerText.slice(1)) + amount;
    this.subtotalTarget.innerText = `$${subtotal.toFixed(2)}`
  }

  get linkToCartController() {
    const cart = document.getElementById("link-to-cart")
    return this.application.getControllerForElementAndIdentifier(cart, "link-to-cart")
  }
}
