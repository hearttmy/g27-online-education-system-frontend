<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="(item, i) in course.content" :key="i" :name="i">
          <template slot="title">
            {{item.ChapterName}}<el-button style="margin-left: 20px" size="mini" v-if="deleteMode" @click="deleteChapter">删除章节</el-button>
          </template>
          <MaterialBtn v-for="(file, i) in item.part" :key="i"
                       :file="file" :deleteMode="deleteMode"></MaterialBtn>
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
  props: {
    course: Object,
    deleteMode: Boolean,
  },
  data() {
    return {
      activeNames: [],
    }
  },
  methods: {
    handleChange() {

    },
    deleteChapter() {

    }
  }
}
</script>

<style scoped>

</style>
