<template>
  <div>
    <el-button type="primary" @click="importDialog = true">批量导入学生考试成绩</el-button>

    <el-dialog title="批量导入学生考试成绩" :visible.sync="importDialog">
      <el-upload :action="$serverApiUrl + '/course/submitHW'"
                 :data="{}" :on-success="handleFileSuccess"
                 ref="upload" :auto-upload="false" :on-change="handleFileChange">
        <el-button slot="trigger" size="small" type="primary">选取excel文件</el-button>
        <el-button style="margin-left: 10px;" size="small"
                   type="success" @click="submitUpload()">导入</el-button>
      </el-upload>

      <div slot="footer">
        <el-button type="primary" @click="importDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import DeleteBtn from "@/components/course/DeleteBtn";
import XLSX from 'xlsx'

export default {
  name: "ScoreToolBar",
  components: {DeleteBtn},
  data() {
    return {
      importDialog: false,
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleFileSuccess() {

    },
    handleFileChange(file, fileList) {
      console.log(file)
    },
    readWorkbookFromLocalFile(file, callback) {
      const reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        if(callback) callback(workbook);
      };
      reader.readAsBinaryString(file);
    }
  }
}
</script>

<style scoped>

</style>
