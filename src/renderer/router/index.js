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
      path: '/manage/trucks',
      name: 'truck-view',
      component: require('@/components/TruckView').default,
    },
    {
      path: '/manage/clients',
      name: 'client-view',
      component: require('@/components/Client').default,
    },
    {
      path: '/manage/materials',
      name: 'material-view',
      component: require('@/components/MaterialV').default,
    },
    {
      path: '/weighing/initial',
      name: 'initial-weight',
      component: require('@/components/InitialWeightV').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
