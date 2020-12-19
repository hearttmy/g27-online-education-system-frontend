<template>
  <el-card class="course" :body-style="{ padding: '15px' }">
    <div class="cover">
      <img :src="$serverBaseUrl + course.cover" style="width: 100%;" />
    </div>
    <div>
      <span class="title">{{ course.coursename }}</span>
      <span class="teacher">教师：{{ course.tch[0].username }}</span>
      <div class="control">
        <el-button type="text" class="button" @click="enterCourse"
          >进入课程</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: {}
    }
  },
  methods: {
    enterCourse() {
      window.sessionStorage.setItem(
        'exercises.current_coursename',
        this.course.coursename
      );
      window.sessionStorage.setItem(
        'exams.current_coursename',
        this.course.coursename
      );
      this.$router.push({ path: `/course/${this.course.courseID}/index` });
    }
  }
};
</script>

<style lang="scss" scoped>
.course {
  position: relative;

  .cover {
    width: 100%;
    height: 170px;
    overflow: hidden;
    background-color: #efefef;
  }

  .title {
    display: block;
    padding-top: 10px;
    text-align: center;
    font-size: 1.1rem;
    color: #222;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .teacher {
    display: block;
    padding: 10px 0 35px;
    text-align: center;
    font-size: 0.8rem;
    color: #777;
  }

  .control {
    text-align: center;
    border-top: 1px solid #eee;
  }
}

.el-button {
  padding: 20px 0 10px;
}
</style>
