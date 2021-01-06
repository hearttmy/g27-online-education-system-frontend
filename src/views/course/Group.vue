<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item, i) in groupData" :key="i" :name="i">
          <template slot="title">
            <span style="font-size: 18px;font-weight: bold">{{item.groupName}}</span>
            <el-button style="margin-left: 20px" size="mini" v-if="$store.state.deleteMode"
                       @click="">删除分组</el-button>
          </template>

          <div>
            <el-table style="width: 100%" :data="item.stu" border stripe>
              <el-table-column prop="id" label="学号">
              </el-table-column>

              <el-table-column prop="realName" label="姓名">

              </el-table-column>

            </el-table>
          </div>



        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import CourseProvider from "@/network/request/course";
export default {
  name: "Group",
  data() {
    return {
      activeNames: [],
      groupData: [],
    }
  },
  async created() {
    await this.getGroup()
    for (let i = 0; i < this.groupData.length; ++i) {
      this.activeNames.push(i)
    }
  },
  methods: {
    getGroup() {
      CourseProvider.getGroup({
        courseID: this.$store.state.course.courseID
      }).then(res => {
        this.groupData = res.Group
      })
    },

  }

}
</script>

<style scoped>

</style>
