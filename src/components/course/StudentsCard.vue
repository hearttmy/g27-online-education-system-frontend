<template>
  <el-card shadow="always">
    <div slot="header">
      <span>学习该课程的学生</span>
    </div>
    <el-row class="stus-box">
      <el-row v-if="stus.length === 0">
        <span class="no-stus">暂无学生学习该课程</span>
      </el-row>
      <el-row>
        <div v-for="stu in stus.slice(0, 8)" :key="stu.id" style="display: inline-block;">
          <img :src="$serverBaseUrl + stu.avatar" alt class="stu-avatar" :title="stu.username" />
        </div>
      </el-row>
      <el-row class="see-all-stus">
        <el-button type="text" @click="checkingAllStu = true">查看全部</el-button>
      </el-row>
    </el-row>
    <el-dialog
      title="学习该课程的学生"
      :visible.sync="checkingAllStu"
      width="30%">
      <div>
        <img
          v-for="stu in stus"
          :key="stu.id"
          :src="$serverBaseUrl + stu.avatar"
          alt
          class="stu-avatar"
          :title="stu.username"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkingAllStu = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      checkingAllStu: false
    };
  },
  props: {
    stus: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.stus-box {

  .no-stus {
    display: block;
    padding: 10px;
    font-size: 0.9rem;
    color: #909090;
  }

  .see-all-stus {
    text-align: center;
  }
}

.stu-avatar {
  display: inline-block;
  margin: 0 5px 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  border: 1px solid #ddd;
}
</style>
