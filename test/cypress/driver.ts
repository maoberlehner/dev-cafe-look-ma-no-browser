import { configure } from '@testing-library/cypress';

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

configure({
  testIdAttribute: `data-qa`,
});

export const run: Run = (steps: Step[] = []) => () => {
  // eslint-disable-next-line no-restricted-syntax
  for (let step of steps) {
    let result = step();
    if (Array.isArray(result)) result.forEach(x => x());
  }
};

export const goTo: GoTo<void> = (view) => {
  cy.visit(view);
  cy.window().should(`have.property`, `appReady`, true);
};

const get = (matcher: Matcher): Cypress.Chainable => {
  let container = matcher.within ? get(matcher.within) : cy.get(`body`);
  let match = null;
  let index = matcher.nth ? matcher.nth - 1 : 0;

  if (matcher.testId) {
    match = container.findAllByTestId(matcher.testId).eq(index);
  }
  if (matcher.role && matcher.name) {
    match = container.findAllByRole(matcher.role, { name: matcher.name }).eq(index);
  }
  if (matcher.text) {
    match = container.findAllByText(matcher.text).eq(index);
  }

  if (!match) {
    throw new Error(`Either testId, role + name or text is required!`);
  }

  return match;
};

export const type: Type<void> = (matcher, text) => {
  get(matcher).type(text);
};

export const click: Click<void> = (matcher) => {
  get(matcher).click();
};

export const submit: Submit<void> = (matcher) => {
  get(matcher).submit();
};

function should(matcher: Matcher, condition: string) {
  return get(matcher).should(condition);
}

export const assertShouldExist: AssertShouldExist<void> = (matcher) => {
  should(matcher, `exist`);
};

export const assertShouldNotExist: AssertShouldNotExist<void> = (matcher) => {
  should(matcher, `not.exist`);
};

export const queueMockMsw: QueueMock = ({
  action,
  body,
  endpoint,
  status = 200,
}) => {
  cy.window().then(({ localStorage }) => {
    let mocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
    let mocks = mocksRaw ? JSON.parse(mocksRaw) : [];

    return localStorage.setItem(`NETWORK_MOCKS`, JSON.stringify([...mocks, {
      action,
      body,
      endpoint,
      status,
    }]));
  });
};

export const prepare = (precondition: Precondition): void => {
  cy.window().then(window => precondition({
    queueMock: queueMockMsw,
    window,
  }));
};
