import {
  goToProductList,
} from '../../src/__test__/global-dsl';
import {
  doMultipleThings,
  doOneThing,
} from '../../src/modules/product/__test__/product-dsl';
import {
  listExists,
} from '../../src/modules/product/__test__/product-preconditions';

describe(`Product List`, () => {
  it(`should do something useful`, driver.run([
    () => driver.prepare(listExists),
    goToProductList,
    doOneThing,
    doMultipleThings,
  ]));
});
