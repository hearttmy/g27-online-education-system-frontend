<template>
  <div>
    <el-table v-if="tableData.length" :data="tableData" style="width: 100%">
      <el-table-column  label="作业名称" :width="400">
        <template slot-scope="scope">
          <div style="font-weight: bold; font-size: 18px">{{tableData[scope.$index].hwName}}</div>
          <div>起始时间：{{tableData[scope.$index].beginDate}}</div>
          <div>截止时间：{{tableData[scope.$index].deadline}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="作业形式">
      </el-table-column>

      <el-table-column prop="state" label="状态">
      </el-table-column>
      <el-table-column prop="score" label="成绩">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="homeworkDetail(scope.$index)">查看</el-button>
          <el-button v-if="$store.state.deleteMode" style="color: red" type="text" size="small" @click="homeworkDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-else>暂无作业</div>
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
        {
          hwName: 'tmy',
          beginDate: '2020/4/16',
          deadline: '2020/4/16',
          type: '分组作业',
          state: '未交',
          score: '0',
        }
      ],
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
    CourseProvider.getHW({
      params: {
        courseID: this.$route.params.course_id,
      }
    })
    .then(res => {
      console.log(res)
      if (res.state) {
        this.hwData = res.HW
      }
    })
  },
  methods: {
    homeworkDetail(rowIndex) {
      this.$router.push('/course/' + this.$route.params.course_id
        + '/homework/' + rowIndex + '/homeworkDetail')
    },
    homeworkDelete(rowIndex) {
      this.$router.push('/course/' + this.$route.params.course_id
        + '/homework/' + rowIndex + '/homeworkDetail')
    }
  }
}
</script>

<style scoped>

</style>
