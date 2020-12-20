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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
