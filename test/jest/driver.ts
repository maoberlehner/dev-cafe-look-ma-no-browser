import {
  configure,
  findByTestId as findByTestIdOriginal,
  findByText as findByTextOriginal,
  fireEvent,
  queryByTestId as queryByTestIdOriginal,
  queryByText as queryByTextOriginal,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import {
  AssertShouldExist,
  AssertShouldNotExist,
  AssertTextShouldExist,
  AssertTextShouldNotExist,
  Click,
  ClickText,
  GoTo,
  Precondition,
  QueueMock,
  Run,
  Step,
  Submit,
  TestId,
  Type,
} from '../types';
import { rest, server } from '../utils/msw-node';

configure({
  testIdAttribute: `data-qa`,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
beforeAll(() => {
  server.listen();
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

const findByTestId = (testId: TestId) => findByTestIdOriginal(document, testId);

const queryByTestId = (testId: TestId) => queryByTestIdOriginal(document, testId);

const findByText = (text: string) => findByTextOriginal(document, text);

const queryByText = (text: string) => queryByTextOriginal(document, text);

export const goTo: GoTo<Promise<void>> = async (view) => {
  jsdom.reconfigure({ url: `http://localhost:3000${view}` });
  document.body.innerHTML = `<div id="app"></div>`;
  let { mount } = await import(`../../src/mount`);
  return mount();
};

export const type: Type<Promise<void>> = async (testId, text) => {
  userEvent.type(await findByTestId(testId), text);
};

export const click: Click<Promise<void>> = async (testId) => {
  userEvent.click(await findByTestId(testId));
};

export const clickText: ClickText<Promise<void>> = async (text) => {
  userEvent.click(await findByText(text));
};

export const submit: Submit<Promise<void>> = async (testId) => {
  fireEvent.submit(await findByTestId(testId));
};

export const assertShouldExist: AssertShouldExist<Promise<void>> = async (testId) => {
  expect(await findByTestId(testId)).toBeTruthy();
};

export const assertShouldNotExist: AssertShouldNotExist<Promise<void>> = async (testId) => {
  expect(queryByTestId(testId)).toBeFalsy();
};

export const assertTextShouldExist: AssertTextShouldExist<Promise<void>> = async (text) => {
  expect(await findByText(text)).toBeTruthy();
};

export const assertTextShouldNotExist: AssertTextShouldNotExist<Promise<void>> = async (text) => {
  expect(await queryByText(text)).toBeFalsy();
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
