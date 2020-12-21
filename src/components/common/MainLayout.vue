<template>
  <el-row class="main-layout" type="flex" justify="center">
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    xs: {
      type: Number,
      default: 24
    },
    sm: {
      type: Number,
      default: 22
    },
    md: {
      type: Number,
      default: 18
    },
    lg: {
      type: Number,
      default: 18
    },
    xl: {
      type: Number,
      default: 18
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
