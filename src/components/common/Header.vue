<template>
  <el-header>
    <div class="ul-menu__wrapper">
      <router-link to="/">
        <img class="logo" src="@/assets/img/logo2.png" alt="logo" />
      </router-link>
      <el-menu
          :default-active="path"
          class="nav-menu"
          mode="horizontal"
          :router="true"
          ref="menu"
      >
        <el-menu-item index="/course">课程</el-menu-item>
        <el-menu-item index="/qa">答疑</el-menu-item>
        <el-menu-item index="/techInfo">技术前沿</el-menu-item>
        <el-menu-item index="/news">新闻动态</el-menu-item>
        <el-menu-item index="/library">实验平台</el-menu-item>
      </el-menu>
    </div>

    <div class="search-user__wrapper">
      <el-input
          class="global-search"
          v-model="input"
          placeholder="搜索..."
          @keyup.enter.native="searchGlobal"
      ></el-input>

      <el-link
          :class="[normalLinkClass, canLinkActive ? activeLinkClass : '']"
          @click="$router.push({ path: '/auth' })"
          :underline="false"
          v-if="!user.id"
      >登录/注册</el-link
      >

      <el-dropdown v-else trigger="click" @command="userCommand">
        <span class="el-dropdown-link">
          <img class="avatar" :src="$serverBaseUrl + user.avatar" />
          {{ user.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="getOwnInfo">我的信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      path: '',
      input: '',
      isAuthActive: false,
      menu: {},
      normalLinkClass: 'login user-link',
      activeLinkClass: 'user-link_active',
      canLinkActive: false
    }
  },
  props: {
    user: {
      type: Object
    }
  },
  mounted() {
    this.path = '/';
  },
}
</script>

<style lang="scss" scoped>
header {
  min-width: 970px;
  border-bottom: 1px solid #ddd;
  height: 61px !important;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .logo {
    height: 100%;
    width: 70%;
  }
  .el-dropdown {
    padding-left: 20px;
    line-height: 60px;
    border-left: 1px solid #ddd;

    .el-dropdown-link {
      cursor: pointer;
    }
  }
  > .ul-menu__wrapper {
    height: 100%;

    .logo {
      width: 120px;
    }

    > a {
      display: inline-block;
      height: 100%;
      margin-right: 25px;
    }
  }

  .avatar {
    margin-right: 10px;
    width: 32px;
    height: 32px;
    object-fit: cover;
    vertical-align: middle;
    border-radius: 50%;
  }
  .nav-menu {
    display: inline-block;
  }
  .search-user__wrapper {
    .global-search,
    .login,
    .el-dropdown {
      display: inline-block;
    }
    .user-link {
      height: 60px;
      line-height: 60px;
      margin: 0;
      border-bottom: 2px solid transparent;
      color: #909399;
      height: 100%;
      padding: 0 15px;
    }
    .user-link_active {
      border-bottom: 2px solid #409eff;
      color: #303133;
    }
    .global-search {
      width: 240px;
      margin-right: 25px;
    }
  }
}
</style>
