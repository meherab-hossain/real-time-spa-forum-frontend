import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import vuetify from './plugins/vuetify';
import axios from 'axios'
Vue.prototype.$axios = axios;
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
Vue.component('vue-simplemde', VueSimplemde)

/*
const token=`Bearer${localStorage.getItem('token')}`
window.$axios.defaults.headers.common['Authorization']=token
*/
router.beforeEach((to,from,next)=>{
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

  next()
})
Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
