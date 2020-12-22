<template>
  <div id="auth">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'auth',
};
</script>

<style lang="scss" scoped>
#auth {
  margin: 10vh auto;
  width: 350px;
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
