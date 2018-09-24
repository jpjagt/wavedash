//= require rails-ujs
//= require_tree .


var hovercards = document.querySelectorAll('.hovercard');
var body = document.querySelector('body');

hovercards.forEach(function(elem) {
  elem.addEventListener("mouseenter", function(event) {
    var img = event.target.dataset.img;
    body.style.backgroundImage = `url('${img}')`;
  });
  elem.addEventListener("mouseleave", function(event) {
    body.style.background = "";
  });
});
