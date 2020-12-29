<template>
<MainLayout>
  <el-row type="flex" class="carousel-wrapper" justify="space-between">
    <el-card class="index-box" shadow="never">
      <el-menu @select="selectIndex">
        <el-menu-item v-for="(item, i) in courseIndex" :index="i.toString()" :key="i">
          {{item}}
        </el-menu-item>
      </el-menu>
    </el-card>

    <el-carousel class="my-carousel" v-if="courses.length" trigger="click">
      <el-carousel-item v-for="(course, index) in courses"
                        :key="index"
                        style="cursor:pointer;"
                        @click.native="navToCourse(course.courseID)">
        <img :src="$serverImgUrl + course.img" :alt="course.coursename"/>
      </el-carousel-item>
    </el-carousel>

    <el-card class="login-box" shadow="never">
      <div class="avatar-box">
        <el-avatar :src="$store.state.avatarUrl" :size="100"></el-avatar>
      </div>
      <div class="login-btn-box">
        <el-button v-if="!$store.state.isLogin" type="success" round
                   @click="$router.push('/auth/login')">
          登录/注册
        </el-button>

        <el-button v-else type="success" round
                   @click="$router.push('/user')">
          个人中心
        </el-button>
      </div>
    </el-card>
  </el-row>

  <el-row class="title-wrapper">
    <div>推荐课程</div>
  </el-row>
  <CourseCards :courses="courses"></CourseCards>

</MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import HomeProvider from "@/network/request/home";
import CourseCards from "@/components/courseList/CourseCards";

export default {
  name: "Home",
  components: {CourseCards, MainLayout},
  data() {
    return {
      courses: [],
      courseIndex: ['全部课程', '理学', '工学', '哲学', '经济学'],
      tmpUrl: '~@/assets/img/logo.png',
    };
  },
  created() {
    HomeProvider.getAllCourse()
    .then(res => {
      this.courses = res.data
    })
  },
  methods: {
    selectIndex(index) {
      this.$router.push({
        name: 'courseList',
        query: {
          index,
        }
      })
    },
    navToCourse(courseID) {
      this.$router.push('/course/'+ courseID + '/content')
    }
  },
}
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  height: 300px;
  .index-box {
    width: 150px;
  }
  .my-carousel {
    display: inline-block;
    width: 724px;
  }

  .login-box {
    width: 200px;
    .avatar-box {
      margin-top: 30px;
      text-align: center;
    }
    .login-btn-box {
      margin-top: 30px;
      text-align: center;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
}

.title-wrapper {
  margin-top: 30px;
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
}



</style>
