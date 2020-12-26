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
  margin: 3vh auto;
  width: 350px;
}

</style>
