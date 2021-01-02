<template>
  <div style="display: inline-block; margin-left: 10px">
    <el-button type="danger" @click="changeDeleteMode"
               v-if="!$store.state.deleteMode">进入删除模式</el-button>
    <el-button type="danger" @click="changeDeleteMode" v-else>退出删除模式</el-button>
  </div>
</template>

<script>
export default {
  name: "DeleteBtn",
  methods: {
    changeDeleteMode() {
      this.$store.commit('changeDeleteMode')
    }
  }
}
</script>

<style scoped>

</style>
