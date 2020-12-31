<template>
  <el-card class="course-title-wrapper" :body-style="'overflow: hidden'">
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
    <div class="btn-wrapper">
      <el-button icon="el-icon-user" @click="memberDialogVisible = true">班级成员</el-button>
      <el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="memberDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CourseTitleCard",
  data() {
    return {
      memberDialogVisible: false,
    }
  },
  computed: {
    course() {
      return this.$store.state.course
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.course-title-wrapper {
  overflow: hidden;
  .text-wrapper {
    float: left;
  }
  .btn-wrapper {
    float: right;
    margin-top: 120px;
    margin-right: 50px;
  }
  .img-wrapper {
    float: right;
    img {
      width: 300px;
      height: 170px;
    }
  }
}
</style>
