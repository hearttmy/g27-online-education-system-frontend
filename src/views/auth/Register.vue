<template>
  <div>
    <span class="current-tab-title">注册</span>
  <el-form
    :model="registerData"
    label-position="top"
    status-icon
    :rules="registerDataRules"
    ref="registerData">
    <el-form-item label="学号/工号：" prop="id">
      <el-input v-model="registerData.id" placeholder="请输入学号/工号"></el-input>
    </el-form-item>

    <el-form-item label="真实姓名：" prop="realName">
      <el-input v-model="registerData.realName" placeholder="请输入真实姓名"></el-input>
    </el-form-item>

    <el-form-item label="用户名：" prop="username">
      <el-input v-model="registerData.username" placeholder="请输入姓名"></el-input>
    </el-form-item>

    <el-form-item label="邮箱：" prop="email">
      <el-input v-model="registerData.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>

    <el-form-item label="密码：" prop="password">
      <el-input
        type="password"
        v-model="registerData.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item label="确认密码：" prop="checkPassword">
      <el-input
        type="password"
        v-model="registerData.checkPassword"
        placeholder="请重新输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item label="您是：" prop="userType">
      <el-select v-model="registerData.userType" placeholder="请选择">
        <el-option
          v-for="item in userTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>


    <span class="change-tab" @click="$router.push('/auth/login')">已有账号？马上登录</span>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerData')"
                 :loading="submitting">注册并登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import AuthProvider from "@/network/request/auth";

export default {
  name: 'register',
  data() {
    const validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    const validateRealName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入真实姓名'));
      }
      else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码应至少6个字符且不多于16个字符'));
      } else {
        callback();
      }
    };

    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.registerData.password) {
        callback(new Error('两次输入的密码不一致'));
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
      registerData: {
        id: '',
        username: '',
        email: '',
        password: '',
        checkPassword: '',
        userType: '',
      },
      registerDataRules: {
        id: [{ validator: validateId, trigger: 'change' }],
        realName: [{validator: validateRealName, trigger: 'change'}],
        username: [{ validator: validateUsername, trigger: 'change' }],
        email: [],
        password: [{ validator: validatePassword, trigger: 'change' }],
        checkPassword: [{validator: validateCheckPassword, trigger: 'change'}],
        userType: [{ validator: validateUserType, trigger: 'change' }],
      },
      userTypeOptions: [
        { value: 0, label: '学生' },
        { value: 1, label: '教师' }
      ],

      submitting: false
    };
  },
  methods: {
    login() {
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true;
          AuthProvider.register(this.registerData)
            .then(res => {
              console.log(res)
              if (res.state) {
                this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success',
                });
                this.$router.push('/auth/login')
              }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.submitting = false
            });
        } else {
          return false
        }
      });
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
  color: #409EFF;
  cursor: pointer;
  border-bottom: 1px solid #409EFF;
}
</style>
