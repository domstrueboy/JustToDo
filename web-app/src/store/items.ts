import { createStore, getValue } from 'nanostores';
import { client } from '../client';
import type { IItem } from '../models/item';

export const items = createStore<IItem[]>(() => {
  items.set([]);

  // subscription on future changes:
  const itemsSubscription = client
    .from('items')
    .on('*', payload => {
      const { eventType, new: newItem } = payload;
      switch (eventType) {
        case 'INSERT':
          addItem(newItem);
          break;
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
    .select('title, content')
    .eq('user_id', userId);

  let { status, data, error } = response;

  if (status < 400) {
    items.set(data);
  } else {
    console.log(error.message);
  }
}

export function addItem(item: IItem) {
  items.set([...getValue(items), item]);
}