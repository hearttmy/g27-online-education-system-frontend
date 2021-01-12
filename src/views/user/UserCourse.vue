<template>
  <div style="width: 772px; margin-left: 20px">
    <div>
      <UserCourseToolBar></UserCourseToolBar>
    </div>

    <el-tabs v-model="activeName" type="border-card" style="margin-top: 20px">
      <el-tab-pane :label="tabLabel">

        <div v-if="courseListInPage.length">
          <div style="margin-top: 10px; margin-bottom: 5px; overflow: hidden">
            <el-pagination
              background small style="float: right;"
              layout="prev, slot, next, jumper" :page-count="totalPage"
              :current-page.sync="currentPage">
              <span class="page-span">{{ currentPage }}/{{ totalPage }}</span>
            </el-pagination>
          </div>

          <div>
            <CourseLongCards :courses="courseListInPage"></CourseLongCards>
          </div>
        </div>

        <div v-else style="margin-top: 20px;">
          尚未加入课程
        </div>
      </el-tab-pane>

      <el-tab-pane label="我担任助教的课程">
        <div v-if="TACourseListInPage.length">
          <div style="margin-top: 10px; margin-bottom: 5px; overflow: hidden">
            <el-pagination
              background small style="float: right;"
              layout="prev, slot, next, jumper" :page-count="totalPageTA"
              :current-page.sync="currentPageTA">
              <span class="page-span">{{ currentPageTA }}/{{ totalPageTA }}</span>
            </el-pagination>
          </div>

          <div>
            <CourseLongCards :courses="TACourseListInPage"></CourseLongCards>
          </div>
        </div>

        <div v-else style="margin-top: 20px;">
          尚未成为课程助教
        </div>
      </el-tab-pane>
    </el-tabs>


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
      TACourses: [],
      pageSize: 4,
      currentPage: 1,
      currentPageTA: 1,
      activeName: '',
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
    TACourseListInPage() {
      if (this.currentPageTA * this.pageSize <= this.TACourses.length) {
        return this.TACourses.slice(
          (this.currentPageTA - 1) * this.pageSize,
          this.currentPageTA * this.pageSize)
      }
      else {
        return this.TACourses.slice((this.currentPageTA - 1) * this.pageSize, this.TACourses.length)
      }
    },
    totalPage() {
      return Math.ceil(this.courses.length / this.pageSize)
    },
    totalPageTA() {
      return Math.ceil(this.TACourses.length / this.pageSize)
    },
    tabLabel() {
      return this.$store.state.user.userType === 0 ? '我加入的课程' : '我执教的课程'
    },
  },
  created() {
    UserProvider.getMyCourse({},{
      headers: {'Authorization': this.$store.state.token},
    }).then(res => {
      if (res.state) {
        this.courses = res.info.map(value => {
          value['teacherName'] = value.teacher[0].realName
          return value
        })
        this.TACourses = res.TAcou.map(value => {
          value['teacherName'] = value.teacher[0].realName
          return value
        })
      }
    })
  },
}
</script>

<style scoped>
.page-span {
  min-width: 0px !important;
}
</style>
