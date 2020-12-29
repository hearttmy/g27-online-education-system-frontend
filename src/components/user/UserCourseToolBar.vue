<template>
  <el-card shadow="never">
    <el-row>
      <el-button type="primary" v-if="!$store.state.user.userType">加入课程</el-button>
      <el-button type="primary" v-else @click="addCourseDialog = true">添加课程</el-button>
      <div style="float: right">
        <el-input class="search-input" v-model="input"
                  placeholder="搜索我的课程" @keyup.enter.native="search"/>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>

      <el-dialog title="添加课程" :visible.sync="addCourseDialog">
        <el-form :model="addCourseForm">
          <el-form-item label="课程名称" :label-width="'120px'">
            <el-input v-model="addCourseForm.courseName" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item label="课程分类" :label-width="'120px'">
            <el-select v-model="addCourseForm.courseType" placeholder="请选择">
              <el-option
                v-for="(item, i) in courseIndex"
                :key="i"
                :label="item"
                :value="i"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addCourseDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCourse">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "UserCourseToolBar",
  data() {
    return {
      input: '',
      addCourseDialog: false,
      courseIndex: ['全部课程', '理学', '工学', '哲学', '经济学'],
      addCourseForm: {
        courseName: '',
        courseType: 0,
      },
    }
  },
  methods: {
    search() {

    },
    addCourse() {

      this.addCourseDialog = false
    },
  }
}
</script>

<style scoped>
.search-input {
  width: 200px;
  margin-right: 10px;
}
</style>
