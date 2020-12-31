<template>
  <div style="width: 876px;">
    <div class="tool-bar">
      <UserCourseToolBar></UserCourseToolBar>
    </div>
    <div class="course-list-wrapper">
      <CourseLongCards :courses="courses"></CourseLongCards>
    </div>
  </div>

</template>

<script>
import UserCourseToolBar from "@/components/user/UserCourseToolBar";
import CourseLongCards from "@/components/common/CourseLongCards";

export default {
  name: "UserCourse",
  components: {UserCourseToolBar, CourseLongCards},
  data() {
    return  {
      courses: [1, 2, 3, 4],
    }
  }
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
</style>
