<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="stuID" label="学号">
      </el-table-column>

      <el-table-column prop="realName" label="学生姓名">
      </el-table-column>

      <el-table-column prop="hwScore" label="平时成绩">
      </el-table-column>

      <el-table-column prop="finalScore" label="考试成绩">
      </el-table-column>

      <el-table-column label="最终成绩">
        <template slot-scope="scope">
          {{tableData[scope.$index].hwScore + tableData[scope.$index].finalScore}}
        </template>
      </el-table-column>

      <el-table-column label="操作" v-if="$store.state.isCourseTch">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openScoreDialog(scope.$index)" :disabled="$store.state.isCourseTA">
            导入考试成绩
          </el-button>



        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="导入考试成绩" :visible.sync="scoreDialog">
      <el-form :model="scoreForm"
               ref="scoreForm" label-width="80px">
        <el-form-item label="成绩">
          <el-input v-model.number="scoreForm.grade" style="width: 200px"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button @click="scoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="setScore('scoreForm')">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";

export default {
  name: "Score",
  data() {
    return {
      tableData: [],
      scoreForm: {
        grade: 0,
        gradeID: '',
      },
      scoreDialog: false,
    }
  },
  created() {
    if (!this.$store.state.user.userType) {
      this.getGrade()
    }
    else if (this.$store.state.isCourseTch) {
      this.getAllGrade()
    }
  },
  methods: {
    getAllGrade() {
      CourseProvider.getAllGrade({
        courseID: this.$store.state.course.courseID
      })
      .then(res => {
        this.tableData = res.stuGrade.map(value => {
          value['stuID'] = value.stu[0].id
          value['realName'] = value.stu[0].realName
          return value
        })
      })
    },
    getGrade() {
      CourseProvider.getGrade({
        courseID: this.$store.state.course.courseID
      }, {
        headers: {'Authorization': this.$store.state.token}
      })
      .then(res => {
        console.log(res)
        this.tableData = res.Grade.map(value => {
          value['stuID'] = value.stu[0].id
          value['realName'] = value.stu[0].realName
          return value
        })
      })
    },
    openScoreDialog(index) {
      this.scoreForm.gradeID = this.tableData[index]._id
      this.scoreDialog = true
    },
    setScore(formName, index) {
      CourseProvider.setExamGrade(this.scoreForm).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '导入成绩成功',
            type: 'success',
          })
          this.scoreForm.grade = 0
          this.scoreDialog = false
          this.getAllGrade()
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
