<template>
  <div id="app">
    <el-container direction="vertical">
      <BaseHeader></BaseHeader>

      <el-main class="my-main">
        <router-view></router-view>
      </el-main>

      <BaseFooter></BaseFooter>
    </el-container>
  </div>
</template>

<script>
import BaseHeader from "@/components/common/BaseHeader";
import BaseFooter from "@/components/common/BaseFooter";

export default {
  name: 'App',
  components: {
    BaseFooter,
    BaseHeader
  }
}
</script>

<style>
@import "~@/assets/css/base.css";

.my-main {
  background-color: rgba(247, 247, 247, 1);
}


</style>
