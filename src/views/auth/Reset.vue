<template>
  <div>
    <span class="current-tab-title">找回密码</span>
    <el-form :model="resetData" label-position="top"
             status-icon :rules="resetDataRules" ref="resetData" label-width="100px">

      <el-form-item label="学号/工号：" prop="id">
        <el-input v-model="resetData.id" placeholder="请输入学号/工号" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="resetData.password" placeholder="请输入密码" autocomplete="off"></el-input>
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

    return {
      resetData: {
        id: '',
        password: '',
        userType: ''
      },
      resetDataRules: {
        id: [{ validator: validateId, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
      },

      submitting: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          AuthProvider.reset(this.resetData)
            .then(res => {
              if (res.code === 1) {
                console.log(res)
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
