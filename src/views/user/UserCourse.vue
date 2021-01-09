<template>
  <div style="width: 772px;">
    <div class="tool-bar">
      <UserCourseToolBar></UserCourseToolBar>
    </div>

    <div v-if="courseListInPage.length">
      <div style="margin-top: 10px; margin-bottom: 5px; overflow: hidden">
        <el-pagination
          background small style="float: right;"
          layout="prev, slot, next, jumper" :page-count="totalPage"
          :current-page.sync="currentPage">
          <span class="page-span">{{ currentPage }}/{{ totalPage }}</span>
        </el-pagination>
      </div>

      <div class="course-list-wrapper">
        <CourseLongCards :courses="courseListInPage"></CourseLongCards>
      </div>
    </div>

    <div v-else style="margin-top: 20px; margin-left: 20px">
      尚未加入课程
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
      if (this.currentPage * this.pageSize <= this.courses.length) {
        return this.courses.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
      else {
        return this.courses.slice((this.currentPage - 1) * this.pageSize, this.courses.length)
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
      this.courses = res.info.map(value => {
        value['teacherName'] = value.teacher[0].realName
        return value
      })
    })
  },
}
</script>

<style scoped>
.tool-bar {
  margin-left: 20px;
}
.course-list-wrapper {
  margin-left: 20px;
}

.page-span {
  min-width: 0px !important;
}
</style>
