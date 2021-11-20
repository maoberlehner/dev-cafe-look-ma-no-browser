import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

import type * as cypressDriver from './cypress/driver';
import type * as jestDriver from './jest/driver';

export type Driver = typeof cypressDriver|typeof jestDriver;

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi };

export type MockAction = `create`|`read`;
export type Mock = {
  action: MockAction,
  body: Record<number|string, unknown>,
  status?: number,
  topic: string,
};
export type ApiMockHttpVerb = `get`|`post`;
export type ApiMock = {
  body: Record<number|string, unknown>,
  endpoint: string,
  httpVerb: ApiMockHttpVerb,
  status?: number,
};

export type Setup = (mock: Mock) => void;
export type Strategy = {
  setup: Setup,
};

export type Precondition = (strategy: Strategy) => void;

export type Step = (payload?: any) => Step[]|void|Promise<void>;

export type Run = (steps: Step[]) => () => void;
export type QueueApiMock = (apiMock: ApiMock) => void;
export type Prepare = (precondition: Precondition) => void;

export type Matcher = {
  name?: string,
  nth?: number,
  role?: string,
  testId?: number|string,
  text?: string,
  within?: Matcher,
};
export type GoTo<ReturnType> = (view: string) => ReturnType;
export type Type<ReturnType> = (matcher: Matcher, text: string) => ReturnType;
export type Click<ReturnType> = (matcher: Matcher) => ReturnType;
export type Submit<ReturnType> = (matcher: Matcher) => ReturnType;
export type AssertShouldExist<ReturnType> = (matcher: Matcher) => ReturnType;
export type AssertShouldNotExist<ReturnType> = (matcher: Matcher) => ReturnType;
