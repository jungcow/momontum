const body = document.querySelector('body');

const IMAGE_NUMBER = 4;

function paintImage(num) {
  const image = new Image();
  image.src = `images/${num}.jpg`;
  image.classList.add('bgImage');
  body.appendChild(image);
}

function init() {
  const randomNumber = Math.ceil(Math.random() * IMAGE_NUMBER);
  paintImage(randomNumber);
}

init();
