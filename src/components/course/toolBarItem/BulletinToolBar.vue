<template>
  <el-row>
    <el-button type="primary" @click="addBulletinDialog = true">添加公告</el-button>
    <DeleteBtn></DeleteBtn>

    <el-dialog title="添加公告" :visible.sync="addBulletinDialog">
      <el-form :model="addBulletinForm"
               :rules="addBulletinFormRules"
               ref="addBulletinForm" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="addBulletinForm.title"></el-input>
        </el-form-item>

        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="addBulletinForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addBulletinDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBulletin('addBulletinForm')">添 加</el-button>
      </div>
    </el-dialog>


  </el-row>
</template>

<script>
import DeleteBtn from "@/components/course/DeleteBtn";
import CourseProvider from "@/network/request/course";
export default {
  name: "BulletinToolBar",
  components: {DeleteBtn},
  data() {
    return {
      addBulletinDialog: false,
      addBulletinForm: {
        title: '',
        content: '',
      },
      addBulletinFormRules: {

      },

    }
  },
  created() {

  },
  methods: {
    addBulletin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addBulletinForm['courseID'] = this.$store.state.course.courseID
          CourseProvider.addBulletins(this.addBulletinForm)
          .then(res => {
            if (res.state) {
              this.$message({
                showClose: true,
                message: '添加公告成功',
                type: 'success',
              })
              this.addBulletinDialog = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
