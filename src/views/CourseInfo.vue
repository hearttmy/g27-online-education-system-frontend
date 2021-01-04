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
            {{course.teacherID}}
          </p>
        </div>
        <div style="margin-top: 70px">
          <el-button type="primary" class="courseInfo-button"
                     v-if="!isTakeCourse" @click="JoinCourse"
                     key="takeCourse">加入课程</el-button>
          <el-button type="success" class="courseInfo-button"
                     v-else @click="NavToCourse(course.courseID)"
                     key="enterCourse">已参加，进入课程</el-button>
        </div>

      </div>
    </el-card>
    <div style="margin-top: 20px">
      <Outline></Outline>
    </div>

  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import CourseInfoProvider from "@/network/request/courseInfo";
import Outline from "@/views/course/Outline";
export default {
  name: "CourseInfo",
  components: {Outline, MainLayout},
  data() {
    return {
      isTakeCourse: false,
    }
  },
  async created() {
    await this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
    if (!this.$store.state.user.userType) {
      this.IsTakeCourse()
    }
    else if (this.$store.state.isCourseTch) {
      this.isTakeCourse = true
    }
    else {
      this.isTakeCourse = false
    }
  },
  computed: {
    course() {
      return this.$store.state.course
    },
  },
  methods: {
    JoinCourse() {
      if (!this.$store.state.isLogin) {
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning',
        });
        return
      }
      if (!this.$store.state.isCourseTch && this.$store.state.user.userType === 1) {
        this.$message({
          showClose: true,
          message: '教师无法加入非执教课程',
          type: 'warning',
        })
        return
      }

      CourseInfoProvider.JoinCourse({
        params: {courseID: this.course.courseID},
        headers: {'Authorization': this.$store.state.token}
      })
      .then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '加入成功',
            type: 'success',
          });
        }
      })
      .catch(err => {

      })
      this.IsTakeCourse()
    },

    IsTakeCourse() {
      if (this.$store.state.isLogin) {
        CourseInfoProvider.IsSelect({
          params: {courseID: this.course.courseID},
          headers: {'Authorization': this.$store.state.token}
        }).then(res => {
          if (res.state) {
            this.isTakeCourse = true
          }
          else {
            this.isTakeCourse = false
          }
        })
      }
    },
    NavToCourse(courseID) {
      this.$router.push('/course/'+ courseID + '/chapter')
    }
  }
}
</script>

<style lang="scss" scoped>
.courseInfo-img-wrapper {
  width: 48%;
  height: 288px;
  float: left;
  img {
    width: 100%;
    height: 100%;
  }
}
.courseInfo-title-wrapper {
  width: 50%;
  float: right;
  vertical-align: baseline;
}

.courseInfo-button {
  width: 220px;
  height: 52px;
  font-size: 20px;
}
</style>
