import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "select", "button" ]

  reset = () => {
    this.buttonTarget.innerText = "add another one?"
    this.buttonTarget.classList.remove("active")
    this.data.delete("added")
  }

  added = (size) => {
    this.buttonTarget.innerText = `a ${size} was added`
    this.buttonTarget.classList.add("active")
    this.data.set("added", true)
    this.linkToCartController.increase()

    setTimeout(this.reset, 2500)
  }

  add() {
    event.preventDefault()

    console.log("Adding...")

    if (!this.data.get("added")) {
      const size = this.selectTarget.value

      fetch_post(this.data.get("url"), { size: size })
        .then(response => response.json())
        .then(data => {
          if (data.added) {
            this.added(size)
          }
        })
    }
  }

  get linkToCartController() {
    const cart = document.getElementById("link-to-cart")
    return this.application.getControllerForElementAndIdentifier(cart, "link-to-cart")
  }
}
