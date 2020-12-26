<template>
  <el-card shadow="never">
    <el-row>
      <el-button type="primary" >加入课程</el-button>
      <div style="float: right">
        <el-input class="search-input" v-model="input"
                  placeholder="搜索我的课程" @keyup.enter.native="search"/>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "CourseToolBar",
  data() {
    return {
      input: '',
    }
  },
  methods: {
    search() {

    },
  }
}
</script>

<style scoped>
.search-input {
  width: 200px;
  margin-right: 10px;
}
</style>
