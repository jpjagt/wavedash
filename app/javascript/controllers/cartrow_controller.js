import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "quantity", "subtotal" ]

  update_subtotal = (amount) => {
    this.subtotalTarget.innerText = `$${amount.toFixed(2)}`
  }

  update = (quantity) => {
    const size = this.data.get("size")
    const url = this.data.get("url")

    fetch_post(url, { size: size, quantity: quantity })
      .then(response => response.json())
      .then(data => {
        if (data.added) {
          this.quantityTarget.innerText = data.item_quantity
          this.linkToCartController.increase(quantity)

          const price = this.data.get("price")
          this.update_subtotal(price * data.item_quantity)
          this.cartController.update_subtotal(price * quantity)
        }
      })
  }

  increase = (event) => {
    this.update(1)
  }

  decrease = (event) => {
    this.update(-1)
  }

  get cartController() {
    const cart = document.getElementById("cart")
    return this.application.getControllerForElementAndIdentifier(cart, "cart")
  }

  get linkToCartController() {
    const linkToCart = document.getElementById("link-to-cart")
    return this.application.getControllerForElementAndIdentifier(linkToCart, "link-to-cart")
  }
}
