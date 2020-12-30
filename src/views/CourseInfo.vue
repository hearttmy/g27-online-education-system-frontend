<template>
  <MainLayout>
    <el-card :body-style="'overflow: hidden'">
      <div class="courseInfo-img-wrapper">
        <img :src="$serverImgUrl + course.img">
      </div>
      <div class="courseInfo-title-wrapper">
        <div style="font-weight: bold; font-size: 24px">
          {{course.courseName}}
        </div>
        <div style="margin-top: 20px">
          开课时间：{{course.DurationTime}}
        </div>
        <div style="margin-top: 35px">
          <p style="font-weight: bold">授课老师：
            <span v-for="(item, i) in course.teacher" :key="i">{{item.username}} </span>
          </p>
        </div>
        <div style="margin-top: 70px">
          <el-button type="primary" class="courseInfo-button" @click="takeCourse">加入课程</el-button>
        </div>

      </div>
    </el-card>
    <el-card style="margin-top: 20px">

    </el-card>
  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
export default {
  name: "CourseIntro",
  components: {MainLayout},
  created() {
    this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
  },
  computed: {
    course() {
      return this.$store.state.course
    }
  },
  methods: {
    takeCourse() {

    }
  }
}
</script>

<style lang="scss" scoped>
.courseInfo-img-wrapper {
  width: 510px;
  height: 288px;
  margin-left: 20px;
  float: left;
  img {
    width: 100%;
    height: 100%;
  }
}
.courseInfo-title-wrapper {
  width: 600px;
  float: right;
  vertical-align: baseline;
}

.courseInfo-button {
  width: 220px;
  height: 52px;
  font-size: 20px;
}
</style>
