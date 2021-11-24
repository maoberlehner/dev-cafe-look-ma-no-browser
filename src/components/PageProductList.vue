<template>
  <div class="PageProductList">
    <h1>Products</h1>
    <ProductList class="PageProductList__list" />
    <CheckoutCart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProductList from '../modules/product/components/ProductList.vue';
import CheckoutCart from '../modules/checkout/components/CheckoutCart.vue';

export default defineComponent({
  name: `PageProductList`,
  components: {
    ProductList,
    CheckoutCart,
  },
});
</script>

<style>
.PageProductList__list {
  margin-top: 2em;
}
</style>
