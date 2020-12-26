<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="第一章节" name="1">
          <MaterialBtn></MaterialBtn>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import MaterialBtn from "@/components/course/MaterialBtn";
export default {
  name: "Chapter",
  components: {MaterialBtn},
  data() {
    return {
      activeNames: [],
    }
  },
  methods: {
    handleChange() {

    }
  }
}
</script>

<style scoped>

</style>
