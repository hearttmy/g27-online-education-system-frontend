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
  }
}
</script>

<style>
@import "~@/assets/css/base.css";

.my-main {
  background-color: rgba(247, 247, 247, 1);
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
