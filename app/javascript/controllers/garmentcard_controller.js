import { Controller } from "stimulus"

export default class extends Controller {
  display() {
    var img = this.data.get("img");
    document.querySelector('body').style.backgroundImage = "url('" + img + "')";
  }

  hide() {
    document.querySelector('body').style.backgroundImage = "";
  }
}
