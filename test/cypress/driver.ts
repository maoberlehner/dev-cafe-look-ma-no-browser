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

const getElement = (testId: TestId) => cy.get(`[data-qa="${testId}"]`);

const getText = (text: string) => cy.contains(text);

export const type: Type<void> = (testId, text) => {
  getElement(testId).type(text);
};

export const click: Click<void> = (testId) => {
  getElement(testId).click();
};

export const clickText: ClickText<void> = (text) => {
  getText(text).click();
};

export const submit: Submit<void> = (testId) => {
  getElement(testId).submit();
};

function should(testId: TestId, condition: string) {
  return getElement(testId).should(condition);
}

export const assertShouldExist: AssertShouldExist<void> = (testId) => {
  should(testId, `exist`);
};

export const assertShouldNotExist: AssertShouldNotExist<void> = (testId) => {
  should(testId, `not.exist`);
};

export const assertTextShouldExist: AssertTextShouldExist<void> = (text) => {
  getText(text).should(`exist`);
};

export const assertTextShouldNotExist: AssertTextShouldNotExist<void> = (text) => {
  getText(text).should(`not.exist`);
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
