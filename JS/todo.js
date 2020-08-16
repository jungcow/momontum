
const toDoContainer = document.querySelector('.container'),
  notStarted = toDoContainer.querySelector('.notStarted__container'),
  inProgress = toDoContainer.querySelector('.inProgress__container'),
  complete = toDoContainer.querySelector('.complete__container'),
  toDoForm = document.querySelector('.notStarted__form'),
  toDoInput = toDoForm.querySelector('input'),
  doingForm = document.querySelector('.inProgress__form'),
  doingInput = doingForm.querySelector('input');

const TODOS_LS = 'todos';
const DOING_LS = 'doing';
const DONE_LS = 'done';
let TODOS_LIST = [];
let DOING_LIST = [];
let DONE_LIST = [];

function saveLocal(where, what) {
  localStorage.setItem(where, JSON.stringify(what));
}

function deleteToDo(e) {
  const clickedBox = e.target.parentNode;
  const cleanToDos = TODOS_LIST.filter(e => e.id !== clickedBox.id);
  TODOS_LIST = cleanToDos;
  notStarted.removeChild(clickedBox);
  saveLocal(TODOS_LS, TODOS_LIST);
}

function deleteDoing(e) {
  const clickedBox = e.target.parentNode;
  const cleanDoing = DOING_LIST.filter(e => e.id !== clickedBox.id);
  DOING_LIST = cleanDoing;
  inProgress.removeChild(clickedBox);
  saveLocal(DOING_LS, DOING_LIST);
}

function startToDo(e) {
  const event = e;
  const clickedBox = e.target.parentNode;
  deleteToDo(event);
  const doingObj = {
    title: clickedBox.childNodes[0].innerText,
    created: clickedBox.childNodes[1].innerText
  }
  paintDoing(doingObj);
}

function paintToDos(toDos) {
  const box = document.createElement("div");
  const title = document.createElement('h3');
  const createDate = document.createElement('h4');
  const delBtn = document.createElement('button');
  const startBtn = document.createElement('button');
  title.innerText = toDos.title;
  createDate.innerText = toDos.created;
  delBtn.innerText = '❌';
  startBtn.innerText = '✅';
  delBtn.classList.add('delete');
  startBtn.classList.add('check');
  box.appendChild(title);
  box.appendChild(createDate);
  box.appendChild(delBtn);
  box.appendChild(startBtn);
  notStarted.appendChild(box);
  const uuid = Math.random().toString(16).slice(3);
  box.className = 'container__box';
  box.id = uuid;
  const object = {
    id: uuid,
    title: toDos.title,
    created: toDos.created
  };
  TODOS_LIST.push(object);
  saveLocal(TODOS_LS, TODOS_LIST);
  delBtn.addEventListener('click', deleteToDo);
  startBtn.addEventListener('click', startToDo);
}

function deleteDone(e) {
  const clickedBox = e.target.parentNode;
  console.log(clickedBox);
  const cleanDone = DONE_LIST.filter(e => e.id !== clickedBox.id);
  DONE_LIST = cleanDone;
  complete.removeChild(clickedBox);
  saveLocal(DONE_LS, DONE_LIST);
}

function previousDone(e) {
  const event = e;
  const clickedBox = e.target.parentNode;
  deleteDone(event);
  const doingObj = {
    title: clickedBox.childNodes[0].innerText,
    created: clickedBox.childNodes[1].innerText
  }
  paintDoing(doingObj);
}

function paintDone(done) {
  const box = document.createElement("div");
  const title = document.createElement('h3');
  const createDate = document.createElement('h4');
  const delBtn = document.createElement('button');
  const prevBtn = document.createElement('button');
  title.innerText = done.title;
  createDate.innerText = done.created;
  delBtn.innerText = '⭕️';
  prevBtn.innerText = '⬅️';
  delBtn.classList.add('check');
  prevBtn.classList.add('previous');
  box.appendChild(title);
  box.appendChild(createDate);
  box.appendChild(delBtn);
  box.appendChild(prevBtn);
  complete.appendChild(box);
  const uuid = Math.random().toString(16).slice(3);
  box.className = 'container__box';
  box.id = uuid;
  const object = {
    id: uuid,
    title: done.title,
    created: done.created
  };
  DONE_LIST.push(object);
  saveLocal(DONE_LS, DONE_LIST);
  delBtn.addEventListener('click', deleteDone);
  prevBtn.addEventListener('click', previousDone);
}

