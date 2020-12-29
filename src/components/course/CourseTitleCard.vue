<template>
  <el-card class="course-title-wrapper" >
    <div class="text-wrapper">
      <div style="font-weight: bold; font-size: 24px">
        {{course.courseName}}
      </div>
      <div style="margin-top: 20px">
        <span style="margin-right: 20px">{{course.DurationTime}}</span>
      </div>
      <div style="margin-top: 35px">
        <p style="font-weight: bold">授课老师</p>
        <p>
          <span v-for="(item, i) in course.teacher" :key="i">{{item.username}} </span>
        </p>
      </div>

    </div>
    <div class="img-wrapper">
      <img :src="$serverImgUrl + course.img">
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CourseTitleCard",
  props: {
    course: Object,
  },

}
</script>

<style lang="scss" scoped>
.course-title-wrapper {
  .text-wrapper {
    display: inline-block;
  }
  .img-wrapper {
    float: right;
    margin-left: 300px;
    img {
      width: 300px;
      height: 170px;
    }
  }
}
</style>
