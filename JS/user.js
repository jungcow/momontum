const userContainer = document.querySelector('.js-user'),
  userForm = userContainer.querySelector('form'),
  userInput = userForm.querySelector('input'),
  greetingUser = userContainer.querySelector('h2');

const USER_LS = 'currentUser';
const SHOW_CN = 'showing';

function paintUser(user) {
  userForm.classList.remove(SHOW_CN);
  greetingUser.classList.add(SHOW_CN);
  greetingUser.classList.add('userName');
  greetingUser.innerText = `Have a nice day ${user}!`;
}

function handleSubmit(e) {
  e.preventDefault();
  const currentUser = userInput.value;
  localStorage.setItem(USER_LS, currentUser);
  paintUser(currentUser);
}

function getUser() {
  userForm.classList.add(SHOW_CN);
  greetingUser.classList.remove(SHOW_CN);
  userForm.addEventListener('submit', handleSubmit);
}

function loadUser() {
  const loadedUser = localStorage.getItem(USER_LS);
  loadedUser ? paintUser(loadedUser) : getUser();
}

loadUser();