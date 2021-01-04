<template>
  <el-row>
    <el-button type="primary" @click="addHomeworkDialog = true">修改作业</el-button>
  </el-row>
</template>

<script>
import DeleteBtn from "@/components/course/DeleteBtn";
export default {
  name: "HomeworkDetailToolBar",
  components: {DeleteBtn}
}
</script>

<style scoped>

</style>
