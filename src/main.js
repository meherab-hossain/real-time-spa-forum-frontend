import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import vuetify from './plugins/vuetify';
import axios from 'axios'
Vue.prototype.$axios = axios;
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
Vue.component('vue-simplemde', VueSimplemde)
import Echo from 'laravel-echo';


/*
const token=`Bearer${localStorage.getItem('token')}`
window.$axios.defaults.headers.common['Authorization']=token
*/
router.beforeEach((to,from,next)=>{
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  next()
})


window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: "pusher",
  key:"myKey",
  cluster: "ap2",
  wsHost: window.location.hostname,
  wsPort: 6001,
  disableStats: true,
  //forceTLS: true
  auth:{
    headers:{
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }
  }
});



Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
