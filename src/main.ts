import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EventBus from 'vue-bus-ts';

import './assets/styles/common.scss';

Vue.config.productionTip = false;

// 使用总线机制
Vue.use(EventBus);
const bus = new EventBus.Bus();

new Vue({
  router,
  bus,
  render: h => h(App)
}).$mount('#app');
