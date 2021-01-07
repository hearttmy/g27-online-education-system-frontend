<template>
  <div>
    <el-button type="primary" @click="groupDialog = true">添加分组</el-button>
    <DeleteBtn></DeleteBtn>

    <el-dialog :visible.sync="groupDialog">
      <el-table
        ref="multipleTable"
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
        <el-button @click="groupDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CourseProvider from "@/network/request/course";
import DeleteBtn from "@/components/course/DeleteBtn";

export default {
  name: "GroupToolBar",
  components: {DeleteBtn},
  data() {
    return {
      groupDialog: false,
      studentSelection: [],
      groupName: '',
      studentList: [],
    }
  },
  created() {
    this.getStuNoGroup()
  },
  methods: {
    addGroup() {
      CourseProvider.makeGroup({
        courseID: this.$store.state.course.courseID,
        groupName: this.groupName,
        groupMember: this.studentList,
      }).then(res => {
        if (res.state) {
          this.$message({
            showClose: true,
            message: '添加分组成功',
            type: 'success',
          })
          this.$refs.multipleTable.clearSelection()
          this.groupName = ''
          this.groupDialog = false
          this.$router.go(0)
        }
      })
    },
    getStuNoGroup() {
      CourseProvider.getStuNoGroup({
        courseID: this.$store.state.course.courseID
      }).then(res => {
        this.studentList = res.noGroup.filter(value => {
          if (value) {
            return true
          }
          else {
            return false
          }
        }).map(value => {
          const tmp = {}
          tmp['id'] = value[0].id
          tmp['realName'] = value[0].realName
          return tmp
        })

      })
    },
    handleSelectionChange(val) {
      this.studentSelection = val;
    }

  }

}
</script>

<style scoped>

</style>
