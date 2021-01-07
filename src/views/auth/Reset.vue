<template>
  <div>
    <span class="current-tab-title">找回密码</span>
    <el-form :model="resetData" label-position="top"
             status-icon :rules="resetDataRules" ref="resetData" label-width="100px">


      <el-form-item label="学号" prop="id">
        <el-input v-model="resetData.id"></el-input>
      </el-form-item>

      <el-form-item label="您是：" prop="userType">
        <el-select v-model="resetData.userType" placeholder="请选择">
          <el-option
            v-for="item in userTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="验证邮箱：" prop="email">
        <el-input v-model="resetData.email">
          <el-button slot="append" :disabled="sendCodeBtnDisabled" style="width: 152px"
                     @click="sendCode('resetData')">{{sendCodeBtnText}}</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="验证码：" prop="code">
        <el-input v-model="resetData.code"></el-input>
      </el-form-item>



      <el-form-item label="新密码：" prop="password">
        <el-input type="password" v-model="resetData.password"></el-input>
      </el-form-item>

      <el-form-item label="确认密码：" prop="checkPassword">
        <el-input type="password" v-model="resetData.checkPassword"></el-input>
      </el-form-item>

      <br>
      <el-form-item>
        <el-button type="primary" @click="submitForm('resetData')"
                   :loading="submitting">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

import AuthProvider from "@/network/request/auth";

export default {
  name: 'reset',
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

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      }
      else if (value !== this.resetData.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };

    return {
      resetData: {
        id: '',
        password: '',
        email: '',
        code: '',
        checkPassword: '',
        userType: 0
      },
      userTypeOptions: [
        { value: 0, label: '学生' },
        { value: 1, label: '教师' }
      ],
      resetDataRules: {
        id: [{ validator: validateId, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPassword: [{validator: validateCheckPassword, trigger: 'change'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
      },

      submitting: false,

      sendCodeBtnText: '发送验证码',
      sendCodeBtnTime: 0,
      sendCodeBtnDisabled: false,
    };
  },
  methods: {
    sendCode(formName) {
      this.$refs[formName].validateField('email', (valid) => {
        if (!valid) {
          AuthProvider.findPwd(this.resetData)
          .then(res => {
            if (res.state) {
              this.$message({
                showClose: true,
                message: '验证码发送成功',
                type: 'success'
              })
            }
          })
          const _this = this;//！！坑！setInterval中的this指向问题
          this.sendCodeBtnDisabled = true; //！按钮不可重复点击
          let time = 1;//定义时间变量 150s
          let timer = null;//定义定时器
          timer = setInterval(function(){
            if(time === 0){
              _this.sendCodeBtnText = "重新获取验证码";
              _this.sendCodeBtnDisabled = false;
              clearInterval(timer);//清除定时器
            }else{
              _this.sendCodeBtnText = time+"秒后重新获取";
              time--;
            }
          },1000)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          AuthProvider.resetPwd(this.resetData)
            .then(res => {
              if (res.state) {
                this.$message({
                  showClose: true,
                  message: '重置密码成功',
                  type: 'success'
                })
              }
            })
            .finally(() => {
              this.submitting = false;
              this.$router.push('/')
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
