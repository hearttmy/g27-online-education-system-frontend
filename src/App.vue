<template>
  <div id="app">
    <el-container direction="vertical">
      <BaseHeader></BaseHeader>

      <el-main class="my-main">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
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
  },
  created() {
    this.$store.commit('getSessionStorage')
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/base.css";
.el-menu {
  border-right: 0 !important;
  .el-menu-item:focus {
    background-color: white;
  }
  .el-menu-item.is-active {
    background-color: #ecf5ff;
  }
}

.my-main {
  min-height: calc(100vh - 80px);
  background-color: rgba(247, 247, 247, 1);
}

.el-main {
  padding: 10px !important;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(-50px);
}
.slide-fade-leave-to {
  transform: translateX(50px);
}
</style>
