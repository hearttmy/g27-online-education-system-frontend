<template>
  <el-card>
    <div class="homework-title-wrapper">{{homework.hwName}}</div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="作业要求" name="first">
        <el-card :body-style="{ padding: '0px', backgroundColor: 'rgba(247, 247, 247, 1)'}" shadow="never">
          <div class="field-wrapper">
            <div class="field">
              <span class="field-name">成绩比例</span>
              <div class="field-value">
                <span>{{homework.proportion}}%</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">成绩公布</span>
              <div class="field-value">
                <span>马上公布</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">作业形式</span>
              <div class="field-value">
                <span>{{homework.type}}</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">开放时间</span>
              <div class="field-value">
                <span>{{homework.beginDate}}</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">截止时间</span>
              <div class="field-value">
                <span>{{homework.deadline}}</span>
              </div>
            </div>

            <div class="field">
              <span class="field-name">完成指标</span>
              <div class="field-value">
                <span>提交作业</span>
              </div>
            </div>
          </div>
        </el-card>
        <div style="margin-top: 25px">
          {{homework.description}}
        </div>

        <div style="margin-top: 20px;">
          <div style="border-bottom: 1px solid #d8d8d8; color:#737373;">
            附件名
            <el-button style="margin-left: 20px; margin-bottom: 5px" type="primary" size="mini"
                       :disabled="overDeadline"
                       v-if="$store.state.isCourseTch"
                       @click="addFileDialogVisible = true">添加附件</el-button>
          </div>
          <el-dialog title="上传附件" :visible.sync="addFileDialogVisible">
            <el-upload :action="$serverApiUrl + '/course/fileToHW'"
                       :headers="tokenHeader "
                       :data="{hwID: homework._id}" :on-success="handleFileSuccess"
                       ref="upload" :auto-upload="false" :on-change="handleFileChange">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small"
                         type="success" @click="submitUpload()">上传到服务器</el-button>
            </el-upload>

            <div slot="footer">
              <el-button type="primary" @click="addFileDialogVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <div v-for="(item, i) in homework.File" :key="i">
            <HomeworkFile :file="item" :delete-disabled="!$store.state.isCourseTch"></HomeworkFile>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="作业批改" name="second" v-if="$store.state.isCourseTch">
        <HomeworkFileTable :tableData="allSubmit"></HomeworkFileTable>
      </el-tab-pane>


      <el-tab-pane label="我的作业" name="third" v-else>
        <div>
          <div v-for="(item, i) in mySubmit" :key="i" style="margin-bottom: 20px">
            <HomeworkFile :file="item" :delete-disabled="overDeadline"></HomeworkFile>
          </div>
          <el-button type="primary" @click="submitDialogVisible = true"
                     :disabled="overDeadline">提交作业</el-button>

          <el-dialog title="上传作业" :visible.sync="submitDialogVisible">
            <el-upload :action="$serverApiUrl + '/course/submitHW'"
                       :headers="tokenHeader "
                       :data="{hwID: homework._id}" :on-success="handleFileSuccess"
                       ref="upload" :auto-upload="false" :on-change="handleFileChange">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small"
                         type="success" @click="submitUpload()">上传到服务器</el-button>
            </el-upload>
            <div slot="footer">
              <el-button type="primary" @click="submitDialogVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from "moment";
import MaterialBtn from "@/components/course/MaterialBtn";
import HomeworkFile from "@/components/course/homework/HomeworkFile";
import HomeworkFileTable from "@/components/course/homework/HomeworkFileTable";

export default {
  name: "HomeworkDetail",
  components: {HomeworkFileTable, HomeworkFile, MaterialBtn},
  data() {
    return {
      activeName: 'first',
      homework: {},
      addFileForm: {},
      mySubmit: [],
      allSubmit: [],
      tokenHeader: {'Authorization': this.$store.state.token},
      addFileDialogVisible: false,
      submitDialogVisible: false,
      overDeadline: false,
    }
  },
  created() {
    this.getHW()
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'third') {
        this.getMySubmit()
      }
      else if (tab.name === 'second') {
        this.getAllSubmit()
      }
    },
    isPassed(time) {
      const tmp = new Date(time).valueOf()
      const now = new Date().valueOf()
      if (tmp < now) {
        return 1
      }
      else {
        return 0
      }
    },
    getHW() {
      CourseProvider.getHW({
        params: {
          courseID: this.$route.params.course_id,
        }
      })
      .then(res => {
        if (res.state) {
          this.homework = res.HW[this.$route.params.homework_index]
          this.homework.beginDate = moment(this.homework.beginDate).format('yyyy-MM-DD HH:mm:ss')
          this.homework.deadline = moment(this.homework.deadline).format('yyyy-MM-DD HH:mm:ss')
          if (this.isPassed(this.homework.deadline)) {
            this.overDeadline = true
          } else {
            this.overDeadline = false
          }
        }
      })
    },
    getAllSubmit() {
      if (this.$store.state.isCourseTch) {
        CourseProvider.getSubmit({
          headers: this.tokenHeader,
          params: {hwID: this.homework._id,},
        }).then(res => {
          this.allSubmit = res.HW
        })
      }
    },
    getMySubmit() {
      CourseProvider.mySubmit({
        headers: this.tokenHeader,
        params: {'hwID': this.homework._id},
      }).then(res => {
        if (res.state) {
          this.mySubmit = res.HW
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleFileSuccess(res, file) {
      if (res.state) {
        this.$message({
          showClose: true,
          message: '上传成功',
          type: 'success'
        });
        this.$refs.upload.clearFiles()
        this.getHW()
        this.getMySubmit()
      }
      else {
        this.$message({
          showClose: true,
          message: '您已提交过该作业, 请删除后再提交',
          type: 'warning',
        });
      }
    },
    handleFileChange(file, fileList) {
      this.myFileList = fileList
    },
  },
}
</script>

<style lang="scss" scoped>
.homework-title-wrapper {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.field-wrapper {
  padding: 20px;
  overflow: hidden;
  .field {
    width: 31%;
    float: left;
    padding: 10px;
    .field-name {
      color:#737373;
      display: inline-block;
    }
    .field-value {
      display: inline-block;
      margin-left: 40px;
      max-width: 180px;
    }
  }
}
</style>
