import {TodoListState} from "./types.js";
export function filterTodos(todos, todoListState) {
  return todos.filter((item) => {
    switch (todoListState) {
      case TodoListState.ALL:
        return true;
      case TodoListState.ACTIVE:
        return item.completed === false;
      case TodoListState.COMPLETED:
        return item.completed === true;
    }
  });
}
