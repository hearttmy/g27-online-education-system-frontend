<template>
  <div id="app">
    <Header :user.sync="user"></Header>

    <div @login="updateLoginState" :class="{'home-style': isHomePage, 'main-style': true}">
      <transition name="slide-fade" mode="out-in">
        <router-view :user.sync="user"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header'

export default {
  name: 'App',
  data() {
    return {
      user: {},
    }
  },
  components: {
    Header
  },
  computed: {
    isHomePage() {
      if (this.$route.path === '/') {
        return true;
      }
      return false;
    },
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
  padding: 0;
}

.home-style {
  background-color: rgba(247, 247, 247, 1);
  padding: 20px;
}

.main-style {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
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
