import { IState } from '../../models';

interface IMutationObject {
  type: string;
  payload: unknown;
}

export default function createLocalStoragePlugin() {
  return (store) => {
    const currentListId = localStorage.getItem('currentListId');
    if (currentListId) {
      store.commit('setCurrentListId', currentListId);
    } else {
      localStorage.setItem('currentListId', store.state.currentListId);
    }
    store.subscribe((mutation: IMutationObject, state: IState) => {
      console.log(mutation);
      if (mutation.type === 'setCurrentListId') {
        localStorage.setItem('currentListId', state.currentListId);
      }
    });
  };
}
