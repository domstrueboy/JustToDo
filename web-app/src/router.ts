import { createRouter } from 'nanostores';

interface Routes {
	home: void;
  events: 'userId';
}

export const router = createRouter<Routes>({
	home: '/',
  events: '/:userId',
});