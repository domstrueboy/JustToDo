import { IState, ITodoItem, TodoItem } from '../models';

export default {
  mutations: {
    addTodoItem(state: IState, { title }: ITodoItem): void {
      const todoItem = new TodoItem({ title });
      state.lists[state.currentListId].items.push(todoItem);
    },
  },
};
