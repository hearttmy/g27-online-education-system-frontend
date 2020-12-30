<template>
  <el-row class="course-wrapper">
    <div class="tool-bar">
      <div v-for="(item, i) in option" :key="i">
        <span>{{item.label}}</span>

        <el-select>
          <el-option>

          </el-option>
        </el-select>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "CourseLongCards",
  data() {
    return {
      option: [
        {
          label: '课程时间',
          options: [],
          value: '',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.course-wrapper {
  .course-cover {
    height: 200px;
    width: 100%;
  }
  .el-card:hover {
    cursor: pointer;
  }
}
</style>
