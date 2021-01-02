<template>
  <el-card :body-style="'padding: 0px'">
    <el-menu class="nav-bar" @select="selectIndex" :default-active="$route.path" router>
      <el-menu-item :index="'/course/' + course_id + '/chapter'">
        <i class="el-icon-reading"></i>章节
      </el-menu-item>
      <el-menu-item :index="'/course/' + course_id + '/bulletin'">
        <i class="el-icon-bell"></i>公告
      </el-menu-item>
      <el-menu-item :index="'/course/' + course_id + '/outline'">
        <i class="el-icon-warning-outline"></i>课程信息
      </el-menu-item>
      <el-menu-item :index="'/course/' + course_id + '/homework'">
        <i class="el-icon-edit"></i>作业
      </el-menu-item>
      <el-menu-item :index="'/course/' + course_id + '/group'">
        <i class="el-icon-user"></i>分组学习
      </el-menu-item>
      <el-menu-item :index="'/course/' + course_id + '/score'">
        <i class="el-icon-tickets"></i>成绩
      </el-menu-item>
      <el-menu-item style="border-right: none" :index="'/course/' + course_id + '/forum'">
        <i class="el-icon-chat-round"></i>讨论
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
export default {
  name: "CourseNavBar",
  data() {
    return {
      course_id: '',
    }
  },
  created() {
    this.course_id = this.$route.params.course_id
  },
  methods: {
    selectIndex() {

    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  .el-menu-item {
    border-right: 1px solid #ddd;
    flex: 1;
    text-align: center;
  }

}
</style>
