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
        <el-button type="text" size="small" @click="correctDialog = true">批改</el-button>

        <el-dialog title="作业批改" :visible.sync="correctDialog">
          <el-form :model="correctForm"
                   ref="correctForm" label-width="80px">
            <el-form-item label="成绩">
              <el-input v-model.number="correctForm.grade" style="width: 200px"></el-input>
            </el-form-item>

            <el-form-item label="评语">
              <el-input type="textarea" v-model="correctForm.comment" :autosize="{ minRows: 9}"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer">
            <el-button @click="correctDialog = false">取 消</el-button>
            <el-button type="primary" @click="correct('correctForm', scope.$index)">确 定</el-button>
          </div>
        </el-dialog>

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
  data() {
    return {
      correctDialog: false,

      correctForm: {

      },
      hwScore: 0,
      hwComment: '',
    }
  },
  methods: {
    submitTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    correct(formName, index) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.correctForm['hwID'] = this.tableData[index]._id
          CourseProvider.correctHW(this.correctForm)
          .then(res => {
            if (res.state) {
              this.$message({
                showClose: true,
                message: '作业批改成功',
                type: 'success',
              })
              this.correctDialog = false
              this.$router.go(0)
            }
          })
        }
      })

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
