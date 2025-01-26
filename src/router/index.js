import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const auth = (to, from, next) => {
  if(!localStorage.getItem("access_token"))
  {
    return next({name: "login"})
  }
  next();
}

const guest = (to, from, next) => {
  if(localStorage.getItem("access_token"))
  {
    return next({name: "orders.index"})
  }
  next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import("../views/Auth/Register.vue")
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import("../views/Auth/Login.vue")
    },
    {
      path: '/users',
      name: 'users.index',
      beforeEnter: auth,
      component: () => import("../views/Users/Index.vue")
    },
    {
      path: '/users/:id',
      name: 'users.edit',
      beforeEnter: auth,
      component: () => import("../views/Users/Edit.vue")
    },
    {
      path: '/orders',
      name: 'orders.index',
      beforeEnter: auth,
      component: () => import("../views/Orders/Index.vue")
    },
    {
      path: '/orders/create',
      name: 'orders.create',
      beforeEnter: auth,
      component: () => import("../views/Orders/Create.vue")
    },
    {
      path: '/orders/tracking/:trackingId',
      name: 'orders.tracking',
      beforeEnter: auth,
      component: () => import("../views/Orders/Tracking.vue")
    }
  ]
})

export default router
