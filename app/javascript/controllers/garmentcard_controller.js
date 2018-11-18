import { Controller } from "stimulus"

export default class extends Controller {
  display() {
    console.log("Displaying image!");
    var img = this.element.dataset.img;
    // displayImage(img);
    document.querySelector('body').style.backgroundImage = "url('" + img + "')";
  }

  hide() {
    console.log("hiding image");
    document.querySelector('body').style.backgroundImage = "";
  }
}
