import { TodoListState, TodoObject } from './types';

// export function filterTodos(
//   todos: TodoObject[],
//   todoListState: TodoListState,
// ): TodoObject[] {
//   return todos.filter((item) => {
//     if (todoListState === TodoListState.ALL) {
//       return true;
//     } else if (
//       todoListState === TodoListState.ACTIVE &&
//       item.completed === false
//     ) {
//       return true;
//     } else if (
//       todoListState === TodoListState.COMPLETED &&
//       item.completed === true
//     ) {
//       return true;
//     }
//     return false;
//   });
// }

export function filterTodos(
  todos: TodoObject[],
  todoListState: TodoListState,
): TodoObject[] {
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
