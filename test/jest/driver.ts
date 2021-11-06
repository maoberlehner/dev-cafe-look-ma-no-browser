import {
  configure,
  findAllByRole,
  findAllByTestId,
  findAllByText,
  fireEvent,
  queryAllByRole,
  queryAllByTestId,
  queryAllByText,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import {
  AssertShouldExist,
  AssertShouldNotExist,
  Click,
  GoTo,
  Matcher,
  Precondition,
  QueueMock,
  Run,
  Step,
  Submit,
  Type,
} from '../types';
import { rest, server } from '../utils/msw-node';

configure({
  testIdAttribute: `data-qa`,
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

export const run: Run = (steps: Step[] = []) => async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (let step of steps) {
    // eslint-disable-next-line no-await-in-loop
    let result = await step();
    // eslint-disable-next-line no-await-in-loop
    if (Array.isArray(result)) await Promise.all(result.map(x => x()));
  }
};

export const goTo: GoTo<Promise<void>> = async (view) => {
  jsdom.reconfigure({ url: `http://localhost:3000${view}` });
  document.body.innerHTML = `<div id="app"></div>`;
  let { mount } = await import(`../../src/mount`);
  return mount();
};

const query = (matcher: Matcher): HTMLElement => {
  let container = matcher.within ? query(matcher.within) : document.body;
  let match = null;
  let index = matcher.nth ? matcher.nth - 1 : 0;

  if (matcher.testId) {
    match = queryAllByTestId(container, matcher.testId)[index];
  }
  if (matcher.role) {
    match = queryAllByRole(container, matcher.role, { name: matcher.name })[index];
  }
  if (matcher.text) {
    match = queryAllByText(container, matcher.text)[index];
  }

  if (!match) {
    throw new Error(`Either testId, role + name or text is required!`);
  }

  return match;
};

const find = async (matcher: Matcher): Promise<HTMLElement> => {
  let container = matcher.within ? await find(matcher.within) : document.body;
  let match = null;
  let index = matcher.nth ? matcher.nth - 1 : 0;

  if (matcher.testId) {
    match = (await findAllByTestId(container, matcher.testId))[index];
  }
  if (matcher.role && matcher.name) {
    match = (await findAllByRole(container, matcher.role, { name: matcher.name }))[index];
  }
  if (matcher.text) {
    match = (await findAllByText(container, matcher.text))[index];
  }

  if (!match) {
    throw new Error(`Either testId, role + name or text is required!`);
  }

  return match;
};

export const type: Type<Promise<void>> = async (matcher: Matcher, text) => {
  userEvent.type(await find(matcher), text);
};

export const click: Click<Promise<void>> = async (matcher: Matcher) => {
  userEvent.click(await find(matcher));
};

export const submit: Submit<Promise<void>> = async (matcher: Matcher) => {
  fireEvent.submit(await find(matcher));
};

export const assertShouldExist: AssertShouldExist<Promise<void>> = async (matcher: Matcher) => {
  expect(await find(matcher)).toBeTruthy();
};

export const assertShouldNotExist:
  AssertShouldNotExist<Promise<void>> = async (matcher: Matcher) => {
    expect(query(matcher)).toBeFalsy();
  };

const queueMockMsw: QueueMock = ({
  action,
  body,
  endpoint,
  status = 200,
}) => {
  server.use(
    rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
  );
};

export const prepare = (precondition: Precondition): void => precondition({
  queueMock: queueMockMsw,
  window,
});
