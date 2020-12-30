<template>
  <el-card :body-style="'padding: 0px;'" shadow="never">
    <div class="bulletin-wrapper">
      <div class="bulletin-title">
        <p>title</p>
        <p style="color:#737373;font-size: 13px;">2020/12/29</p>
      </div>
      <div class="bulletin-body">
        <p>123</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Bulletin",
}
</script>

<style scoped>
.bulletin-wrapper {
  border-bottom: 1px solid #d8d8d8;
  padding: 10px;
}
.bulletin-body {
  margin-top: 30px;
}
</style>
