import type { Precondition } from '../../../../test/types';
import ProductListDefault from './data/product-list-default.json';

const TOPIC = `product-list`;

export const listExists: Precondition = ({ setup }) => setup({
  action: `read`,
  body: { data: ProductListDefault },
  topic: TOPIC,
});
