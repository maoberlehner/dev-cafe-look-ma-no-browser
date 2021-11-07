<template>
  <div class="PageProductList">
    <h1>Products</h1>
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProductList from '../modules/product/components/ProductList.vue';

export default defineComponent({
  name: `PageProductList`,
  components: {
    ProductList,
  },
});
</script>
