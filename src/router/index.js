import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  },
  {
    path: '/user',
    component: () => import('@/views/User'),
    children: [
      {
        path: '',
        name: 'userIndex',
        component: () => import('@/views/user/UserIndex'),
        meta: {
          title: '个人主页'
        },
      },
      {
        path: 'course',
        name: 'userCourse',
        component: () => import('@/views/user/UserCourse'),
        meta: {
          title: '我的课程'
        },
      },
      {
        path: 'score',
        name: 'userScore',
        component: () => import('@/views/user/UserScore'),
        meta: {
          title: '我的成绩'
        },
      },
      {
        path: 'setting',
        name: 'userSetting',
        component: () => import('@/views/user/UserSetting'),
        meta: {
          title: '设置'
        },
      },
    ]
  },
  {
    path: '/courseInfo/:course_id',
    component: () => import('@/views/CourseInfo'),
    meta: {
      title: '课程简介',
    },
  },
  {
    path: '/course/:course_id',
    component: () => import('@/views/Course'),
    children: [
      {
        path: 'chapter',
        name: 'chapter',
        component: () => import('@/views/course/Chapter'),
        meta: {
          title: '课程章节',
        }
      },
      {
        path: 'bulletin',
        name: 'bulletin',
        component: () => import('@/views/course/Bulletin'),
        meta: {
          title: '课程公告',
        }
      },
      {
        path: 'outline',
        name: 'outline',
        component: () => import('@/views/course/Outline'),
        meta: {
          title: '课程信息',
        }
      },
      {
        path: 'homework/:homework_index/homeworkDetail',
        name: 'homeworkDetail',
        component: () => import('@/views/course/HomeworkDetail'),
        meta: {
          title: '作业详情',
        }
      },
      {
        path: 'homework',
        name: 'homework',
        component: () => import('@/views/course/Homework'),
        meta: {
          title: '课程作业',
        },
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/course/Chapter'),
        meta: {
          title: '课程分组',
        }
      },
      {
        path: 'score',
        name: 'score',
        component: () => import('@/views/course/Chapter'),
        meta: {
          title: '课程成绩',
        }
      },
      {
        path: 'forum/:post_id/forumDetail',
        name: 'forumDetail',
        component: () => import('@/views/course/ForumDetail'),
        meta: {
          title: '帖子详情',
        }
      },
      {
        path: 'forum',
        name: 'forum',
        component: () => import('@/views/course/Forum'),
        meta: {
          title: '课程讨论',
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

// 路由鉴权
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router
