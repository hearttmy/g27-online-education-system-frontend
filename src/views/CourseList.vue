<template>
<MainLayout>
  <el-row type="flex">
    <el-card class="index-box" shadow="never">
      <el-menu @select="selectIndex" :default-active="$route.query.index">
        <el-menu-item v-for="(item, i) in courseIndex" :index="i.toString()" :key="item">
          {{item}}
        </el-menu-item>
      </el-menu>
    </el-card>

    <div class="list-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="first">
          <CourseCards :courses="courseList" :span="8"></CourseCards>
        </el-tab-pane>
        <el-tab-pane label="正在进行" name="second">
          <CourseCards :courses="courseList" :span="8"></CourseCards>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-row>

</MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import CourseCards from "@/components/courseList/CourseCards";

export default {
  name: "CourseList",
  components: {CourseCards, MainLayout},
  data() {
    return {
      courseIndex: ['全部课程', '理学', '工学', '哲学', '经济学'],
      courses: [1, 2, 3, 4, 5, 6],
      activeName: 'first',
    }
  },
  computed: {
    courseList() {
      switch (this.activeName) {
        case "first":
          return this.courses
        case "second":
          return this.courses
      }
    }
  },
  methods: {
    selectIndex(index) {
      if (this.$route.query.index === index) {
        return
      }
      this.$router.push({
        name: 'courseList',
        query: {
          index,
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.index-box {
  width: 150px !important;
  height: 400px;
}

.list-wrapper {
  margin-left: 30px;
  padding-top: 25px;
}

.course-wrapper {
  margin-top: 15px;
  .course-cover {
    height: 200px;
    width: 100%;
  }
}
</style>
