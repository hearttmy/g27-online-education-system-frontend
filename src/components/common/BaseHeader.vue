<template>
<el-header class="header-wrapper" height="80px">

  <div class="logo-wrapper">
    <router-link to="/">
      <img src="~@/assets/img/logo.png" alt="logo" />
    </router-link>
  </div>

  <div class="search-wrapper">
    <el-input class="search" v-model="input"
              placeholder="搜索课程" @keyup.enter.native="search"/>
    <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
  </div>

  <div class="login-wrapper">
    <el-link class="login-link" @click="$router.push({ path: '/auth' })"
             :underline="false" v-if="!user.id">
      登录/注册
    </el-link>

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
export default {
  name: "BaseHeader",
  data() {
    return {
      input: '',
      user: this.$store.state.user,
    }
  },
  methods: {
    search() {

    },
    logout() {

    },
    userCommand(command) {
      if (command === 'logout') {
        this.logout();
      }
      if (command === 'getOwnInfo') {
        this.$router.push({ path: '/myInfo' });
      }
    },
  },
}
</script>

<style scoped>
.header-wrapper {
  overflow: hidden;
  display: flex;
}

.logo-wrapper {
  margin-left: 250px;
}

.search-wrapper {
  margin-left: 80px;
  line-height: 80px;
}

.search {
  width: 400px;
  margin-right: 5px;
}

.login-wrapper {
  margin-left: 150px;
  line-height: 80px;
}

.login-link {
  font-size: 16px;
}
</style>
