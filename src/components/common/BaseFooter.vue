<template>
  <el-footer class="footer-wrapper" height="208px">
    <div class="footer-container">
      <img class="b-logo" src="~@/assets/img/bottom_logo.png" alt="logo" />

      <div class="footer-box">
        <p><span class="box-title">指导老师</span></p>
        <ul>
          <li>浙江大学计算机科学与技术学院 邢卫</li>
          <br>
          <li>浙江大学计算机科学与技术学院 林海</li>
        </ul>
      </div>

      <div class="footer-box">
        <p><span class="box-title">项目作者</span></p>
        <ul>
          <li>唐敏跃 季奕君</li>
          <br>
          <li>马辰越 郑燮石 官鹏杰</li>
        </ul>
      </div>

      <div class="footer-box">
        <p><span class="box-title">技术支持</span></p>
        <ul>
          <li>联系邮箱: 1156609896@qq.com</li>
          <br>
          <li>浙江大学软件需求工程项目组-G25</li>
        </ul>
      </div>

    </div>
  </el-footer>
</template>

<script>
export default {
name: "BaseFooter"
}
</script>

<style scoped>
.footer-wrapper {
  background-color: #157ed9;
  padding: 50px 0;
}

.footer-container {
  width: 1170px;
  margin: 0 auto;
  display: flex;
  color: #fff;
  font-size: 12px;
  height: 100%;
}

.b-logo {
  height: 56px;
  width: 260px;
}

.footer-box {
  width: 250px;
  text-align: center;
  padding: 0 8px;
  border-right: 1px solid #fff;
}

.box-title {
  font-size: 14px;
  font-weight: bold;
}
</style>
