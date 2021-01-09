<template>
  <div>
    <el-table v-if="tableData.length" :data="tableData" style="width: 100%">
      <el-table-column  label="作业名称" width="300" fixed>
        <template slot-scope="scope">
          <div style="font-weight: bold; font-size: 18px">{{tableData[scope.$index].hwName}}</div>
          <div>起始时间：{{tableData[scope.$index].beginDate}}</div>
          <div>截止时间：{{tableData[scope.$index].deadline}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="作业形式">
      </el-table-column>

      <el-table-column label="作业状态">
        <template slot-scope="scope">
          {{isPassed(tableData[scope.$index].deadline)}}
        </template>
      </el-table-column>

      <el-table-column label="已交人数" v-if="$store.state.isCourseTch">
        <template slot-scope="scope">
          {{tableData[scope.$index].NumOfSub}} / {{$store.state.course.students.length}}
        </template>
      </el-table-column>

      <el-table-column label="提交状态" v-else>
        <template slot-scope="scope">
          {{submitState[scope.$index][0] === 1 ? '已提交' : '未提交'}}
        </template>
      </el-table-column>

      <el-table-column label="成绩" v-if="!$store.state.isCourseTch">
        <template slot-scope="scope">
          {{submitState[scope.$index][1] === -1 ? '暂无成绩' : submitState[scope.$index][1]}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="homeworkDetail(scope.$index)">查看</el-button>
          <el-button v-if="$store.state.deleteMode" style="color: red" type="text" size="small" @click="homeworkDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-else style="margin-top: 20px">暂无作业</div>
  </div>
</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from 'moment'

export default {
  name: "Homework",
  data() {
    return {
      hwData: [
      ],
      submitState: [],
      grade: [],
    }
  },
  computed: {
    tableData() {
      return this.hwData.map(value => {
        value.beginDate = moment(value.beginDate).format('yyyy-MM-DD HH:mm:ss')
        value.deadline = moment(value.deadline).format('yyyy-MM-DD HH:mm:ss')
        return value
      })
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      CourseProvider.getHW({
        params: {
          courseID: this.$route.params.course_id,
        }
      })
        .then(res => {
          if (res.state) {
            this.hwData = res.HW
          }
        })
      if (!this.$store.state.isCourseTch) {
        CourseProvider.isSubmit({
          headers: {'Authorization': this.$store.state.token},
          params: {'courseID': this.$route.params.course_id},
        }).then(res => {
          if (res.state) {
            this.submitState = res.isSubmit
          }
        })
      }
    },
    isPassed(time) {
      const tmp = new Date(time).valueOf()
      const now = new Date().valueOf()
      if (tmp < now) {
        return '已截止'
      }
      else {
        return '未截止'
      }
    },
    homeworkDetail(rowIndex) {
      this.$router.push('/course/' + this.$route.params.course_id
        + '/homework/' + rowIndex + '/homeworkDetail')
    },
    homeworkDelete(rowIndex) {
      CourseProvider.delHW({
        hwID: this.hwData[rowIndex]._id
      }).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '删除作业成功',
            type: 'success'
          })
          this.getData()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
