import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify' // นี่คือไฟล์ plugin vuetify ที่ได้ import มาแล้ว
import './main.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
export const eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify, // ใช้ตัวแปร vuetify ที่ได้ import มาแล้ว
  render: h => h(App)
}).$mount('#app')
