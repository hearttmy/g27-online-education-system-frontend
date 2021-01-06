<template>
  <div>
    <el-card :body-style="'padding: 10px'">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item, i) in groupData" :key="i" :name="i">
          <template slot="title">

          </template>

          <div>
            <el-table style="width: 100%">
              <el-table-column label="学号">

              </el-table-column>
              <el-table-column label="姓名">

              </el-table-column>

              <el-table-column label="职责">

              </el-table-column>
            </el-table>
          </div>



        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Group",
  data() {
    return {
      activeNames: [],
      groupData: [],
    }
  },
  async created() {
    for (let i = 0; i < this.groupData.length; ++i) {
      this.activeNames.push(i)
    }
  },
  methods: {

  }

}
</script>

<style scoped>

</style>
