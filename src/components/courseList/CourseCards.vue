<template>
  <el-row class="course-wrapper">
    <el-col :span="span" v-for="(item) in courses" style="padding: 12px">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img class="course-cover" src="~@/assets/img/logo.png">

        <div style="padding: 14px;">
          <p>课程标题</p>
          <p>开课时间</p>
          <p>课程教师</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CourseCards",
  props: {
    courses: '',
    span: {
      type: Number,
      default: 6,
    }
  }
}
</script>

<style lang="scss" scoped>
.course-wrapper {
  margin-top: 15px;
  .course-cover {
    height: 200px;
    width: 100%;
  }
}
</style>
