//= require rails-ujs
//= require_tree .


const hovercards = document.querySelectorAll('.hovercard');
const body = document.querySelector('body');

hovercards.forEach((elem) => {
  elem.addEventListener("mouseenter", function(event) {
    const img = event.target.dataset.img;
    body.style.backgroundImage = `url('${img}')`;
  });
  elem.addEventListener("mouseleave", function(event) {
    body.style.background = "";
  });
});
