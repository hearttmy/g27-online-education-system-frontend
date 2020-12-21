<template>
<MainLayout>
  <el-row type="flex" class="carousel-wrapper" justify="space-between">
    <el-card class="index-box" shadow="never">
      <el-menu>
        <el-menu-item v-for="item in courseIndex" :key="item">{{item}}</el-menu-item>
      </el-menu>
    </el-card>

<!--    <el-carousel class="my-carousel" v-if="courses.length">-->
<!--      <el-carousel-item v-for="(course, index) in courses"-->
<!--                        :key="index"-->
<!--                        style="cursor:pointer;"-->
<!--                        @click="$router.push({path: `/course/${course.courseID}/index`})">-->
<!--        <img-->
<!--          :src="$serverBaseUrl + course.cover"-->
<!--          :alt="course.coursename"-->
<!--          :title="course.coursename"-->
<!--          @click.prevent=""/>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->

    <el-card class="login-box" shadow="never">
      <div class="avatar-box">
        <el-avatar :src="require('@/assets/img/logo.png')" :size="100"></el-avatar>
      </div>
      <div class="login-btn-box">
        <el-button type="success" round>登录/注册</el-button>
      </div>
    </el-card>
  </el-row>

  <el-row class="title-wrapper">
    <div>推荐课程</div>
  </el-row>


  <el-row class="course-wrapper">
      <el-col :span="6" v-for="(item, index) in courses" :key="item"
              style="padding: 10px 10px 0px 5px">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img class="course-cover" src="~@/assets/img/logo.png">

          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
  </el-row>

</MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";

export default {
  name: "Home",
  components: {MainLayout},
  data() {
    return {
      carouselItems: [],
      courses: [1, 2, 3, 4, 5, 6],
      courseIndex: ['全部课程', '理学', '工学', '哲学', '美术'],
      tmpUrl: '~@/assets/img/logo.png',
    };
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  height: 330px;
  .index-box {
    width: 200px;
    overflow: auto;
    .el-menu {
      border-right: 0;
    }
  }
  .my-carousel {
    display: inline-block;
    width: 100%;
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

.course-wrapper {
  margin-top: 20px;
  .course-cover {
    height: 200px;
    width: 100%;
  }
}

</style>
