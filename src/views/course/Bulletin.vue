<template>
  <div>
    <el-card :body-style="'padding: 0px;'" shadow="never" v-if="bulletinData.length" >
      <div class="bulletin-wrapper" v-for="(item, i) in bulletinData" :key="i">
        <div class="bulletin-title">
          <p>
            {{ item.title }}
            <el-button style="margin-left: 10px" size="mini" type="danger"
                       @click="deleteBulletin(item._id)"
                       v-if="$store.state.deleteMode">删除公告</el-button>
          </p>
          <p style="color:#737373;font-size: 13px;">{{getTime(item.created)}}</p>
        </div>
        <div class="bulletin-body">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </el-card>

    <el-card v-else >
      暂无公告
    </el-card>
  </div>

</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from "moment";

export default {
  name: "Bulletin",
  data() {
    return {
      bulletinData: [],
    }
  },
  created() {
    this.getBulletin()
  },
  methods: {
    getBulletin() {
      CourseProvider.getBulletins({
        courseID: this.$store.state.course.courseID
      }).then(res => {
        if (res.state) {
          this.bulletinData = res.Bulletins
        }
      })
    },
    getTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    deleteBulletin(id) {
      CourseProvider.delBulletins({
        BulletinID: id
      }).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '删除公告成功',
            type: "success",
          })
          this.getBulletin()
        }
      })
    },
  }
}
</script>

<style scoped>
.bulletin-wrapper {
  border-bottom: 1px solid #d8d8d8;
  padding: 10px;
}
.bulletin-body {
  margin-top: 30px;
}
</style>
