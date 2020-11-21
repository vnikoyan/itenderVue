import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard/home'
import store from '../store'

Vue.use(VueRouter)

// checks if user wants to stay logged in after closing browser
window.onbeforeunload = function (event) {
  if (!store.getters.rememberMe) {
    store.dispatch('logout')
  }
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: () => import('../layouts/landing/auth') },
    component: () => import('../views/landing/login'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/state-signup',
    name: 'StateSignup',
    meta: { layout: () => import('../layouts/landing/auth') },
    component: () => import('../views/landing/signup'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: () => import('../layouts/landing/main') },
    component: () => import('../views/landing/Home'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/tender',
    name: 'Tender',
    meta: { layout: () => import('../layouts/landing/main') },
    component: () => import('../views/landing/Tenders')
  },
  {
    path: '/new/:id',
    name: 'Info',
    meta: { layout: () => import('../layouts/landing/main') },
    component: () => import('../views/landing/News')
  },
  {
    path: '/info',
    name: 'Info',
    meta: { layout: () => import('../layouts/landing/main') },
    component: () => import('../views/landing/Info')
  },
  {
    path: '/help',
    name: 'Help',
    meta: { layout: () => import('../layouts/landing/main') },
    component: () => import('../views/landing/Help')
  },
  {
    path: '/dashboard',
    name: 'Գլխավոր',
    component: Dashboard,
    meta: { layout: () => import('../layouts/dashboard/main') },
    beforeEnter: ifAuthenticated
  },
  {
    path: '/planning',
    name: 'Պլանավորում',
    component: () => import('../views/dashboard/planning/index'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '',
        redirect: 'list'
      },
      {
        path: 'list',
        name: 'Գնումների պլան',
        meta: { layout: () => import('../layouts/dashboard/main'), },
        component: () => import('../views/dashboard/planning/list')
      },
      {
        path: 'responsible-unit',
        name: 'Պատասխանատու ստորաբաժանաում',
        meta: { layout: () => import('../layouts/dashboard/main'), },
        component: () => import('../views/dashboard/planning/responsible_unit')
      },
      {
        path: '*', redirect: 'list'
      },
    ]
  },
  {
    path: '/organizing',
    name: 'Կազմակերպում',
    meta: { layout: () => import('../layouts/dashboard/main'), },
    component: () => import('../views/dashboard/organizing'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/user',
    name: 'Պրոֆիլ',
    meta: { layout: () => import('../layouts/dashboard/main'), },
    component: () => import('../views/dashboard/user'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
