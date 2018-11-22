import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "count" ]

  connect() {
    this.setCount()
  }

  increase = () => {
    this.data.set("count", parseInt(this.data.get("count")) + 1)
    this.setCount()
  }

  setCount = () => {
    const count = this.data.get("count")
    const text = count > 0 ? `/${count}/` : ""
    this.countTarget.innerText = text;
  }
}
