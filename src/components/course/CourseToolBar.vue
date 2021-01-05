<template>
  <el-card>
    <component :is="toolBarType"></component>
  </el-card>
</template>

<script>
import ChapterToolBar from "@/components/course/toolBarItem/ChapterToolBar";
import BulletinToolBar from "@/components/course/toolBarItem/BulletinToolBar";
import OutlineToolBar from "@/components/course/toolBarItem/OutlineToolBar";
import HomeworkToolBar from "@/components/course/toolBarItem/HomeworkToolBar";
import HomeworkDetailToolBar from "@/components/course/toolBarItem/HomeworkDetailToolBar";
import ForumToolBar from "@/components/course/toolBarItem/ForumToolBar";
import ForumDetailToolBar from "@/components/course/toolBarItem/ForumDetailToolBar";
export default {
  name: "CourseToolBar",
  components: {
    ChapterToolBar,
    BulletinToolBar,
    OutlineToolBar,
    HomeworkToolBar,
    HomeworkDetailToolBar,
    ForumToolBar,
    ForumDetailToolBar,
  },
  computed: {
    toolBarType() {
      return this.$route.name + 'ToolBar'
    }
  },
}
</script>

<style scoped>

</style>
