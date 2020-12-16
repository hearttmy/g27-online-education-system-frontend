<template>
  <el-header>
    <div>
      <div class="logo-wrapper">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="logo" />
        </router-link>
      </div>

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

    <!-- <el-menu-item index="/library">教学资源</el-menu-item>
      <el index="/exercise">作业练习</el -menu-item>
      <el-menu-item index="/exam">考试</el-menu-item>-->
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
          <el-dropdown-item command="getOwnInfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { UserProvider } from '@/provider/index'

export default {
  name: 'baseHeader',
  data() {
    return {
      path: '',
      input: '',
      isAuthActive: false,
      menu: {},
      normalLinkClass: 'login user-link',
      activeLinkClass: 'user-link_active',
      canLinkActive: false
    };
  },
  props: {
    user: {
      type: Object
    }
  },
  created() {},
  mounted() {
    this.path = '/';
  },
  watch: {
    '$route.path': function() {
      let path = this.$route.path.replace(/(\/[^\/]+)(\/.+$)/, '$1');
      this.path = path;
      this.$refs.menu.activeIndex = path;
      this.canLinkActive = path == '/auth' ? true : false;
      // 检测到跳转到了auth并且cookie已过期，更新user数据
      if (path === '/auth' && !this.$getLoginState()) {
        this.$emit('update:user', {});
      }
    }
  },
  methods: {
    searchGlobal () {
      if (!this.input) {
        return
      }
      this.$router.push({
        name: 'search',
        query: { key: this.input }
      })
    },
    logout() {
      let userType = '';
      if (this.user.userType === 0) {
        userType = 'STU';
      } else {
        userType = 'TCH';
      }

      UserProvider.user.logout(userType)
          .then(res => {
            if (res.code === 1) {
              this.$emit('update:user', {});
              this.$router.push({ path: '/' });
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    userCommand(command) {
      if (command === 'logout') {
        this.logout();
      }
      if (command === 'getOwnInfo') {
        this.$router.push({ path: '/myInfo' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  min-width: 970px;
  border-bottom: 1px solid #ddd;
  height: 61px !important;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  .logo-wrapper {
    margin-left: 100px;
    margin-right: 25px;
    width: 200px;
    height: 100%;
    display: inline-block;
  }

  .el-dropdown {
    padding-left: 20px;
    line-height: 60px;
    border-left: 1px solid #ddd;

    .el-dropdown-link {
      cursor: pointer;
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
    margin-right: 100px;
    .global-search,
    .login,
    .el-dropdown {
      display: inline-block;
    }
    .user-link {
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
