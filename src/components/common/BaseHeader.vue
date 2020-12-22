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
    <el-link class="login-link" @click="toAuth"
             :underline="false" v-if="!user.id">
      登录/注册
    </el-link>

    <el-dropdown v-else trigger="click" @command="userCommand">
        <span class="el-dropdown-link">
          <img class="avatar" :src="$serverBaseUrl" />
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
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    search() {
      if (!this.input) {
        return
      }
      this.$router.push({
        name: 'search',
        query: { key: this.input }
      })
    },
    logout() {
      this.$store.commit('logout')
    },
    toAuth() {
      if (this.$route.path !== '/auth/login')
        this.$router.push('/auth/login')
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

<style lang="scss" scoped>
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

.avatar {
  margin-right: 10px;
  width: 32px;
  height: 32px;
  object-fit: cover;
  vertical-align: middle;
  border-radius: 50%;
}

.el-dropdown {
  padding-left: 20px;
  line-height: 60px;
  border-left: 1px solid #ddd;
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
