<template>
  <div style="width: 400px; margin-top: 30px">
    <el-form
      :model="userData"
      label-position="left"
      label-width="100px"
      status-icon
      ref="loginData">

      <el-form-item label="学号/工号：">
        <span>{{userData.id}}</span>
      </el-form-item>

      <el-form-item label="用户名：">
        <el-input  v-model="userData.username" :disabled="disableFlag"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：">
        <el-input  v-model="userData.username" :disabled="disableFlag"></el-input>
      </el-form-item>

      <el-form-item label="个人邮箱：">
        <el-input  v-model="userData.username" :disabled="disableFlag"></el-input>
      </el-form-item>

      <el-form-item label="联系电话：">
        <el-input  v-model="userData.username" :disabled="disableFlag"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <el-input  v-model="userData.username" :disabled="disableFlag"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="edit">修改</el-button>
        <el-button type="success">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ChangePwd",
  data() {
    return {
      userData: {},
      disableFlag: true
    }
  },
  created() {
    this.userData = JSON.parse(JSON.stringify(this.$store.state.user))
  },
  methods: {
    edit() {
      this.disableFlag = false
    }
  }
}
</script>

<style scoped>

</style>
