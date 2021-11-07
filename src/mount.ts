import {
  createApp,
} from 'vue';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import App from './components/App.vue';
import PageProductList from './components/PageProductList.vue';

let routes = [
  {
    component: PageProductList,
    name: `product-list`,
    path: `/`,
  },
];

export function mount(): void {
  let router = createRouter({
    history: createWebHistory(),
    routes,
  });
  let app = createApp(App);
  app.use(router);
  app.mount(`#app`);
}
