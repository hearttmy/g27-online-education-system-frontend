<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="(item, i) in course.content" :key="i" :name="i">
          <template slot="title">
            {{item.ChapterName}}
            <el-button style="margin-left: 20px" size="mini" v-if="deleteMode"
                       @click="deleteChapter(item._id)">删除章节</el-button>
          </template>
          <MaterialBtn v-for="(file, i) in item.part" :key="i"
                       :file="file" :deleteMode="deleteMode" :courseID="course.courseID"
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
  props: {
    deleteMode: Boolean,
  },
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
  methods: {
    handleChange() {

    },
    deleteChapter(chapterID) {
      console.log(this.course)
      const tmp = {};
      tmp['courseID'] = this.course.courseID
      tmp['chapterID'] = chapterID
      CourseProvider.deleteChapter(tmp,
        {headers: {'Authorization': this.$store.state.token}})
      .then(res => {
        console.log(res)
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
