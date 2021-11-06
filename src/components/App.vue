<template>
  <RouterView />
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {
  RouterView,
} from 'vue-router';

export default defineComponent({
  components: {
    RouterView,
  },
});
</script>

<style lang="scss">
@import '../assets/styles/styles.scss';

body {
  max-width: 42em;
  margin-right: auto;
  margin-left: auto;
}
</style>
