import { createStore, getValue } from 'nanostores';
import { client } from '../client';
import type { Item } from '../models/item';

export const items = createStore<Item[]>(() => {
  items.set([]);

  // subscription on future changes:
  const itemsSubscription = client
    .from('items')
    .on('*', payload => {
      console.log('Change received!', payload)
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

export function addItem(item: Item) {
  items.set([...getValue(items), item]);
}