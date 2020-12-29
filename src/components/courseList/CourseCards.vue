<template>
  <el-row class="course-wrapper">
    <el-col :span="span" v-for="(item, index) in courses" style="padding: 10px" :key="index">
      <el-card :body-style="{ padding: '0px' }" shadow="hover"
               @click.native="navToCourse(item.courseID)">
        <img class="course-cover" :src="$serverImgUrl + item.img">

        <div style="padding: 14px;">
          <p style="font-weight: bold;">{{item.coursename}}</p>
          <p style="font-size: 15px; color: #999;">开课时间：{{item.DurationTime}}</p>
          <p style="font-size: 14px; color: #999;">授课老师：{{item.teacherID}}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CourseCards",
  props: {
    courses: Array,
    span: {
      type: Number,
      default: 6,
    }
  },
  methods: {
    navToCourse(courseID) {
      this.$router.push('/course/'+ courseID + '/chapter')
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
  .el-card:hover {
    cursor: pointer;
  }
}
</style>
