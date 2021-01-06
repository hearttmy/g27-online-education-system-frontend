<template>
  <el-card :body-style="'padding: 0px'" v-if="$store.state.course.teacher">
    <el-card :body-style="'padding: 0px'" shadow="never" style="border: none">
      <div class="outline-title-wrapper">
        <i class="el-icon-ice-cream"></i> 课程信息
      </div>

      <div class="field-wrapper">
        <div class="field">
          <span class="field-name">课程名称</span>
          <div class="field-value">
            <span>{{ $store.state.course.courseName }}</span>
          </div>
        </div>
        <div class="field">
          <span class="field-name">开课院系</span>
          <div class="field-value">
            <span>{{ $store.state.course.faculty}}</span>
          </div>
        </div>
        <div class="field">
          <span class="field-name">课程分类</span>
          <div class="field-value">
            <span>{{ $store.state.course.courseType}}</span>
          </div>
        </div>

        <div class="field">
          <span class="field-name">课程学期</span>
          <div class="field-value">
            <span>{{ $store.state.course.DurationTime}}</span>
          </div>
        </div>

        <div class="field">
          <span class="field-name">开课时间</span>
          <div class="field-value">
            <span>{{ getTime($store.state.course.created)}}</span>
          </div>
        </div>

        <div class="field">
          <span class="field-name">授课教师</span>
          <div class="field-value">
            <span>{{ $store.state.course.teacher[0].username }}</span>
          </div>
        </div>

      </div>
    </el-card>

    <el-card :body-style="'padding: 0px'" shadow="never" style="border: none">
      <div class="outline-title-wrapper">
        <i class="el-icon-ice-cream"></i>课程简介
      </div>
      <div style="padding: 20px">
        {{ $store.state.course.information }}
      </div>
    </el-card>
  </el-card>
</template>

<script>
import moment from 'moment'
export default {
  name: "Outline",
  methods: {
    getTime(time) {
      return moment(time).format('yyyy-MM-DD')
    }
  },
}
</script>

<style lang="scss" scoped>
.outline-title-wrapper {
  padding: 20px;
  border-bottom: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
}
.field-wrapper {
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  .field {
    width: 33.33333%;
    float: left;
    margin-bottom: 20px;
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
