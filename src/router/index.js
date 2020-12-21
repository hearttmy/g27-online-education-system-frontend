import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'homepage',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/Auth'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
