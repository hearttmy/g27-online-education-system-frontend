<template>
  <div>
    <el-card :body-style="'padding: 0px'" shadow="never">
      <div style="padding: 20px; border-bottom: 1px solid #d8d8d8;">
        <i class="el-icon-ice-cream"></i> 课程信息
      </div>

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

    <el-card :body-style="'padding: 0px'" shadow="never" style="margin-top: 20px">
      <div style="padding: 20px;border-bottom: 1px solid #d8d8d8;">
        <i class="el-icon-ice-cream"></i>课程简介
      </div>
      <div style="padding: 20px">
        程序设计方法学
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Outline",
}
</script>

<style lang="scss" scoped>
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
