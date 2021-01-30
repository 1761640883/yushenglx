import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
Vue.prototype.axios = axios;

import tabbar from '@/components/tabbar';
Vue.component('tabbar', tabbar);

import heaod from '@/components/heaod';
Vue.component('heaod', heaod);

import loading from '@/components/loading'
Vue.component('loading', loading)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
