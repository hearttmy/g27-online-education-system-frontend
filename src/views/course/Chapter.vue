<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item, i) in course.content" :key="i" :name="i">
          <template slot="title">
            <span style="font-size: 18px;font-weight: bold">{{item.ChapterName}}</span>
            <el-button style="margin-left: 20px" size="mini" v-if="$store.state.deleteMode"
                       @click="deleteChapter(item._id)">删除章节</el-button>
          </template>
          <MaterialBtn v-for="(file, i) in item.part" :key="i"
                       :file="file" :courseID="course.courseID"
                        :chapterID="item._id"></MaterialBtn>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import MaterialBtn from "@/components/course/MaterialBtn";
import CourseProvider from "@/network/request/course";
export default {
  name: "Chapter",
  components: {MaterialBtn},
  data() {
    return {
      activeNames: [],
    }
  },
  computed: {
    course() {
      return this.$store.state.course
    }
  },
  created() {
    for (let i = 0; i < this.$store.state.course.content.length; ++i) {
      this.activeNames.push(i)
    }
  },
  methods: {
    deleteChapter(chapterID) {
      console.log(this.course)
      const tmp = {};
      tmp['courseID'] = this.course.courseID
      tmp['chapterID'] = chapterID
      CourseProvider.deleteChapter(tmp,
        {headers: {'Authorization': this.$store.state.token}})
      .then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '删除章节成功',
            type: 'success'
          })
        }
        this.$store.dispatch('updateCourseInfo', this.$route.params.course_id)
      })
      .catch(err => {

      })
    }
  }
}
</script>

<style scoped>

</style>
