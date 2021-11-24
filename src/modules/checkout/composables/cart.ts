import { computed, readonly, ref } from 'vue';

export type LineItem = {
  id: number,
  price: number,
}

const lineItems = ref<LineItem[]>([]);

function add(lineItem: LineItem) {
  lineItems.value.push(lineItem);
}

function empty() {
  lineItems.value = [];
}

export function useCart() {
  let total = computed(() => lineItems.value
    .reduce((currentTotal, lineItem) => (currentTotal + lineItem.price), 0));

  return {
    add,
    empty,
    total,
    lineItems: readonly(lineItems),
  };
}
