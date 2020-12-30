<template>
  <div class="course-wrapper">
    <el-col :span="span" v-for="(item, index) in courses" style="padding-bottom: 20px" :key="index">
      <el-card :body-style="'overflow: hidden'" shadow="hover"
               @click.native="navToCourse(item.courseID)">
        <img class="course-cover" src="~@/assets/img/logo.png">

        <div class="course-title">
          <p style="font-weight: bold;">123{{item.courseName}}</p>
          <p style="font-size: 15px; color: #999;">开课时间：{{item.DurationTime}}</p>
          <p style="font-size: 14px; color: #999;">授课老师：{{item.teacherID}}</p>
          <p style="font-size: 14px; color: #999;">您在本课程的身份：{{item.teacherID}}</p>
        </div>
      </el-card>
    </el-col>
  </div>
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
  data() {
    return {
      option: [
        {
          label: '课程时间',
          options: [],
          value: '',
        },
      ],
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
  .el-card:hover {
    cursor: pointer;
  }
  .course-cover {
    float: left;
    width: 30%;
    height: 200px;
  }
  .course-title {
    float: left;
    margin-left: 30px;
    padding: 14px;
  }

}
</style>
