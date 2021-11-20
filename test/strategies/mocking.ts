import type {
  ApiMock,
  ApiMockHttpVerb,
  Mock,
  MockAction,
  QueueApiMock,
  Strategy,
} from "../types";

const ENDPOINTS: Record<string, string> = {
  'product-list': `/api/products`,
};
const HTTP_VERBS: Record<MockAction, ApiMockHttpVerb> = {
  create: `post`,
  read: `get`,
};

function adaptMock2ApiMock({
  action,
  body,
  status,
  topic,
}: Mock): ApiMock {
  return {
    body,
    endpoint: ENDPOINTS[topic],
    httpVerb: HTTP_VERBS[action],
    status,
  };
}

export const makeStrategy = ({ queueApiMock }: { queueApiMock: QueueApiMock }): Strategy => ({
  async setup(mock) {
    await queueApiMock(adaptMock2ApiMock(mock));
  },
});
