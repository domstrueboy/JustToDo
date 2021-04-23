import {
  ITodoItem,
  TodoItem,
  // ITodoList,
  TodoList,
} from './models';

interface ITodos {
  [key: string]: TodoList;
}

interface IState {
  currentList: string;
  todos: ITodos;
}

const defaultState: IState = {
  currentList: 'list1',
  todos: {
    list1: {
      title: 'List 1',
      description: '',
      items: [],
    },
  },
};

export default {
  state(): IState {
    return defaultState;
  },
  mutations: {
    addTodo(state: IState, { title }: ITodoItem): void {
      const todoItem = new TodoItem({ title });
      state.todos[state.currentList].items.push(todoItem);
    },
  },
};
