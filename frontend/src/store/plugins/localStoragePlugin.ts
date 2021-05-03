import { Store } from 'vuex';
import { IState } from '../../models';

interface IMutationObject {
  type: string;
  payload: string;
}

export default function createLocalStoragePlugin() {
  return (store: Store<IState>): void => {
    const currentListId = localStorage.getItem('currentListId');
    if (currentListId) {
      store.commit('setCurrentListId', currentListId);
    } else {
      localStorage.setItem('currentListId', store.state.currentListId);
    }

    Object.keys(store.state.lists).forEach((id) => {
      const listParsed = localStorage.getItem(`list_${id}`);
      if (listParsed) {
        store.commit('setList', { id, list: JSON.parse(listParsed) });
      } else {
        localStorage.setItem(`list_${id}`, JSON.stringify(store.state.lists[id]));
      }
    });

    store.subscribe((mutation: IMutationObject, state: IState) => {
      // eslint-disable-next-line no-console
      console.log(mutation);
      switch (mutation.type) {
        case 'setCurrentListId':
          localStorage.setItem('currentListId', mutation.payload);
          break;
        case 'toggleDone':
          localStorage.setItem(`list_${state.currentListId}`, JSON.stringify(state.lists[state.currentListId]));
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('unknown mutation');
      }
    });
  };
}
