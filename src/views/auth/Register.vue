<template>
  <el-form
    :model="registerData"
    label-position="top"
    status-icon
    :rules="registerDataRules"
    ref="registerData"
  >
    <el-form-item label="学号/工号：" prop="id">
      <el-input v-model="registerData.id" placeholder="请输入学号/工号" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="姓名：" prop="username">
      <el-input v-model="registerData.username" placeholder="请输入姓名" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码：" prop="password">
      <el-input
        type="password"
        v-model="registerData.password"
        placeholder="请输入密码"
        autocomplete="off"
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

    <el-form-item label="学院/系：" prop="faculty">
      <el-select v-model="registerData.faculty" filterable placeholder="请选择">
        <el-option v-for="(item, key) in faculty" :key="key" :label="key" :value="key"></el-option>
      </el-select>
    </el-form-item>

    <div v-if="registerData.userType === 0">
      <el-form-item label="年级：" prop="grade">
        <el-select v-model="registerData.grade" placeholder="请选择">
          <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="专业：" prop="major">
        <el-select v-model="registerData.major" filterable placeholder="请选择">
          <el-option
            v-for="(item, key) in faculty[registerData.faculty]"
            :key="key"
            :label="key"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="faculty[registerData.faculty]" label="班别：" prop="sclass">
        <el-select v-model="registerData.sclass" filterable placeholder="请选择">
          <el-option
            v-for="item in faculty[registerData.faculty][registerData.major]"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>

    <span class="change-tab" @click="$emit('changeTab', 'Login')">已有账号？马上登录</span>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerData')" :loading="submiting">注册并登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { UserProvider } from '@/provider/index'

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

    const validateUserType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择您的身份！'));
      } else {
        callback();
      }
    };

    const validateFaculty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择所属院系！'));
      } else {
        callback();
      }
    };

    const validateMajor = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择所属专业！'));
      } else {
        callback();
      }
    };

    const validateGrade = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择所属年级！'));
      } else {
        callback();
      }
    };

    const validateSclass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择所属班别！'));
      } else {
        callback();
      }
    };

    return {
      registerData: {
        id: '',
        username: '',
        password: '',
        userType: '',
        faculty: '',
        major: '',
        grade: '',
        sclass: ''
      },
      registerDataRules: {
        id: [{ validator: validateId, trigger: 'change' }],
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
        userType: [{ validator: validateUserType, trigger: 'change' }],
        faculty: [{ validator: validateFaculty, trigger: 'change' }],
        major: [{ validator: validateMajor, trigger: 'change' }],
        grade: [{ validator: validateGrade, trigger: 'change' }],
        sclass: [{ validator: validateSclass, trigger: 'change' }]
      },
      userTypeOptions: [
        { value: 0, label: '学生' },
        { value: 1, label: '教师' }
      ],
      gradeOptions: [],
      faculty: {
        ['计算机工程学院']: {
          ['软件工程']: [1, 2]
        }
      },

      submiting: false
    };
  },
  created() {
    // 初始化年级选择器中的选项
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      if (date.getMonth() > 8 && i === 1) {
        // 8、9月入学，已入学的学生才可以选今年
        this.gradeOptions.push(date.getFullYear());
        continue;
      }
      this.gradeOptions.push(date.getFullYear() - i);
    }
  },
  methods: {
    login() {
      UserProvider.user.login(this.registerData.userType === 0 ? 'STU' : 'TCH', {
          id: this.registerData.id,
          password: this.registerData.password,
          userType: this.registerData.userType
        })
        .then(res => {
          if (res.code === 1) {
            this.$emit('login', this.$getLoginState());
            this.$router.push({ path: '/' });
          }
          if (res.code === 0) {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: 'warning'
            });
          }
          if (res.code === -1) {
            this.$message({
              showClose: true,
              message: res.data.errMsg,
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交
          this.submiting = true;

          UserProvider.user.register(this.registerData.userType === 0 ? 'STU' : 'TCH', this.registerData)
            .then(res => {
              if (res.code === 1) {
                this.login();
              }
              if (res.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.info,
                  type: 'warning'
                });
              }
              if (res.code === -1) {
                this.$message({
                  showClose: true,
                  message: res.data.errMsg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.submiting = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
