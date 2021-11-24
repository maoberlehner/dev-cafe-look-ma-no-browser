<template>
  <ul
    class="ProductList"
  >
    <li
      v-for="product in products"
      :key="product.id"
      class="ProductList__item"
    >
      <div>{{ product.name }}</div>
      <button @click="addToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { getList, Product } from '../service/product-service';
import { useCart } from '../../checkout/composables/cart';

export default defineComponent({
  name: `ProductList`,
  setup() {
    let products = ref<Product[]>([]);
    (async () => {
      products.value = await getList();
    })();

    let { add: addToCart } = useCart();

    return {
      addToCart,
      products,
    };
  },
});
</script>

<style>
.ProductList__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  border-top: 1px solid #efefef;
}

.ProductList__item:last-child {
  border-bottom: 1px solid #efefef;
}
</style>
