const clock = document.querySelector('.status'),
  h1 = clock.querySelector('h1'),
  h2 = clock.querySelector('h2');

function getTime() {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  h2.innerText = `${hours < 10 ? `0${hours} ` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();