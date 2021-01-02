<template>
<MainLayout :lg="20">
  <div>
    <CourseTitleCard></CourseTitleCard>
  </div>
  <div>
    <CourseNavBar></CourseNavBar>
  </div>
  <div class="tool-bar-wrapper">
    <CourseToolBar v-if="$store.state.user.userType"></CourseToolBar>
  </div>
  <div class="content-wrapper">
    <router-view></router-view>
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
  created() {
    this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
  },
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
