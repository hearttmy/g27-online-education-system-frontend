<template>
<MainLayout :lg="20">
  <div>
    <CourseTitleCard :course="course"></CourseTitleCard>
  </div>
  <div>
    <CourseNavBar :course="course"></CourseNavBar>
  </div>
  <div class="tool-bar-wrapper">
    <CourseToolBar :course="course" @changeDeleteMode="changeDeleteMode"></CourseToolBar>
  </div>
  <div class="content-wrapper">
    <router-view :course="course" :deleteMode="deleteMode"></router-view>
  </div>
</MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import CourseTitleCard from "@/components/course/CourseTitleCard";
import CourseNavBar from "@/components/course/CourseNavBar";
import CourseToolBar from "@/components/course/CourseToolBar";
import CourseProvider from "@/network/request/course";

export default {
  name: "Course",
  components: {CourseToolBar, CourseNavBar, CourseTitleCard, MainLayout},
  data() {
    return {
      course: {},
      deleteMode: false,
    }
  },
  created() {
    CourseProvider.getCourseInfo({
      params: {
        'courseID': this.$route.params.course_id
      }
    })
    .then(res => {
      console.log(res)
      this.course = res
    })
  },
  methods: {
    changeDeleteMode() {
      this.deleteMode = !this.deleteMode
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-top: 5px;
}

.tool-bar-wrapper {
  margin-top: 20px;
}
</style>
