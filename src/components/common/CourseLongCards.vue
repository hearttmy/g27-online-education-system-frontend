<template>
  <div class="course-wrapper">
    <el-col :span="span" v-for="(course, index) in courses" style="padding-bottom: 12px" :key="index">
      <el-card :body-style="'overflow: hidden; padding: 10px;'" shadow="hover"
               @click.native="navToCourse(course.courseID)">
        <img class="course-cover" :src="$serverImgUrl + course.img">

        <div class="course-title">
          <p style="font-weight: bold;">{{course.courseName}}</p>
          <p style="font-size: 15px; color: #999;">开课时间：{{course.DurationTime}}</p>
          <p style="font-size: 14px; color: #999;">授课老师：{{course.teacherName}}</p>
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
    navTarget: {
      type: Number,
      default: 0,
    },
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
      this.$router.push('/courseInfo/' + courseID)
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
    height: 150px;
  }
  .course-title {
    float: left;
    margin-left: 30px;
    padding: 14px;
  }

}
</style>
