<template>
  <div style="width: 400px; margin-top: 30px">
    <el-form
      :model="userData"
      label-position="left"
      label-width="100px"
      status-icon :rule="rules"
      ref="userData">

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
        <span>{{$store.state.user.id}}</span>
      </el-form-item>

      <el-form-item label="个人邮箱：">
        <span>{{$store.state.user.email}}</span>
      </el-form-item>

      <el-form-item label="真实姓名：" prop="realName">
        <el-input  v-model="userData.realName"></el-input>
      </el-form-item>

      <el-form-item label="用户名：" prop="userName">
        <el-input  v-model="userData.username"></el-input>
      </el-form-item>

      <el-form-item label="联系电话：">
        <el-input  v-model="userData.phone"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio v-model="userData.gender" label="1">男</el-radio>
        <el-radio v-model="userData.gender" label="2">女</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm('userData')"
                   :loading="submitting">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserProvider from "@/network/request/user";
import User from "@/views/User";

export default {
  name: "Profile",
  data() {
    return {
      userData: {
        realName: '',
        username: '',
        phone: '',
        gender: '',
      },
      disableFlag: true,
      tokenHeader: {'Authorization': this.$store.state.token},
      rules: {
        userName: [
          {required: true, min: 1, message: '用户名不得为空', trigger: 'change'}
        ],
        realName: [
          {required: true, min: 1, message: '真实姓名不得为空', trigger: 'change'}
        ],
      },
      submitting: false,
    }
  },
  created() {
    this.userData.username = this.$store.state.user.username
    this.userData.realName = this.$store.state.user.realName
    this.userData.phone = this.$store.state.user.phone
    this.userData.gender = this.$store.state.user.gender
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.$store.commit('changeAvatar', res)
      this.$router.go(0);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          UserProvider.changeInfo(this.userData,
            {headers: {'Authorization': this.$store.state.token} })
          .then(res => {
            if (res.state) {
              this.$message({
                showClose: true,
                message: '个人信息修改成功',
                type: 'success',
              });
              res.user['userType'] = parseInt(res.user.type)
              this.$store.commit('updateUser', res.user)
              this.$router.go(0);
            }
          })
          .catch(err => {

          })
        }
      })
      this.submitting = false
    }
  }
}
</script>

<style scoped>
.avatar-uploader {

}

</style>
