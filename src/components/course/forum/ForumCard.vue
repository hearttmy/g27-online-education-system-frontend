<template>
  <el-card class="post-wrapper"
           :body-style="'overflow: hidden; padding: 10px'"
            @click.native="navToPost">

    <img class="post-cover" :src="$serverImgUrl + postData.avatar">
    <div class="post-title">
      <p style="font-weight: bold; color: #409EFF; font-size: 24px">{{ postData.postTitle }}</p>
      <div style="font-size: 15px; margin-top: 40px">
          <span>
            作者：{{ postData.userName }}
          </span>
        <span style="margin-left: 50px">
                时间：
                <i class="el-icon-time"></i>
                {{getTime(postData.created)}}
              </span>
        <span style="margin-left: 50px">
                回复数：
                <i class="el-icon-chat-dot-round"></i>
                {{ postData.numOfReply }}
          </span>
      </div>
    </div>

    <div style="float: right; margin-top: 60px; margin-right: 40px" v-if="$store.state.deleteMode">
      <el-button type="danger" @click="delPost">删除帖子</el-button>
    </div>
  </el-card>
</template>

<script>
import moment from "moment";
import CourseProvider from "@/network/request/course";

export default {
  name: "ForumCard",
  props: {
    postData: {},
  },
  methods: {
    getTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    navToPost() {
      this.$router.push('/course/'+ this.$route.params.course_id  +'/forum/' + this.postData._id + '/forumDetail')
    },
    delPost(event) {
      event.stopPropagation()
      CourseProvider.delPost({
        postID: this.postData._id
      }).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '帖子删除成功',
            type: 'success'
          })
          this.$emit('getPost')
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.post-wrapper {
  margin-bottom: 5px;
  .post-cover {
    float: left;
    width: 20%;
    height: 150px;
  }
  .post-title {
    float: left;
    margin-left: 10px;
  }
}
</style>