function loadContents() {
  const loadedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
  if (loadedToDos) {
    loadedToDos.forEach(e => paintToDos(e));
  }
  const loadedDoing = JSON.parse(localStorage.getItem(DOING_LS));
  if (loadedDoing) {
    loadedDoing.forEach(e => paintDoing(e));
  }
  const loadedDone = JSON.parse(localStorage.getItem(DONE_LS));
  if (loadedDone) {
    loadedDone.forEach(e => paintDone(e));
  }
}

function handleToDo(e) {
  e.preventDefault();
  if (TODOS_LIST.length + 1 > 5) {
    alert('You can only put in five.')
    toDoInput.value = '';
  } else {
    const toDo = toDoInput.value;
    const date = new Date();
    console.log(date);
    const years = date.getFullYear();
    const months = date.getMonth() + 1;
    console.log(months);
    const day = date.getDate();
    const createdDate = `${years}. ${months}. ${day}`;
    const toDoObj = {
      title: toDo,
      created: createdDate
    }
    console.log(toDoObj.created);
    paintToDos(toDoObj);
    toDoInput.value = '';
  }
}

function previousDoing(e) {
  const event = e;
  const clickedBox = e.target.parentNode;
  deleteDoing(event);
  const toDoObj = {
    title: clickedBox.childNodes[0].innerText,
    created: clickedBox.childNodes[1].innerText
  }
  paintToDos(toDoObj);
}

function finishDoing(e) {
  const event = e;
  const clickedBox = e.target.parentNode;
  deleteDoing(event);
  const doneObj = {
    title: clickedBox.childNodes[0].innerText,
    created: clickedBox.childNodes[1].innerText
  }
  paintDone(doneObj);
}

function paintDoing(doing) {
  const box = document.createElement("div");
  const title = document.createElement('h3');
  const createDate = document.createElement('h4');
  const delBtn = document.createElement('button');
  const prevBtn = document.createElement('button');
  const finishBtn = document.createElement('button');
  title.innerText = doing.title;
  createDate.innerText = doing.created;
  delBtn.innerText = '❌';
  prevBtn.innerText = '⬅️';
  finishBtn.innerText = '✅';
  delBtn.classList.add('delete');
  prevBtn.classList.add('previous');
  finishBtn.classList.add('check');
  box.appendChild(title);
  box.appendChild(createDate);
  box.appendChild(delBtn);
  box.appendChild(prevBtn);
  box.appendChild(finishBtn);
  inProgress.appendChild(box);
  const uuid = Math.random().toString(16).slice(3);
  box.className = 'container__box';
  box.id = uuid;
  const object = {
    id: uuid,
    title: doing.title,
    created: doing.created
  };
  DOING_LIST.push(object);
  saveLocal(DOING_LS, DOING_LIST);
  delBtn.addEventListener('click', deleteDoing);
  prevBtn.addEventListener('click', previousDoing)
  finishBtn.addEventListener('click', finishDoing);
}

function handleDoing(e) {
  e.preventDefault();
  if (DOING_LIST.length + 1 > 5) {
    alert('You can only put in five.')
    doingInput.value = '';
  } else {
    const doing = doingInput.value;
    const date = new Date();
    const years = date.getFullYear();
    const months = date.getMonth() + 1;
    const day = date.getDate();
    const createdDate = `${years}. ${months}. ${day}`;
    const doingObj = {
      title: doing,
      created: createdDate
    }
    paintDoing(doingObj);
    doingInput.value = '';
  }
}

function init() {
  loadContents()
  toDoForm.addEventListener('submit', handleToDo);
  doingForm.addEventListener('submit', handleDoing);
}

init();