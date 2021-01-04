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
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属院系" :label-width="'120px'">
            <el-input v-model="addCourseForm.faculty" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item label="课程持续时间" :label-width="'120px'">
            <el-select
              v-model="addCourseForm.Year" placeholder="请选择">
              <el-option
                v-for="item in courseYear"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select
              v-model="addCourseForm.Season"  style="margin-left: 20px" placeholder="请选择">
              <el-option
                v-for="item in courseSeason"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
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
import UserProvider from "@/network/request/user";

export default {
  name: "UserCourseToolBar",
  data() {
    return {
      input: '',
      addCourseDialog: false,
      courseIndex: ['理学', '工学', '哲学', '经济学'],
      courseYear: [],
      courseSeason: ['春夏', '春', '夏', '秋冬', '秋', '冬'],
      addCourseForm: {
        courseName: '',
        Year: '',
        Season: '',
        faculty: '',
        DurationTime: '',
        courseType: '',
      },
    }
  },
  created() {
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      this.courseYear.push(date.getFullYear() - i);
    }
  },
  methods: {
    search() {

    },
    addCourse() {
      this.addCourseForm.DurationTime = this.addCourseForm.Year + this.addCourseForm.Season
      console.log(this.addCourseForm)
      UserProvider.addCourse(this.addCourseForm,
        {headers: {'Authorization': this.$store.state.token} })
      .then(res => {
        console.log(res)
        if (res.state) {
          this.$message({
            showClose: true,
            message: '添加课程成功',
            type: 'success',
          });
        }
      })
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
