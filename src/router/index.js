import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/pages/Index';
import Profile from '../components/pages/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '*',
      name: 'index',
      component: Index,
    },
  ],
});
