import Vue from "vue";
import Router from "vue-router";
import getLoginState from "./getLoginState";

Vue.use(Router);
let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'homepage',
      component: () => import('./views/HomePage.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("./views/Auth.vue"),
      meta: {
        title: "登录&注册"
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/search/search.vue"),
      meta: {
        title: "搜索"
      }
    },
    //课程
    {
      path: "/course",
      component: () => import("./views/Course.vue"),
      children: [{
          path: "",
          name: "all_course",
          component: () => import("./views/childrenViews/AllCourse.vue"),
          meta: {
            title: "全部课程"
          }
        },
        {
          path: ":course_id",
          name: "course_item",
          component: () => import("./views/childrenViews/CourseItem.vue"),
          meta: {
            auth: "all",
            title: "课程"
          },

          children: [{
              path: "index",
              name: "course_detail",
              component: () => import("./views/childrenViews/courseViews/CourseDetail.vue"),
              meta: {
                auth: "all",
                title: "课程内容"
              }
            },
            //课程内容
            {
              path: "index/pd",
              name: "course_part_detail",
              component: () => import("./views/childrenViews/courseViews/CoursePartDetail.vue"),
              meta: {
                auth: "all",
              }
            },
            //编辑课程
            {
              path: "index/editCourse",
              name: "edit_chapter",
              component: () => import("./views/childrenViews/courseViews/EditCourse.vue"),
              meta: {
                auth: "tch",
                title: "编辑课程"
              }
            },
            //课程公告
            {
              path: "notice",
              name: "course_notice",
              component: () =>
                import("./views/childrenViews/courseViews/CourseNotice.vue"),
              meta: {
                auth: "all",
                title: "课程公告"
              }
            },

            //作业练习
            {
              path: "exercise",
              name: "course_exercise",
              component: () =>
                import("./views/childrenViews/courseViews/CourseExercise.vue"),
              meta: {
                title: "课程作业"
              }
            },
            {
              path: "exercise/addExercisePaper",
              name: "add_exercise_paper",
              component: () =>
                import("./views/childrenViews/courseViews/AddExercisePaper.vue"),
              meta: {
                auth: "tch",
                title: "添加作业"
              }
            },
            {
              path: "exercise/editExercisePaper",
              name: "edit_exercise_paper",
              component: () =>
                import("./views/childrenViews/courseViews/EditExercisePaper.vue"),
              meta: {
                auth: "tch",
                title: "编辑作业"
              }
            },
            {
              path: "exercise/exercisePaper",
              name: "show_exercise_paper",
              component: () =>
                import("./views/childrenViews/courseViews/ExercisePaper.vue"),
              meta: {
                title: "作业练习"
              }
            },
            //考试
            // {
            //   path: "",
            //   name: "all_exam",
            //   component: () => import("./views/childrenViews/courseViews/AllExam.vue"),
            //   meta: {
            //     title: "全部考试"
            //   }
            // },
            {
              path: "exam",
              name: "course_exam",
              component: () => import("./views/childrenViews/courseViews/CourseExam.vue"),
              meta: {
                title: "课程考试"
              }
            },
            {
              path: "exam/addExamPaper",
              name: "add_exam_paper",
              component: () => import("./views/childrenViews/courseViews/AddExamPaper.vue"),
              meta: {
                auth: "tch",
                title: "添加考试"
              }
            },
            {
              path: "exam/examPaper",
              name: "show_exam_paper",
              component: () => import("./views/childrenViews/courseViews/ExamPaper.vue"),
              meta: {
                auth: "all",
                title: "考试"
              }
            },
            {
              path: "resources",
              name: "show_course_resources",
              component: () =>
                import("./views/childrenViews/courseViews/Resources.vue"),
              meta: {
                title: "课程资源"
              }
            },
            {
              path: "resources/:filename",
              name: "preview_courseware",
              component: () =>
                import("./views/childrenViews/courseViews/PreviewCourseware.vue"),
              meta: {
                title: "课件"
              }
            }
          ]
        }
      ]
    },

    //答疑
    {
      path: "/qa",
      component: () => import("./views/Qa.vue"),
      children: [{
          path: "",
          name: "qa_questions",
          component: () => import("./views/childrenViews/QaQuestions.vue"),
          meta: {
            auth: 'all',
            title: '问题列表'
          }
        },
        {
          path: "question/:question_id",
          name: "qa_question",
          component: () => import("./views/childrenViews/QaQuestion.vue"),
          meta: {
            auth: 'all',
            title: '问题详情'
          }
        },
        {
          path: "addQuestion",
          name: "add_question",
          component: () => import("./views/childrenViews/QaAddQuestion.vue"),
          meta: {
            auth: 'all',
            title: '提问题'
          }
        }
      ]
    },
    //新闻动态
    {
      path: "/news",
      component: () => import("./views/News.vue"),
      children: [{
          path: '',
          name: 'article_news_list',
          component: () =>
            import("./views/childrenViews/ArticleList.vue"),
          meta: {
            title: '新闻动态|文章列表'
          },
          props: {
            articleType: 'news'
          },
        }, {
          path: 'article/:article_id',
          name: 'article_news_detail',
          component: () => import('./views/childrenViews/ArticleDetail.vue'),
          meta: {
            title: '新闻动态|文章详情'
          }
        },
        {
          path: 'addArticle',
          name: 'article_news_add',
          component: () => import('./views/childrenViews/ArticleAdd.vue'),
          meta: {
            auth: 'all',
            title: '发布文章'
          }
        }
      ]
    },
    //技术前沿
    {
      path: "/techInfo",
      component: () => import("./views/TechInfo.vue"),
      children: [{
          path: '',
          name: 'article_techInfo_list',
          component: () =>
            import("./views/childrenViews/ArticleList.vue"),
          meta: {
            title: '技术前沿|文章列表'
          },
          props: {
            articleType: 'techInfo'
          },
        }, {
          path: 'article/:article_id',
          name: 'article_techInfo_detail',
          component: () => import('./views/childrenViews/ArticleDetail.vue'),
          meta: {
            title: '技术前沿|文章详情'
          }
        },
        {
          path: 'addArticle',
          name: 'article_techInfo_add',
          component: () => import('./views/childrenViews/ArticleAdd.vue'),
          meta: {
            auth: 'all',
            title: '发布文章'
          }
        }
      ]
    },
    //实验平台
    //资源
    {
      path: "/library",
      component: () => import("./views/Library.vue"),
      children: [{
          path: "",
          name: "show_resources",
          component: () => import("./views/childrenViews/Resources.vue"),
          meta: {
            title: "全部资源"
          }
        },
        {
          path: ":filename",
          name: "preview_software",
          component: () =>
            import("./views/childrenViews/PreviewCourseware.vue"),
          meta: {
            title: "实验平台"
          }
        }
      ]
    },
    {
      path: "/myInfo",
      component: () => import("./views/MyInfo.vue"),
      meta: {
        auth: "all"
      },
      children: [{
          path: "myCourses",
          name: "my_courses",
          component: () => import("./views/childrenViews/MyCourses.vue"),
          meta: {
            title: "我的信息"
          }
        },
        {
          path: "courseDetail",
          name: "my_course_detail",
          component: () => import("./views/childrenViews/MyCourseDetail.vue"),
          meta: {
            auth: "all",
            title: "我的课程详情"
          }
        },
        {
          path: 'myArticles',
          name: 'my_articles',
          component: () => import('./views/childrenViews/MyArticles.vue'),
          meta: {
            auth: 'all',
            title: '我的文章'
          }
        }
      ]
    },
    {
      path: "/emptyPage",
      name: "empty_page",
      component: () => import("./views/EmptyPage.vue")
    }
  ]
});

// 路由鉴权
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
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