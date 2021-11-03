import { setupWorker } from 'msw';

export { rest } from 'msw';

export const server = setupWorker();
