<template>
  <el-card>
    <ForumCard :postData="postData"></ForumCard>

    <el-card>
      {{ postData.content }}
    </el-card>

    <div class="comment-title-wrapper">
      <p>评论</p>
      <p>共{{postData.numOfReply}}条回复</p>
    </div>

    <div class="comment-wrapper">
      <el-card class="reply-wrapper" v-for="(item, i) in replyData" :key="i"
               :body-style="'overflow: hidden; padding: 10px'">
        <div class="reply-title">
          <img class="reply-cover" :src="$serverImgUrl + item.avatar">
          <div>{{item.userName}}</div>
          <div style="font-size: 15px; color: #999;">{{getTime(item.created)}}</div>
        </div>
        <div class="reply-content">
          {{item.content}}
        </div>
      </el-card>

      <div style="margin-top: 10px">
        <el-input v-model="myReply.content" type="textarea" :autosize="{ minRows: 9}"></el-input>
        <el-button style="margin-top: 10px" type="primary" icon="el-icon-edit"
                   @click="addReply">回复帖子</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from "moment";
import ForumCard from "@/components/course/forum/ForumCard";

export default {
  name: "ForumDetail",
  components: {ForumCard},
  data() {
    return {
      postData: {},
      replyData: [],
      myReply: {
        content: ''
      },
    }
  },
  created() {
    this.getOnePost()
  },
  methods: {
    getTime(time) {
      return moment(time).format('MM-DD HH:mm')
    },
    getOnePost() {
      CourseProvider.getReply({
        postID: this.$route.params.post_id
      })
      .then(res => {
        if (res.state) {
          let tmp = res.Post.map(value => {
            if (value.teacher.length) {
              value['owner'] = value.teacher[0]
            } else if (value.student.length) {
              value['owner'] = value.student[0]
            }
            value['avatar'] = value.owner.avatar
            value['userName'] = value.owner.username
            return value
          })
          this.postData = tmp[0]

          this.replyData = res.replies.map(value => {
            if (value.teacher.length) {
              value['owner'] = value.teacher[0]
            } else if (value.student.length) {
              value['owner'] = value.student[0]
            }
            value['avatar'] = value.owner.avatar
            value['userName'] = value.owner.username
            return value
          })
        }
      })
    },
    addReply() {
      this.myReply['postID'] = this.postData._id
      CourseProvider.addReply(this.myReply, {
        headers: {'Authorization': this.$store.state.token},
      })
      .then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '回复帖子成功',
            type: 'success',
          })
          this.getOnePost()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.comment-title-wrapper {
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}


.reply-wrapper {
  margin-bottom: 15px;
  .reply-title {
    float: left;
    text-align: center;
    .reply-cover {
      width: 70px;
      height: 70px;
    }
  }
  .reply-content {
    margin-left: 10px;
  }
}



</style>
