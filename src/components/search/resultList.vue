<template>
  <div>
    <div class="no-result" v-if="data.length === 0">
      <span>没有结果</span>
    </div>

    <el-row v-for="(item, index) in data"
        :key="index" type="flex" align="middle" class="course">
      <el-col :span="2">
        <el-image :src="item.cover" fit="cover"></el-image>
      </el-col>
      <el-col :span="22" style="padding: 0 20px;">
        <el-link type="primary"
                class="title"
                @click="$router.push({
                  name: 'course_detail',
                  params: { course_id: item.courseID } })">
          {{item.coursename}}
        </el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  span {
    font-size: 1rem;
    color: #aaa;
  }
}

.course {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}

.title {
  font-size: 1.2rem;
}
</style>
