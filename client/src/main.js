import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

// Agregamos la URL base de nuestra API
// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'http://34.204.81.233:3000/api';
// axios.defaults.baseURL = 'http://34.204.81.233/api';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
