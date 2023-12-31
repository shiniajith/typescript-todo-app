import { v4 as uuidv4 } from 'uuid';

import { AppState, TodoListState } from './types';
import { filterTodos } from './utils';
import confetti from 'canvas-confetti';

const APP_STATE: AppState = {
  todoListState: TodoListState.ALL,
  todos: [],
};

function init() {
  const dataFromStore = localStorage.getItem('APP_STATE');
  if (dataFromStore !== null) {
    const parsedAppState = JSON.parse(dataFromStore) as AppState;
    APP_STATE.todoListState = parsedAppState.todoListState;
    APP_STATE.todos = parsedAppState.todos;
  } else {
    localStorage.setItem('APP_STATE', JSON.stringify(APP_STATE));
  }

  updateUi();
}

function syncStateAndrerender() {
  localStorage.setItem('APP_STATE', JSON.stringify(APP_STATE));
  updateUi();
}

const ulPageElm = document.querySelector<HTMLUListElement>(
  '#ul-item',
) as HTMLUListElement;

function updateUi() {
  updateUiTodo();
  updateUiBtn();
}

function updateUiBtn() {
  const allBtn = document.querySelector<HTMLButtonElement>(
    '#all',
  ) as HTMLButtonElement;
  const activeBtn = document.querySelector<HTMLButtonElement>(
    '#active',
  ) as HTMLButtonElement;
  const completedBtn = document.querySelector<HTMLButtonElement>(
    '#completed',
  ) as HTMLButtonElement;

  allBtn.disabled = false;
  activeBtn.disabled = false;
  completedBtn.disabled = false;

  switch (APP_STATE.todoListState) {
    case TodoListState.ALL:
      allBtn.disabled = true;
      break;
    case TodoListState.ACTIVE:
      activeBtn.disabled = true;
      break;
    case TodoListState.COMPLETED:
      completedBtn.disabled = true;
  }
}

function updateUiTodo(): void {
  ulPageElm.innerHTML = '';
  const filteredTodos = filterTodos(APP_STATE.todos, APP_STATE.todoListState);

  filteredTodos.forEach((item, index) => {
    const listItemElm = document.createElement('li');
    listItemElm.classList.add('list-group-item', 'todo-item');

    const checkBoxElm = document.createElement('input');
    checkBoxElm.classList.add('form-check-input', 'big-checkbox', 'me-5');
    checkBoxElm.type = 'checkbox';
    checkBoxElm.id = `inlineCheckbox2-${item.id}`;
    checkBoxElm.addEventListener('change', () => {
      item.completed = !item.completed;
      syncStateAndrerender();
      if (item.completed) {
        myConfetti({
          particleCount: 200,
          spread: 160,
        });
      }
    });

    if (item.completed) {
      checkBoxElm.checked = true;
    }

    const labelElm = document.createElement('label');
    labelElm.setAttribute('for', `inlineCheckbox2-${item.id}`);
    labelElm.classList.add('form-check-label', 'check-label');
    labelElm.textContent = item.title;

    listItemElm.append(checkBoxElm, labelElm);
    ulPageElm?.append(listItemElm);
  });
}

const inputElm = document.querySelector<HTMLInputElement>(
  '#todo-text',
) as HTMLInputElement;
inputElm.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 || e.key === 'Enter') {
    const todoText = {
      id: uuidv4(),
      title: inputElm.value,
      completed: false,
      createdAt: new Date(),
    };
    inputElm.value = '';
    APP_STATE.todos.push(todoText);
    syncStateAndrerender();
  }
});

document
  .querySelector<HTMLButtonElement>('#all')
  ?.addEventListener('click', (e) => {
    APP_STATE.todoListState = TodoListState.ALL;
    syncStateAndrerender();
  });
document
  .querySelector<HTMLButtonElement>('#clear')
  ?.addEventListener('click', (e) => {
    APP_STATE.todos = [];
    syncStateAndrerender();
  });
document
  .querySelector<HTMLButtonElement>('#active')
  ?.addEventListener('click', (e) => {
    APP_STATE.todoListState = TodoListState.ACTIVE;
    syncStateAndrerender();
  });
document
  .querySelector<HTMLButtonElement>('#completed')
  ?.addEventListener('click', (e) => {
    APP_STATE.todoListState = TodoListState.COMPLETED;
    syncStateAndrerender();
  });

init(); //first call when page is first loaded
const canvasElm = document.querySelector('#canvas-confetti');
const myConfetti = confetti.create(canvasElm as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
});
