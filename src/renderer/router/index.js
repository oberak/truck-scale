import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default,
    },
    {
      path: '/truck/view',
      name: 'truck-view',
      component: require('@/components/TruckView').default,
    },
    {
      path: '/client',
      name: 'Client',
      component: require('@/components/Client').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
