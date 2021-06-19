import { createStore, getValue } from 'nanostores';

interface IUI {
  currentListId: string;
}

export const ui = createStore<IUI>(() => {
  ui.set({
    currentListId: 'list1',
  });
});

export function setCurrentListId(id: string): void {
  ui.set({
    ...getValue(ui),
    currentListId: id,
  });
}
