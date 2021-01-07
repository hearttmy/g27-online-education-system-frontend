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
      <el-button style="margin-right: 5px" icon="el-icon-user" @click="TADialog = true"
      v-if="!$store.state.isCourseTA && $store.state.isCourseTch">设置助教</el-button>

      <el-dialog :visible.sync="TADialog">
        <span>助教学号/工号：</span>
        <el-input style="width: 200px" v-model="TA_ID"></el-input>

        <div slot="footer">
          <el-button type="primary" @click="addTA()">确 定</el-button>
        </div>
      </el-dialog>


      <el-button icon="el-icon-user" @click="memberDialogVisible = true">班级学生</el-button>
      <el-dialog :visible.sync="memberDialogVisible">
        <el-table
          :data="$store.state.course.studentInfo"
          style="width: 100%"
          border>
          <el-table-column prop="realName" label="姓名">

          </el-table-column>

          <el-table-column prop="id" label="学号">

          </el-table-column>
        </el-table>

        <div slot="footer">
          <el-button type="primary" @click="memberDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";

export default {
  name: "CourseTitleCard",
  data() {
    return {
      memberDialogVisible: false,
      TADialog: false,
      TA_ID: '',
    }
  },
  computed: {
    course() {
      return this.$store.state.course
    }
  },
  methods: {
    addTA() {
      CourseProvider.addTA({
        courseID: this.$route.params.course_id,
        TA_ID: this.TA_ID,
      }).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '设置助教成功',
            type: 'success'
          })
          this.TADialog = false
        } else {
          this.$message({
            showClose: true,
            message: '学号或工号不存在',
            type: 'warning'
          })
        }
      })
    }
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
