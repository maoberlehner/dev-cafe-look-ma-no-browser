import type { Step } from '../../../../test/types';

export const addProductToCart: Step = (nth: number) => driver.click({
  role: `button`,
  name: `Add to cart`,
  nth,
});

export const assertProductInCart: Step = () => driver.assertShouldExist({
  text: `You have 1 product in your cart`,
});

export const assertProductsInCart: Step = (n: number) => driver.assertShouldExist({
  text: `You have ${n} products in your cart`,
});

export const assertCartTotal: Step = (total: number) => driver.assertShouldExist({
  text: `(€ ${total})`,
});

export const assertProductListExists: Step = () => [
  () => driver.assertShouldExist({ text: `T-Shirt` }),
  () => driver.assertShouldExist({ text: `Hoodie` }),
  () => driver.assertShouldExist({ text: `Socks` }),
];
