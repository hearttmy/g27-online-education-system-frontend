<template>
  <el-row>
    <el-button type="primary" @click="dialogFormVisible = true">添加章节</el-button>
    <el-button type="danger">删除章节</el-button>
    <el-button type="primary">新增学习活动</el-button>
    <el-button type="danger">删除学习活动</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="'120px'">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="'120px'">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "ChapterToolBar",
  data() {
    return {
      input: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  methods: {
    search() {

    }
  }
}
</script>

<style scoped>

</style>
