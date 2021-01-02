<template>
  <el-card>
    <div class="homework-title-wrapper">{{homework.hwName}}</div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="作业要求" name="first">
        <el-card :body-style="{ padding: '0px', backgroundColor: 'rgba(247, 247, 247, 1)'}" shadow="never">
          <div class="field-wrapper">
            <div class="field">
              <span class="field-name">课程名称</span>
              <div class="field-value">
                <span>程序设计方法学</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">课程名称</span>
              <div class="field-value">
                <span>程序设计方法学</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">课程名称</span>
              <div class="field-value">
                <span>程序设计方法学</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">课程名称</span>
              <div class="field-value">
                <span>程序设计方法学</span>
              </div>
            </div>
            <div class="field">
              <span class="field-name">课程名称</span>
              <div class="field-value">
                <span>程序设计方法学</span>
              </div>
            </div>
          </div>
        </el-card>
        <div style="margin-top: 25px">
          {{homework.description}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的作业" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import CourseProvider from "@/network/request/course";

export default {
  name: "HomeworkDetail",
  data() {
    return {
      activeName: 'first',
      homework: {
        hwName: 'test',
        description: '123',
      },
    }
  },
  created() {
    CourseProvider.getHW({
      params: {
        courseID: this.$route.params.course_id,
      }
    })
    .then(res => {
      console.log(res)
      if (res.state) {
        this.homework = res.HW[this.$route.params.homework_id]
      }
    })
  },
  methods: {
    handleClick() {

    },
  }
}
</script>

<style lang="scss" scoped>
.homework-title-wrapper {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.field-wrapper {
  padding: 20px;
  overflow: hidden;
  .field {
    width: 31%;
    float: left;
    padding: 10px;
    .field-name {
      color:#737373;
      display: inline-block;
    }
    .field-value {
      display: inline-block;
      margin-left: 20px;
      max-width: 180px;
    }
  }
}
</style>
