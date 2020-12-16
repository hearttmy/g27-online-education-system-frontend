<template>
  <MainLayout :xs="24" :sm="22" :md="20" :lg="20" :xl="20">
    <transition name="course-slide-fade" mode="out-in">
      <router-view :user="user"></router-view>
    </transition>
  </MainLayout>
</template>

<script>
import MainLayout from '../components/MainLayout';

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    MainLayout
  }
};
</script>

<style lang="scss" scoped>
.course-slide-fade-enter-active {
  transition: opacity 0.2s ease;
}
.course-slide-fade-leave-active {
  transition: opacity 0.2s ease;
}
.course-slide-fade-enter,
.course-slide-fade-leave-to {
  opacity: 0;
}
</style>
