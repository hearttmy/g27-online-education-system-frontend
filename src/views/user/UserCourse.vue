<template>
  <div>
    <div class="tool-bar">
      <CourseToolBar></CourseToolBar>
    </div>
    <div class="course-list-wrapper">
      <CourseLongCards :courses="courses"></CourseLongCards>
    </div>
  </div>

</template>

<script>
import CourseToolBar from "@/components/user/CourseToolBar";
import CourseLongCards from "@/components/courseList/CourseLongCards";

export default {
  name: "UserCourse",
  components: {CourseToolBar, CourseLongCards},
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
