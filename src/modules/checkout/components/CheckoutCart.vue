<template>
  <div
    class="CheckoutCart"
    :class="{
      'is-active': lineItems.length > 0,
    }"
  >
    <span>
      You have {{ lineItems.length }} product{{ lineItems.length > 1 ? 's' : '' }} in your cart
    </span>
    <span>
      (€ {{ (total / 100).toFixed(2) }})
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useCart } from '../composables/cart';

export default defineComponent({
  name: `CheckoutCart`,
  setup() {
    let { lineItems, total } = useCart();

    return {
      total,
      lineItems,
    };
  },
});
</script>

<style>
.CheckoutCart {
  height: 4em;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rebeccapurple;
  color: #fff;
  transform: translateY(4em);
  transition: transform 0.2s;
}

.CheckoutCart.is-active {
  transform: translateY(0);
}
</style>
