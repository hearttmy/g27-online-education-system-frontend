<template>
  <div style="width: 400px; margin-top: 30px">
    <el-form
      :model="userData"
      label-position="left"
      label-width="100px"
      status-icon
      ref="loginData">

      <el-form-item label="头像：">
        <el-avatar :src="$store.state.avatarUrl" :size="100"></el-avatar>
        <el-upload
          class="avatar-uploader"
          :headers="tokenHeader"
          :action="$serverApiUrl + '/changeAvatar'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

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
  name: "Profile",
  data() {
    return {
      userData: {},
      disableFlag: true,
      tokenHeader: {'Authorization': this.$store.state.token},
    }
  },
  created() {
    this.userData = JSON.parse(JSON.stringify(this.$store.state.user))
  },
  methods: {
    edit() {
      this.disableFlag = false
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.$store.commit('changeAvatar', res)
      this.$router.go(0);
    }
  }
}
</script>

<style scoped>
.avatar-uploader {

}

</style>
