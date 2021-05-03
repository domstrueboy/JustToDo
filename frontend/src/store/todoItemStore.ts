import { IState } from '../models';

export default {
  mutations: {
    toggleDone(state: IState, id: string): void {
      const foundItem = state.lists[state.currentListId].items.find((item) => item.id === id);
      if (foundItem) foundItem.done = !foundItem.done;
    },
  },
};
