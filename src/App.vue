<template>
  <div id="app">
    <Header :user.sync="user"></Header>

    <div @login="updateLoginState"
         :class="{'main-style': true, 'user-style': isUserPage}">
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
    isUserPage() {
      if (this.$route.path === '/user') {
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

.user-style {
  padding: 0px !important;
}

.main-style {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
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
