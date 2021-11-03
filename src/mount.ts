import {
  createApp,
} from 'vue';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import App from './components/App.vue';
import PageX from './components/PageX.vue';

let routes = [
  {
    component: PageX,
    name: `X`,
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
