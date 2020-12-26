<template>
  <el-row class="course-wrapper">
    <el-col :span="span" v-for="(item) in courses" style="padding-bottom: 20px" :key="item">
      <el-card :body-style="{ padding: '0px' }" shadow="hover"
               @click.native="navToCourse(item.courseID)">
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
  name: "CourseLongCards",
  props: {
    courses: Array,
    span: {
      type: Number,
      default: 24,
    }
  },
  methods: {
    navToCourse(courseID) {
      this.$router.push('/course/'+ courseID + '/chapter')
    }
  },
}
</script>

<style lang="scss" scoped>
.course-wrapper {
  .course-cover {
    height: 200px;
    width: 100%;
  }
  .el-card:hover {
    cursor: pointer;
  }
}
</style>
