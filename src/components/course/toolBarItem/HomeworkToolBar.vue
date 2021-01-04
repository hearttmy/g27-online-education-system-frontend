<template>
  <el-row>
    <el-button type="primary" @click="addHomeworkDialog = true">添加作业</el-button>
    <DeleteBtn></DeleteBtn>

    <el-dialog title="添加作业" :visible.sync="addHomeworkDialog">
      <el-form :model="addHomeworkForm"
               :rules="addHomeworkFormRules"
               ref="addHomeworkForm" :label-width="'120px'" style="width: 400px">
        <el-form-item label="作业名称" prop="hwName">
          <el-input v-model="addHomeworkForm.hwName"></el-input>
        </el-form-item>

        <el-form-item label="作业形式" prop="type">
          <el-select v-model="addHomeworkForm.type" placeholder="请选择">
            <el-option
              v-for="(item, i) in typeOptions"
              :key="i" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="成绩比例" prop="proportion">
          <el-input style="width: 40%" v-model.number="addHomeworkForm.proportion"></el-input>
          <span style="margin-left: 10px">%</span>
        </el-form-item>

        <el-form-item label="作业描述" prop="hwName">
          <el-input type="textarea" v-model="addHomeworkForm.description"></el-input>
        </el-form-item>

        <el-form-item label="作业时间">
          <el-date-picker
            v-model="addHomeworkForm.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHomeworkDialog = false">取 消</el-button>
        <el-button type="primary" @click="addHomework('addHomeworkForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import DeleteBtn from "@/components/course/DeleteBtn";
import CourseProvider from "@/network/request/course";
export default {
  name: "HomeworkToolBar",
  components: {DeleteBtn},
  data() {
    return {
      addHomeworkDialog: false,
      addHomeworkForm: {
        courseID: '',
        hwName: '',
        type: '',
        proportion: 0,
        description: '',
        date: [],
        beginDate: '',
        deadline: '',
      },
      addHomeworkFormRules: {

      },
      typeOptions: ['个人作业', '小组作业'],
    }
  },
  methods: {
    addHomework(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addHomeworkForm.beginDate = this.addHomeworkForm.date[0]
          this.addHomeworkForm.deadline = this.addHomeworkForm.date[1]
          this.addHomeworkForm.courseID = this.$route.params.course_id
          console.log(this.addHomeworkForm)
          CourseProvider.addHW(this.addHomeworkForm,
            {headers: {'Authorization': this.$store.state.token}})
          .then(res => {
            console.log(res)
            if (res.state) {
              this.$message({
                showClose: true,
                message: '添加作业成功',
                type: 'success',
              })
              this.$router.go(0)
            }
            else {
              this.$message({
                showClose: true,
                message: '添加作业失败',
                type: 'warning',
              })
            }
          })
          .catch(err => {

          })
        }
      })
      this.addHomeworkDialog = false
    }
  }
}
</script>

<style scoped>

</style>
