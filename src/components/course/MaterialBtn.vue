<template>
  <div style="padding-left: 20px; margin-top: 20px">
    <i class="el-icon-folder"></i>
    <el-link :href="$serverBaseUrl + file.Fileurl" target="_blank"
             style="margin: 0 10px">{{file.Filename}}</el-link>
    <el-button size="mini" @click="download">下载文件</el-button>
    <el-button v-if="deleteMode"  size="mini" type="danger" @click="deleteFile">删除文件</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import CourseProvider from "@/network/request/course";

export default {
  name: "MaterialBtn",
  props: {
    file: Object,
    courseID: String,
    chapterID: String,
    deleteMode: Boolean,
  },
  methods: {
    deleteFile() {
      const tmp = {}
      tmp['courseID'] = this.courseID
      tmp['chapterID'] = this.chapterID
      tmp['fileName'] = this.file.Filename
      CourseProvider.deleteFile(tmp,
        {headers: {'Authorization': this.$store.state.token}})
      .then(res => {
        console.log(res)
      })
      .catch(err => {

      })
    },
    download() {
      axios.get(this.$serverBaseUrl + this.file.Fileurl, {
          responseType: 'blob',
        })
        .then(res => {
          if (res) {
            const blob = new Blob([res.data]);
            if ('download' in document.createElement('a')) {
              //支持a标签download的浏览器
              const link = document.createElement('a')//创建a标签
              link.download = this.file.Filename//a标签添加属性
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
