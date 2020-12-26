<template>
  <div class="setting-box">
    <el-tabs type="border-card" :lazy="true">
      <el-tab-pane label="个人资料">
        <Profile></Profile>
      </el-tab-pane>

      <el-tab-pane label="修改密码">
        <ChangePwd></ChangePwd>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Profile from "@/components/user/setting/Profile";
import ChangePwd from "@/components/user/setting/ChangePwd";

export default {
name: "UserSetting",
  components: {ChangePwd, Profile}
}
</script>

<style scoped>
.setting-box {
  margin-left: 20px;
  width: 772px;
}
</style>
