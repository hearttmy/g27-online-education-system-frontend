import Vue from "vue";
import Router from "vue-router";
import getLoginState from "@/getLoginState";

Vue.use(Router);
let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'homepage',
      component: () => import('@/views/HomePage.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/Auth.vue"),
      meta: {
        title: "登录&注册"
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search.vue"),
      meta: {
        title: "搜索"
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User'),
      meta: {
        title: '个人中心',
        //auth: 'all'
      },
      children: [
      ],
    },
    {
      path: "/course",
      component: () => import("@/views/Course"),
      meta: {
        title: '课程',
      },
      children: [
        {
          path: '',
          name: 'all_course',
          component: () => import("@/views/course/AllCourse"),
          meta: {
            title: "全部课程"
          }
        },
        {
          path: ":course_id",
          name: "course_item",
          component: () => import("@/views/course/CourseItem"),
          meta: {
            //auth: "all",
            title: "课程"
          },
          children: [
            {
              path: "index",
              name: "course_detail",
              component: () => import("@/views/course/CourseDetail"),
              meta: {
                //auth: "all",
                title: "课程内容"
              }
            },
          ]
        },

      ]

    },
  ]
});

// 路由鉴权
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log("123")
    const loginState = getLoginState() || {};
    const userType = loginState.userType;
    if (to.meta.auth === "all") {
      if (userType !== 0 && userType !== 1) {
        return next({
          path: "/auth"
        }); // 登录界面
      }
    } else if (to.meta.auth === "tch") {
      if (!userType) {
        return next({
          path: "/auth"
        }); // 登录界面
      }
      if (userType !== 1) {
        return next({
          path: "/noAuthorization"
        });
      }
    } else if (to.meta.auth === "stu") {
      if (!userType) {
        return next({
          path: "/auth"
        }); // 登录界面
      }
      if (userType !== 0) {
        return next({
          path: "noAuthorization"
        });
      }
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
