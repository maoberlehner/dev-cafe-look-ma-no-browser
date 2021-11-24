<template>
  <div class="PageProductList">
    <h1>Products</h1>
    <ProductList
      class="PageProductList__list"
      @add-product="addProduct"
    />
    <CheckoutCart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProductList from '../modules/product/components/ProductList.vue';
import CheckoutCart from '../modules/checkout/components/CheckoutCart.vue';
import { LineItem, useCart } from '../modules/checkout/composables/cart';

export default defineComponent({
  name: `PageProductList`,
  components: {
    ProductList,
    CheckoutCart,
  },
  setup() {
    let { add: addToCart } = useCart();

    return {
      addToCart,
    };
  },
  methods: {
    addProduct(product: LineItem) {
      this.addToCart(product);
    },
  },
});
</script>

<style>
.PageProductList__list {
  margin-top: 2em;
}
</style>
