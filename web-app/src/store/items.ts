import { createStore, getValue } from 'nanostores';
import { client } from '../client';
import type { IItem } from '../models/item';

export const items = createStore<IItem[]>(() => {
  items.set([]);

  // subscription on future changes:
  const itemsSubscription = client
    .from('items')
    .on('*', payload => {
      const { eventType, new: newItem, old: oldItem } = payload;
      switch (eventType) {
        case 'INSERT':
          insertItem(newItem); break;
        case 'DELETE':
          deleteItem(oldItem.id); break;
        case 'UPDATE':
          updateItem(newItem); break;
        default:
          console.log('Change received!', payload);
      }
    })
    .subscribe();
  return () => {
    client.removeSubscription(itemsSubscription)
  }
});

export async function getItems(userId) {
  const response = await client
    .from('items')
    .select('id, title, description')
    .eq('user_id', userId);

  let { status, data, error } = response;

  if (status < 400) {
    items.set(data);
  } else {
    console.log(error.message);
  }
}

export function insertItem(item: IItem) {
  items.set([...getValue(items), item]);
}

export function deleteItem(id: number) {
  const newItems = getValue(items).filter(item => item.id !== id);
  items.set(newItems);
}

export function updateItem(updatedItem: IItem) {
  const clonedItems = [...getValue(items)];
  const index = clonedItems.findIndex(item => item.id === updatedItem.id);
  clonedItems[index] = updatedItem;
  items.set(clonedItems);
}