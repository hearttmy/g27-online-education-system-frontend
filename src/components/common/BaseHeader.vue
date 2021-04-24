<template>
<el-header class="header-wrapper" height="80px">

  <div class="logo-wrapper">
    <router-link to="/" style="outline:none">
      <img src="~@/assets/img/logo.png" alt="logo" style="width: 200px"/>
    </router-link>
  </div>

  <div class="search-wrapper">
    <el-input class="search" v-model="input"
              placeholder="搜索课程" @keyup.enter.native="search"/>
    <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
  </div>

  <div class="login-wrapper">
    <el-link style="margin-right: 40px" :href="`${publicPath}help.pdf`"
             download="使用帮助.pdf">使用帮助</el-link>
    <el-link class="login-link" @click="toLogin"
             :underline="false" v-if="!$store.state.isLogin">
      登录
    </el-link>
    <span v-if="!$store.state.isLogin"> / </span>
    <el-link class="login-link" @click="toRegister"
             :underline="false" v-if="!$store.state.isLogin">
      注册
    </el-link>
    <el-dropdown v-else @command="userCommand">
      <span class="el-dropdown-link">
        <el-avatar :src="$store.state.avatarUrl"></el-avatar>
        {{user.realName}}
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
  name: "BaseHeader",
  data() {
    return {
      input: '',
      publicPath: process.env.BASE_URL,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
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
      this.$router.push('/')
    },
    toLogin() {
        this.$router.push('/auth/login')
    },
    toRegister() {
      this.$router.push('/auth/register')
    },
    userCommand(command) {
      if (command === 'logout') {
        this.logout();
      }
      if (command === 'getOwnInfo') {
        this.$router.push({ path: '/user' });
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
  margin-left: 150px;
}

.search-wrapper {
  margin-left: 80px;
  line-height: 80px;
}

.search {
  width: 300px;
  margin-right: 5px;
}

.login-wrapper {
  margin-left: 100px;
  line-height: 80px;
}

.login-link {
  font-size: 16px;
}


.el-dropdown-link {
  font-size: 16px;
  display: inline-block;
  line-height: 80px;
  cursor: pointer;
}

.el-avatar {
  vertical-align: middle;
}



</style>
