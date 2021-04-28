import {
  ITodoItem,
  TodoItem,
  IState,
  ITab,
} from './models';

const defaultState: IState = {
  currentListId: 'list1',
  lists: {
    list1: {
      title: 'List 1',
      description: 'List description 1',
      items: [
        {
          title: 'Todo 1',
          description: 'Todo description 1',
          done: false,
          repeat: false,
          createTime: 0,
          editTime: 0,
        },
      ],
    },
    list2: {
      title: 'List 2',
      description: '',
      items: [],
    },
  },
};

export default {
  state(): IState {
    return defaultState;
  },
  getters: {
    tabs(state: IState): ITab[] {
      return Object.keys(state.lists).map((key) => ({
        id: key,
        title: state.lists[key].title,
        description: state.lists[key].description,
      }));
    },
  },
  mutations: {
    addTodo(state: IState, { title }: ITodoItem): void {
      const todoItem = new TodoItem({ title });
      state.lists[state.currentListId].items.push(todoItem);
    },
    setCurrentListId(state: IState, id: string): void {
      state.currentListId = id;
    },
  },
};
