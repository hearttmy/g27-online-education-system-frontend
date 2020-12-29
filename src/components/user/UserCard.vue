<template>
  <el-card :body-style="{ padding: '0px' }" class="user-card" shadow="never">
    <div class="avatar-box">
      <el-avatar :src="$store.state.avatarUrl" :size="80"/>
      <p>{{$store.state.user.username}}</p>
      <p>{{$store.state.user.userType === 0 ? '学生':'教师'}}</p>
    </div>
    <div>
      <el-menu :default-active="$route.path" @select="selectIndex">
        <el-menu-item index="/user">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/user/course">
          <i class="el-icon-menu"></i>
          <span slot="title">我的课程</span>
        </el-menu-item>
        <el-menu-item index="/user/score">
          <i class="el-icon-menu"></i>
          <span slot="title">成绩</span>
        </el-menu-item>
        <el-menu-item index="/user/setting">
          <i class="el-icon-menu"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserCard",
  methods: {
    selectIndex(index) {
      this.$router.push(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  height: 500px;
  width: 200px;
  .avatar-box {
    border-bottom: 1px solid #ddd;
    margin-top: 20px;
    text-align: center;
  }
}

</style>
