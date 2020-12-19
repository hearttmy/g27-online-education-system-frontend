<template>
  <div class="user-content">
      <div class="main-box">
        <el-tabs>
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
export default {
name: "UserContent"
}
</script>

<style scoped>
.user-content {
  width: 1200px;
  margin: 0px;
}

.main-box {
  float: left;
}

</style>
