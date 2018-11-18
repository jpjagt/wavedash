import { Controller } from "stimulus"

export default class extends Controller {
  display() {
    var img = this.element.dataset.img;
    document.querySelector('body').style.backgroundImage = "url('" + img + "')";
  }

  hide() {
    document.querySelector('body').style.backgroundImage = "";
  }
}
