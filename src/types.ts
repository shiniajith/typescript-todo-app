export interface TodoObject {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export enum TodoListState {
  ALL,
  ACTIVE,
  COMPLETED,
}

export interface AppState {
  todoListState: TodoListState;
  todos: TodoObject[];
}
