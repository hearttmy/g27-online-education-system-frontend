<template>
  <div id="auth">
    <span class="current-tab-title">{{currentTabTitle}}</span>
    <component :is="currentTab" @login="updateLoginState" @changeTab="changeTab"></component>
  </div>
</template>

<script>
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

export default {
  name: 'auth',
  components: {
    Login,
    Register
  },
  data(){
    return {
      currentTab: 'Login'
    }
  },
  computed: {
    currentTabTitle () {
      return this.currentTab === 'Login' ? '登录' : '注册';
    }
  },
  created() {

  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
    updateLoginState (user) {
      this.$store.commit('login', user);
    }
  }
};
</script>

<style lang="scss" scoped>
#auth {
  margin: 10vh auto;
  width: 350px;
}

.current-tab-title {
  display: block;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1ch;
  text-indent: 1ch;
  font-size: 1.8em;
  font-weight: bold;
  color: #888;
}
</style>
