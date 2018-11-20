import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "select", "button" ]

  reset = () => {
    this.buttonTarget.innerText = "add another one?"
    this.buttonTarget.classList.remove("active")
    this.data.delete("added")
  }

  add() {
    event.preventDefault()

    if (!this.data.get("added")) {
      const id = this.data.get("garment-id")
      const size = this.selectTarget.value
      console.log(`adding ${id}[${size}] to cart`)

      this.buttonTarget.innerText = `a ${size} was added`
      this.buttonTarget.classList.add("active")
      this.data.set("added", true)
      this.cartController.increase();

      setTimeout(this.reset, 2500);
    }
  }

  get cartController() {
    const cart = document.getElementById("cart")
    return this.application.getControllerForElementAndIdentifier(cart, "cart")
  }
}
