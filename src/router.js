import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Dashboard from './views/Dashboard.vue';
import Application from './views/Application.vue';
import Administration from './views/Administration.vue';
import FormBuilder from './views/FormBuilder.vue';
import Support from './views/Support.vue';
import Help from './views/Help.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/administration',
      name: 'administration',
      component: Administration,
    },
    {
      path: '/support',
      name: 'support',
      component: Support,
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
    },
    {
      path: '/form builder',
      name: 'formbuilder',
      component: FormBuilder,
    },
    {
      path: '/apps/:appid/:pageid',
      name: 'application',
      component: Application,
    },
  ],
});
