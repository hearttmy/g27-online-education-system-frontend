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
        <span style="font-weight: bold; font-size: 20px;">{{this.activeIndex}}</span>
        <el-pagination
          background small style="float: right;"
          layout="prev, slot, next, jumper" :page-count="totalPage"
          :current-page.sync="currentPage">
          <span class="page-span">{{ currentPage }}/{{ totalPage }}</span>
        </el-pagination>

        <el-tab-pane label="全部" name="all">
          <CourseCards :courses="courseListInPage" :span="8"></CourseCards>
        </el-tab-pane>
        <el-tab-pane label="正在进行" name="current">
          <CourseCards :courses="courseListInPage" :span="8"></CourseCards>
        </el-tab-pane>
      </el-tabs>

    </div>
  </el-row>

</MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import CourseCards from "@/components/common/CourseCards";
import CourseListProvider from "@/network/request/courseList";

export default {
  name: "CourseList",
  components: {CourseCards, MainLayout},
  data() {
    return {
      courseIndex: ['全部课程', '理学', '工学', '哲学', '经济学'],
      activeIndex: '',
      courses: [],
      activeName: 'all',
      pageSize: 6,
      currentPage: 1,
    }
  },
  created() {
    this.activeIndex = this.courseIndex[this.$route.query.index]
    this.getCourse(this.activeIndex)
  },
  computed: {
    courseList() {
      switch (this.activeName) {
        case 'all':
          return this.courses
        case 'current':
          return this.courses.filter(course => {
            return course.state === '1'
          })
      }
    },
    courseListInPage() {
      if (this.currentPage * 6 <= this.courses.length) {
        return this.courseList.slice((this.currentPage - 1) * 6, this.currentPage * 6)
      }
      else {
        return this.courseList.slice((this.currentPage - 1) * 6, this.courses.length)
      }
    },
    totalPage() {
      return Math.ceil(this.courseList.length / this.pageSize)
    }
  },
  methods: {
    selectIndex(index) {
      this.activeIndex = this.courseIndex[index]
      this.$router.push({
        name: 'courseList',
        query: {
          index,
        }
      })
      this.activeName = 'all'
      this.getCourse(this.activeIndex)
    },

    getCourse(courseType) {
      CourseListProvider.getCourseByType({
        params: {
          'type': courseType,
        }
      })
      .then(res => {
        this.courses = res
      })
    },
  },
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
  width: 930px;
}

.page-span {
  min-width: 0px !important;
}

</style>
