<template>
  <div>
    <span class="current-tab-title">登录</span>
    <el-form
      :model="loginData"
      label-position="top"
      status-icon
      :rules="loginDataRules"
      ref="loginData"
      label-width="100px"
    >
      <el-form-item label="学号/工号：" prop="id">
        <el-input v-model="loginData.id" placeholder="请输入学号/工号" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="loginData.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="您是：" prop="userType">
        <el-select v-model="loginData.userType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <span>
      <span class="change-tab" @click="$router.push('/auth/register')">还没有账号？马上注册</span>
      |
      <span class="change-tab" @click="$router.push('/auth/reset')">忘记密码</span>
    </span>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginData')"
                   :loading="submitting">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import AuthProvider from "@/network/request/auth";

export default {
  name: 'login',
  data() {
    const validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    const validateUserType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择您的身份！'));
      } else {
        callback();
      }
    };

    return {
      loginData: {
        id: '',
        password: '',
        userType: ''
      },
      loginDataRules: {
        id: [{ validator: validateId, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
        userType: [{ validator: validateUserType, trigger: 'change' }]
      },
      options: [{ value: 0, label: '学生' }, { value: 1, label: '教师' }, {value: 2, label: '助教'}],

      submitting: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          AuthProvider.login(this.loginData)
            .then(res => {
              if (res.state === true) {
                console.log(res)
                res.user['userType'] = this.loginData.userType
                this.$store.commit('login', res)
                this.$router.push('/')
              }
              else {
                this.$message({
                  showClose: true,
                  message: '用户名或密码错误',
                  type: 'warning'
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.submitting = false;
            })
        } else {
          return false;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.current-tab-title {
  display: block;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1ch;
  text-indent: 1ch;
  font-size: 1.8em;
  font-weight: bold;
  color: #888;
}

.el-select {
  width: 100%;
}

.el-button {
  display: block;
  width: 100%;
}

.change-tab {
  display: inline-block;
  margin-bottom: 20px;
  color: #409eff;
  cursor: pointer;
  border-bottom: 1px solid #409eff;
}
</style>
