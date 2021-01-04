<template>
  <el-row>
    <el-button type="primary" @click="addChapterDialog = true">添加章节</el-button>
    <el-button type="primary" @click="addFileDialog = true">新增学习活动</el-button>
    <DeleteBtn></DeleteBtn>

    <el-dialog title="添加章节" :visible.sync="addChapterDialog">
      <el-form :model="addChapterForm"
               :rules="addChapterFormRules"
               ref="addChapterForm">
        <el-form-item label="章节名称" :label-width="'120px'" prop="chapterName">
          <el-input v-model="addChapterForm.chapterName" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addChapterDialog = false">取 消</el-button>
        <el-button type="primary" @click="addChapter('addChapterForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加学习内容" :visible.sync="addFileDialog">
      <el-form :model="addFileForm"
               :rules="addFileFormRules"
                ref="addFileForm">
        <el-form-item label="章节名称" :label-width="'120px'" prop="chapterID">
          <el-select v-model="addFileForm.chapterID" placeholder="请选择">
            <el-option
              v-for="(item, i) in course.content"
              :key="i"
              :label="item.ChapterName"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传文件" :label-width="'120px'">
          <el-upload :action="$serverApiUrl + '/course/addFile'"
                     :headers="tokenHeader "
                     :data="addFileForm" :on-success="handleFileSuccess"
                     ref="upload" :auto-upload="false" :on-change="handleFileChange">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small"
                       type="success" @click="submitUpload('addFileForm')">上传到服务器</el-button>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addFileDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFileDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>
import CourseProvider from "@/network/request/course";
import DeleteBtn from "@/components/course/DeleteBtn";

export default {
  name: "ChapterToolBar",
  components: {DeleteBtn},
  data() {
    return {
      tokenHeader: {'Authorization': this.$store.state.token},
      addChapterDialog: false,
      addChapterForm: {
        chapterName: '',
      },
      addChapterFormRules: {
        chapterName: [
          {required: true, message: '章节名不得为空', trigger: 'change'}
        ],
      },
      addFileDialog: false,
      addFileForm: {
        courseID: '',
        fileName: '',
        chapterID: '',
      },
      addFileFormRules: {
        chapterID: [
          {required: true, message: '章节名不得为空', trigger: 'change'}
        ],
      },
      myFileList: [],
    }
  },
  computed: {
    course() {
      return this.$store.state.course
    }
  },
  created() {
    this.addFileForm.courseID = this.$route.params.course_id
  },
  methods: {
    addChapter(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const tmp = {}
          tmp['ChapterName'] = this.addChapterForm.chapterName
          tmp['courseID'] = this.$route.params.course_id
          CourseProvider.addChapter(tmp,
            {headers: {'Authorization': this.$store.state.token}})
            .then(res => {
              // console.log(res)
              if (res.state) {
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
              } else {
                this.$message({
                  showClose: true,
                  message: '添加失败',
                  type: 'warning'
                });
              }
            })
          this.addChapterDialog = false
        }
      })
    },
    submitUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addFileForm.fileName = this.myFileList[0].name
          this.$refs.upload.submit()
        }
      })
    },
    handleFileSuccess(res, file) {
      console.log(res)
      if (res.state) {
        this.$message({
          showClose: true,
          message: '上传成功',
          type: 'success'
        });
        this.$refs.upload.clearFiles()
        this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
      }
    },
    handleFileChange(file, fileList) {
      this.myFileList = fileList
    },
  }
}
</script>

<style scoped>

</style>
