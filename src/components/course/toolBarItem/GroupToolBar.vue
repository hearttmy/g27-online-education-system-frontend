<template>
  <div>
    <el-button type="primary" @click="groupDialog = true">添加分组</el-button>
    <el-dialog :visible.sync="groupDialog">
      <el-table
        :data="studentList"
        style="width: 100%"
        border
        height="300"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="realName" label="姓名">

        </el-table-column>

        <el-table-column prop="id" label="学号">

        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-table :data="studentSelection">
          <el-table-column prop="realName">
            <template slot="header" slot-scope="scope">
              <div>已选学生列表</div>
            </template>
          </el-table-column>

          <el-table-column prop="id">

          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px">
        <div style="margin-bottom: 10px">分组名称：</div>
        <el-input placeholder="请输入分组名称" v-model="groupName"></el-input>
        <el-button style="margin-top: 10px" type="primary" @click="addGroup">添加分组</el-button>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="groupDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GroupToolBar",
  data() {
    return {
      groupDialog: false,
      studentSelection: [],
      groupName: '第一组',
    }
  },
  computed: {
    studentList() {
      return this.$store.state.course.studentInfo
    },
  },
  created() {
  },
  methods: {
    addGroup() {

    },
    handleSelectionChange(val) {
      this.studentSelection = val;
    }

  }

}
</script>

<style scoped>

</style>
