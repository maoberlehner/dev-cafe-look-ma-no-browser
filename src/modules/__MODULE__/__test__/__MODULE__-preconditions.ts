import type { Precondition } from '../../../../test/types';
import XListDefault from './data/__MODULE__-list-default.json';

const ENDPOINT_X = `/api/X`;

export const listExists: Precondition = ({ queueMock }) => queueMock({
  action: `get`,
  body: { data: XListDefault },
  endpoint: ENDPOINT_X,
});
