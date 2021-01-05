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
        <ForumCard v-else v-for="item in allPostData" :postData="item">

        </ForumCard>
      </el-tab-pane>

      <el-tab-pane label="我的帖子" name="second">
        <div v-if="!myPostData.length">暂无帖子</div>

        <ForumCard v-else v-for="item in myPostData" :postData="item">
        </ForumCard>

      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";
import moment from 'moment'
import ForumCard from "@/components/course/forum/ForumCard";
export default {
  name: "Forum",
  components: {ForumCard},
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
            value['avatar'] = value.owner.avatar
            value['userName'] = value.owner.username
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
            value['avatar'] = value.owner.avatar
            value['userName'] = value.owner.username
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
