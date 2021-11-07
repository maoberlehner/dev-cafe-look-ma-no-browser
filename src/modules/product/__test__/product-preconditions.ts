import type { Precondition } from '../../../../test/types';
import ProductListDefault from './data/product-list-default.json';

const ENDPOINT_PRODUCTS = `/api/products`;

export const listExists: Precondition = ({ queueMock }) => queueMock({
  action: `get`,
  body: { data: ProductListDefault },
  endpoint: ENDPOINT_PRODUCTS,
});
