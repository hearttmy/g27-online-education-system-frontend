<template>
  <el-card>
    <component :is="toolBarType" @changeDeleteMode="changeDeleteMode"></component>
  </el-card>
</template>

<script>
import ChapterToolBar from "@/components/course/toolBarItem/ChapterToolBar";
import BulletinToolBar from "@/components/course/toolBarItem/BulletinToolBar";
import OutlineToolBar from "@/components/course/toolBarItem/OutlineToolBar";
import HomeworkToolBar from "@/components/course/toolBarItem/HomeworkToolBar";

export default {
  name: "CourseToolBar",
  components: {ChapterToolBar, BulletinToolBar, OutlineToolBar, HomeworkToolBar},
  computed: {
    toolBarType() {
      return this.$route.name + 'ToolBar'
    }
  },
  methods: {
    changeDeleteMode() {
      this.$emit('changeDeleteMode')
    },
  }
}
</script>

<style scoped>

</style>
