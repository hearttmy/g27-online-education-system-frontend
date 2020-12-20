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
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  </div>

  <div class="login-wrapper">
    <el-link class="login-link" @click="$router.push({ path: '/auth' })" :underline="false">
      登录/注册
    </el-link>
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
  methods: {
    search() {

    }
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
