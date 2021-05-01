import List from './components/List.vue';
import { initialState } from './store';

interface IPath {
  path: string;
}

export default [
  {
    path: '/',
    component: List,
    redirect(): IPath {
      return { path: `/list/${defaultState.currentListId}` };
    },
  },
  {
    path: '/list/:listId',
    component: List,
    beforeEnter: (to: string): void | boolean => {
      console.log(to);
      // return false;
    },
  },
];
