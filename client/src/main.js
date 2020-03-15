import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 5000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
