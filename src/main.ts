import type {
  ApiMock,
  QueueApiMock,
} from '../test/types';
import { makeStrategy } from '../test/strategies/mocking';
import { mount } from './mount';

declare global {
  interface Window { appReady: boolean }
}

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { rest, server } = await import(`../test/utils/msw-browser`);
  server.start();

  let queueApiMock: QueueApiMock = ({
    body,
    endpoint,
    httpVerb,
    status = 200,
  }) => {
    server.use(
      rest[httpVerb](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
    );
  };

  let mocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
  let mocks: ApiMock[] = mocksRaw ? JSON.parse(mocksRaw) : [];
  mocks.forEach(mock => queueApiMock(mock));

  // During development, load preconditions for the use case you are working on.
  // await Promise.all([
  //   (await import(`./modules/product/__test__/product-preconditions`))
  //     .listExists(makeStrategy({ queueApiMock })),
  // ]);

  window.appReady = true;
}

prepare().then(mount);
