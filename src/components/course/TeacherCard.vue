<template>
  <el-card shadow="always" class="tch-card">
    <div slot="header">
      <span>教师简介</span>
    </div>
    <el-row class="avatar-box">
      <img
        :src="
          tch.avatar
            ? $serverBaseUrl + tch.avatar
            : $serverBaseUrl + '/static/img/avatar/default.png'
        "
        alt
        class="avatar"
      />
      <span class="tch-name">{{ tch.username }}</span>
    </el-row>
    <el-row class="other-courses-box">
      <span class="other-course-title">其他课程</span>
      <span class="no-other-course" v-if="teaching.length === 0"
        >暂无该教师的其他课程</span
      >
      <span
        class="other-course"
        v-for="(course, index) in teaching"
        :key="index"
        >{{ course.coursename }}</span
      >
    </el-row>
  </el-card>
</template>

<script>
export default {
  computed: {
    teaching() {
      if (this.tch.teaching) {
        return this.tch.teaching.filter(course => {
          return course.courseID !== this.$route.params.course_id;
        });
      }
      return [];
    }
  },
  props: {
    tch: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.tch-card {
  margin-bottom: 30px;
}

.avatar-box {
  margin-bottom: 20px;
  text-align: center;

  .avatar {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 50%;
  }

  .tch-name {
    display: block;
  }
}

.other-courses-box {
  text-align: center;

  .other-course-title {
    display: block;
    padding: 10px;
    background-color: #f3f3f3;
  }

  .no-other-course {
    display: block;
    padding: 10px;
    font-size: 0.9rem;
    color: #909090;
  }

  .other-course {
    display: inline-block;
    padding: 10px;
  }
}
</style>
