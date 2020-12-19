<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="3">
        <TheBaseNavSideBar />
      </el-col>
      <el-col :span="21">
        <router-view
          :user.sync="user"
          :courseID="$route.params.course_id"
        ></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TheBaseNavSideBar from '@/components/course/BaseNavSideBar';

export default {
  data() {
    return {};
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  components: {
    TheBaseNavSideBar
  }
};
</script>

<style lang="scss" scoped>
</style>
