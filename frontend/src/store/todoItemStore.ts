import { IState } from '../models';

export default {
  mutations: {
    toggleDone(state: IState, id: string): void {
      const foundItem = state.lists[state.currentListId].items.find((item) => item.id === id);
      if (foundItem) foundItem.done = !foundItem.done;
    },
    editTitle(state: IState, { id, newTitle }: { id: string, newTitle: string }): void {
      const foundItem = state.lists[state.currentListId].items.find((item) => item.id === id);
      if (foundItem) foundItem.title = newTitle;
    },
    editDescription(state: IState, { id, newDesc }: { id: string, newDesc: string }): void {
      const foundItem = state.lists[state.currentListId].items.find((item) => item.id === id);
      if (foundItem) foundItem.description = newDesc;
    },
  },
};
