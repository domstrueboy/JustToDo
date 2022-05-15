import { createRouter } from '@nanostores/router';
import type { Routes } from './models/routes';

export const router = createRouter<Routes>({
	home: '/',
  events: '/:userId',
});