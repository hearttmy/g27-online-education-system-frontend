<template>
  <div id="app">
    <Header :user.sync="user"></Header>

    <el-main @login="updateLoginState">
      <transition name="slide-fade" mode="out-in">
        <router-view :user.sync="user"></router-view>
      </transition>
    </el-main>
  </div>
</template>

<script>
import Header from '@/components/common/Header'

export default {
  name: 'App',
  data() {
    return {
      user: {}
    }
  },
  components: {
    Header
  },
  methods: {
    updateLoginState(user) {
      this.user = user
    }
  }
}
</script>

<style>
body {
  margin: 0;
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
