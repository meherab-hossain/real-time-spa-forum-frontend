import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import "vuetify/dist/vuetify.min.css";
// Fonts
// main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {
  mdiAccount,
  mdiPencil,
  mdiShareVariant,
  mdiDelete,
} from '@mdi/js'
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
  },
});
