<template>
  <div style="width: 400px; margin-top: 30px">
    <el-form
      :model="resetData"
      label-position="left"
      label-width="100px"
      status-icon :rules="rules"
      ref="resetData">
      <el-form-item label="旧密码：" prop="oldPwd">
        <el-input type="password" v-model="resetData.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-input type="password" v-model="resetData.newPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPassword">
        <el-input type="password" v-model="resetData.checkPassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm('resetData')"
                   :loading="submitting">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserProvider from "@/network/request/user";

export default {
  name: "ChangePwd",
  data() {
    return {
      resetData: {
        oldPwd: '',
        newPwd: '',
        checkPassword: '',
      },
      rules: {
        oldPwd: [
          { required: true, min: 6, max: 16, message: '密码应至少6个字符且不多于16个字符', trigger: 'change'},
        ],
        newPwd: [
          { required: true, min: 6, max: 16, message: '密码应至少6个字符且不多于16个字符', trigger: 'change'},
        ],
        checkPassword: [
          { required: true, min: 6, max: 16, message: '密码应至少6个字符且不多于16个字符', trigger: 'change'},
        ],
      },
      submitting: false,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          UserProvider.changePwd(this.resetData,
            {headers: {'Authorization': this.$store.state.token}})
          .then(res => {
            console.log(res)
            if (res.state) {
              this.$message({
                showClose: true,
                message: '密码修改成功',
                type: 'success',
              });
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

</style>
