import '@babel/polyfill'
import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
//import 'font-awesome/css/font-awesome.css' // Ensure you are using css-loader
//"../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
// import "../node_modules/bootswatch/yeti/_variables.scss";
// import "../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
// import "../node_modules/bootswatch/yeti/_bootswatch.scss";
import "../node_modules/formiojs/dist/formio.full.css";
import "../node_modules/formiojs/dist/formio.builder.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
// import { editor } from 'vue2-ace-editor';
import { editor } from 'ace-vue2';
import '../node_modules/brace/mode/javascript';
import '../node_modules/brace/mode/json';
import '../node_modules/brace/theme/chrome';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  BootstrapVue,
  editor,
  render: h => h(App),
}).$mount('#app');
