<template>
  <div style="padding-left: 20px; margin-top: 20px">
    <i class="el-icon-folder"></i>
    <el-link :href="$serverBaseUrl + file.fileUrl" target="_blank"
             style="margin: 0 10px">{{file.fileName}}</el-link>
    <el-button size="mini" @click="download">下载文件</el-button>
    <el-button size="mini" type="danger" @click="deleteFile"
               v-if="!deleteDisabled">删除文件</el-button>
  </div>
</template>

<script>
import CourseProvider from "@/network/request/course";
import axios from "axios";

export default {
  name: "HomeworkFile",
  props: {
    file: Object,
    deleteDisabled: {
      type: Boolean,
      default: true,
    },
    delOperation: {
      type: Number,
      default: 0,
    },
    hwID: {
      type: String,
      default: '',
    },
  },
  methods: {
    deleteFile() {
      const tmp = {}
      tmp['fileName'] = this.file.fileName
      tmp['fileUrl'] = this.file.fileUrl
      if (this.delOperation === 0) {
        CourseProvider.deleteSubmitFile(tmp, {
          headers: {'Authorization': this.$store.state.token}
        }).then(res => {
          if (res.state) {
            this.$router.go(0)
          }
        })
      } else if (this.delOperation === 1) {
        tmp['hwID'] = this.hwID
        CourseProvider.delHWFile(tmp)
        .then(res => {
          if (res.state) {
            this.$router.go(0)
          }
        })
      }

    },
    download() {
      axios.get(this.$serverBaseUrl + this.file.fileUrl, {
        responseType: 'blob',
      })
        .then(res => {
          if (res) {
            const blob = new Blob([res.data]);
            if ('download' in document.createElement('a')) {
              //支持a标签download的浏览器
              const link = document.createElement('a')//创建a标签
              link.download = this.file.fileName//a标签添加属性
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
