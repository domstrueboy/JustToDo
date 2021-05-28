import { IState, ITodoItem, TodoItem } from '../models';

export default {
  mutations: {
    addTodoItem(state: IState, { title }: ITodoItem): void {
      const todoItem = new TodoItem({ title });
      state.lists[state.currentListId].items.push(todoItem);
    },
    removeTodoItem(state: IState, { id }: { id: string }): void {
      const { items } = state.lists[state.currentListId];
      const index = items.findIndex((item) => item.id === id);
      items.splice(index, 1);
    },
    editListDescription(state: IState, newDesc: string): void {
      const foundItem = state.lists[state.currentListId];
      if (foundItem) foundItem.description = newDesc;
    },
  },
};
