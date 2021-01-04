<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="学号">
      <template slot-scope="scope">
        {{tableData[scope.$index].stu[0].id}}
      </template>
    </el-table-column>

    <el-table-column label="学生姓名">
      <template slot-scope="scope">
        {{tableData[scope.$index].stu[0].realName}}
      </template>
    </el-table-column>

    <el-table-column label="提交时间">
      <template slot-scope="scope">
        {{submitTime(tableData[scope.$index].time)}}
      </template>
    </el-table-column>

    <el-table-column label="成绩">
      <template slot-scope="scope">
        {{tableData[scope.$index].grade === -1 ? '未批改' : tableData[scope.$index].grade}}
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="download(scope.$index)">下载</el-button>
        <el-button type="text" size="small" @click="">批改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import CourseProvider from "@/network/request/course";
import axios from "axios";
import moment from "moment";

export default {
  name: "HomeworkFileTable",
  props: {
    tableData: Array,
  },
  methods: {
    submitTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    download(index) {
      axios.get(this.$serverBaseUrl + this.tableData[index].fileUrl, {
        responseType: 'blob',
      })
        .then(res => {
          if (res) {
            const blob = new Blob([res.data]);
            if ('download' in document.createElement('a')) {
              //支持a标签download的浏览器
              const link = document.createElement('a')//创建a标签
              link.download = this.tableData[index].fileName//a标签添加属性
              link.style.display = 'none'
              link.href = URL.createObjectURL(blob)
              document.body.appendChild(link)
              link.click()
              URL.revokeObjectURL(link.href) //释放url
              document.body.removeChild(link)//释放标签
            }
          }
        })
        .catch((err) => {
          //err
        });
    }
  },
}
</script>

<style scoped>

</style>
