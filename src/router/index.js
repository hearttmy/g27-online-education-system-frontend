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
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/Login'),
        meta: {
          title: '登录',
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/Register'),
        meta: {
          title: '注册',
        }
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('@/views/auth/Reset'),
        meta: {
          title: '重置密码',
        }
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: {
      title: '搜索',
    }
  },
  {
    path: '/courseList',
    name: 'courseList',
    component: () => import('@/views/CourseList'),
    meta: {
      title: '课程列表',
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
