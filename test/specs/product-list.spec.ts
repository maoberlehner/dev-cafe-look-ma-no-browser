import {
  goToProductList,
} from '../../src/__test__/global-dsl';
import {
  addProductToCart,
  assertProductInCart,
  assertProductsInCart,
  assertProductListExists,
  assertCartTotal,
} from '../../src/modules/product/__test__/product-dsl';
import {
  listExists,
} from '../../src/modules/product/__test__/product-preconditions';
import { useCart } from '../../src/modules/checkout/composables/cart';

describe(`Product List`, () => {
  afterEach(() => useCart().empty());

  it(`should show a list of products`, driver.run([
    () => driver.prepare(listExists),
    goToProductList,
    assertProductListExists,
  ]));

  it(`should be possible to add products to the cart`, driver.run([
    () => driver.prepare(listExists),
    goToProductList,
    () => addProductToCart(1),
    assertProductInCart,
    () => addProductToCart(3),
    () => assertProductsInCart(2),
  ]));

  it(`should calculate the total price of products in the cart`, driver.run([
    () => driver.prepare(listExists),
    goToProductList,
    () => addProductToCart(1),
    () => addProductToCart(3),
    () => assertCartTotal(`40.00`),
  ]));
});
