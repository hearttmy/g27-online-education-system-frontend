<template>
  <el-card style="min-height: 300px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-button type="primary" style="margin-bottom: 10px"
                 @click="addPostDialog = true">发布帖子</el-button>


      <el-dialog title="发布帖子" :visible.sync="addPostDialog">
        <el-form :model="addPostForm"
                 :rules="addPostFormRules"
                 ref="addPostForm" :label-width="'80px'">
          <el-form-item label="帖子标题">
            <el-input v-model="addPostForm.title"></el-input>
          </el-form-item>

          <el-form-item label="帖子内容">
            <el-input type="textarea" v-model="addPostForm.content"
                      :autosize="{ minRows: 4}"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer">
          <el-button @click="addPostDialog = false">取 消</el-button>
          <el-button type="primary" @click="addPost('addPostForm')">发 布</el-button>
        </div>

      </el-dialog>

      <el-tab-pane label="全部帖子" name="first">
        <div v-if="!allPostData.length">暂无帖子</div>
        <el-card v-else class="post-wrapper"
                 :body-style="'overflow: hidden; padding: 10px'"
                  v-for="(item ,i) in allPostData" :key="i">

          <img class="post-cover" :src="$serverImgUrl + item.owner.avatar">
          <div class="post-title">
            <p style="font-weight: bold; color: #409EFF; font-size: 24px">{{ item.postTitle }}</p>
            <div style="font-size: 15px; margin-top: 40px">
              <i class="el-icon-time"></i>
              {{getTime(item.created)}}
              <span style="margin-left: 50px">
                <i class="el-icon-chat-dot-round"></i>
                {{ item.numOfReply }}
              </span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="我的帖子" name="second">
        <div v-if="!myPostData.length">暂无帖子</div>

        <el-card v-else class="post-wrapper"
                 :body-style="'overflow: hidden; padding: 10px'"
                 v-for="(item ,i) in myPostData" :key="i">

          <img class="post-cover" :src="$serverImgUrl + item.owner.avatar">
          <div class="post-title">
            <p style="font-weight: bold; color: #409EFF; font-size: 24px">{{ item.postTitle }}</p>
            <div style="font-size: 15px; margin-top: 40px">
              <i class="el-icon-time"></i>
              {{getTime(item.created)}}
              <span style="margin-left: 50px">
                <i class="el-icon-chat-dot-round"></i>
                {{ item.numOfReply }}
              </span>
            </div>
          </div>
        </el-card>

      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from 'moment'
export default {
  name: "Forum",
  data() {
    return {
      activeName: 'first',
      allPostData: ['1'],
      myPostData: [],
      addPostDialog: false,
      addPostForm: {
        title: '',
        content: '',
      },
      addPostFormRules: {

      },
    }
  },
  created() {
    this.getAllPost()
    this.getMyPost()
  },
  methods: {
    handleClick(tab, event) {

    },
    getTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    addPost(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPostForm['courseID'] = this.$store.state.course.courseID
          CourseProvider.addPost(this.addPostForm, {
            headers: {'Authorization': this.$store.state.token}
          })
          .then(res => {
            if (res.state) {
              this.$message({
                showClose: true,
                message: '发布帖子成功',
                type: 'success',
              })
              this.$refs[formName].resetFields();
              this.addPostDialog = false
            }
          })
        }
      })
    },
    getAllPost() {
      CourseProvider.getPost({
        courseID: this.$store.state.course.courseID
      })
      .then(res => {
        if (res.state) {
          this.allPostData = res.Posts.map(value => {
            if (value.teacher) {
              value['owner'] = value.teacher[0]
            }
            else if (value.student) {
              value['owner'] = value.student[0]
            }
            return value
          })
        }
      })
    },
    getMyPost() {
      CourseProvider.getMyPost({
        courseID: this.$store.state.course.courseID
      },{
        headers: {'Authorization': this.$store.state.token}
      })
      .then(res => {
        if (res.state) {
          this.myPostData = res.Posts.map(value => {
            if (value.teacher) {
              value['owner'] = value.teacher[0]
            }
            else if (value.student) {
              value['owner'] = value.student[0]
            }
            return value
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-wrapper:hover {
  cursor: pointer;
}
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
