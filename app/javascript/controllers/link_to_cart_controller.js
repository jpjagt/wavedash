import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "count" ]

  connect() {
    this.setCount()
  }

  increase = (i = 1) => {
    this.data.set("count", parseInt(this.data.get("count")) + i)
    this.setCount()
  }

  setCount = () => {
    const count = this.data.get("count")
    const text = count > 0 ? `/${count}/` : ""
    this.countTarget.innerText = text;
  }
}
