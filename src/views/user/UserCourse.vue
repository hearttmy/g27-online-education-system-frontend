<template>
  <div style="width: 876px;">
    <div class="tool-bar">
      <UserCourseToolBar></UserCourseToolBar>
    </div>

    <div style="margin-top: 10px; margin-bottom: 10px">
      <el-pagination
        background small style="float: right;"
        layout="prev, slot, next, jumper" :page-count="totalPage"
        :current-page.sync="currentPage">
        <span class="page-span">{{ currentPage }}/{{ totalPage }}</span>
      </el-pagination>
    </div>

    <div class="course-list-wrapper">
      <CourseLongCards :courses="courses"></CourseLongCards>
    </div>
  </div>

</template>

<script>
import UserCourseToolBar from "@/components/user/UserCourseToolBar";
import CourseLongCards from "@/components/common/CourseLongCards";
import UserProvider from "@/network/request/user";

export default {
  name: "UserCourse",
  components: {UserCourseToolBar, CourseLongCards},
  data() {
    return  {
      courses: [],
      pageSize: 4,
      currentPage: 1,
    }
  },
  computed: {
    courseListInPage() {
      if (this.currentPage * 6 <= this.courses.length) {
        return this.courses.slice((this.currentPage - 1) * 6, this.currentPage * 6)
      }
      else {
        return this.courses.slice((this.currentPage - 1) * 6, this.courses.length)
      }
    },
    totalPage() {
      return Math.ceil(this.courses.length / this.pageSize)
    }
  },
  created() {
    UserProvider.getMyCourse({},{
      headers: {'Authorization': this.$store.state.token},
    }).then(res => {
      this.courses = res.info[0].course
    })
  },
}
</script>

<style scoped>
.tool-bar {
  margin-left: 20px;
}
.course-list-wrapper {
  margin-top: 20px;
  margin-left: 20px;
}

.page-span {
  min-width: 0px !important;
}
</style>
