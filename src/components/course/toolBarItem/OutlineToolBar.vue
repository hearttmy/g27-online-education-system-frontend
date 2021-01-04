<template>
  <el-row>
    <el-button type="primary" @click="openInfoDialog">修改课程简介</el-button>
    <el-button type="primary" @click="ImgDialog = true">修改课程图片</el-button>
    <el-dialog :visible.sync="ImgDialog" @closed="imgRefresh">
      <el-upload :data="{courseID: $store.state.course.courseID}"
                 :action="$serverApiUrl + '/course/changeImg'"
                 :on-success="handleUploadSuccess">
        <el-button type="primary">上传课程图片</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ImgDialog = false">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改课程简介" :visible.sync="infoDialog">
      <el-form :model="infoForm"
               ref="infoForm">
        <el-form-item label="简介内容" label-width="80px">
          <el-input type="textarea" v-model="infoForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addChapterDialog = false">取 消</el-button>
        <el-button type="primary" @click="editInfo('infoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import CourseProvider from "@/network/request/course";

export default {
  name: "OutlineToolBar",
  data() {
    return {
      ImgDialog: false,
      infoDialog: false,
      infoForm: {
        content: '',
      },

    }
  },
  methods: {
    openInfoDialog() {
      this.infoDialog = true
      this.infoForm.content = this.$store.state.course.information
    },
    editInfo(formName) {
      this.infoForm['courseID'] = this.$store.state.course.courseID
      CourseProvider.editInfo(this.infoForm)
      .then(res => {
        if (res.state) {
          console.log(res)
          this.$message({
            showClose: true,
            message: '修改简介成功',
            type: 'success',
          })
          this.infoDialog = false
          this.$router.go(0)
        }
      })
    },
    handleUploadSuccess() {
      this.$message({
        showClose: true,
        message: '课程图片上传成功',
        type: 'success'
      })
    },
    imgRefresh() {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
