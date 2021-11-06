import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi };

export type MockAction = `get`|`post`;
export type Mock = {
  action: MockAction,
  body: Record<number|string, unknown>,
  endpoint: string,
  status?: number,
};

export type Matcher = {
  name?: string,
  nth?: number,
  role?: string,
  testId?: number|string,
  text?: string,
  within?: Matcher,
};
export type Step = (payload?: any) => Step[]|void|Promise<void>;
export type Run = (steps: Step[]) => () => void;
export type GoTo<ReturnType> = (view: string) => ReturnType;
export type Type<ReturnType> = (matcher: Matcher, text: string) => ReturnType;
export type Click<ReturnType> = (matcher: Matcher) => ReturnType;
export type Submit<ReturnType> = (matcher: Matcher) => ReturnType;
export type AssertShouldExist<ReturnType> = (matcher: Matcher) => ReturnType;
export type AssertShouldNotExist<ReturnType> = (matcher: Matcher) => ReturnType;
export type QueueMock = (mock: Mock) => void;

export type PreconditionOptions<Payload> = {
  payload?: Payload,
  queueMock: QueueMock,
  window: typeof window,
};
export type Precondition = <Payload>(options: PreconditionOptions<Payload>) => void;
