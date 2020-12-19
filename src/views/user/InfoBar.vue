<template>
  <div>
    <img src="~@/assets/img/infoBar.png" class="top-bac">
    <div class="userInfo-container">
      <img class="u-img" src="~@/assets/img/userImg.png" />
      <div class="u-name"><span class="f-thide">tmy</span></div>
      <div class="u-tag"><span>学生</span></div>
      <div class="u-f2f">
        <span class="u-f2f-span">
          <span>关注0人</span> | <span> 粉丝0人 </span>
        </span>
      </div>
      <div class="u-box">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoBar"
}
</script>

<style lang="scss" scoped>
.top-bac {
  position: absolute;
}

.userInfo-container {
  left: 0px;
  top: 0px;
  width: 1260px;
  height: 220px;
  border-radius: 0px;
  position: relative;
  clear: none;
  display: block;
  min-width: 0px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  margin: 0px auto;
  padding: 0px;

  .u-img {
    left: 37px;
    top: 40px;
    width: 96px;
    height: 96px;
    border-radius: 50px;
    position: absolute;
    clear: none;
    display: block;
    min-width: 0px;
    z-index: 3;
    color: rgb(0, 0, 0);
    font-size: 16px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-width: 3px;
    background-color: rgb(255, 255, 255);
    margin: 0px;
    padding: 0px;
    cursor: auto;
  }

  .u-name{
    left: 167px;
    top: 38px;
    width: 564px;
    height: 35px;
    border-radius: 0px;
    position: absolute;
    clear: none;
    font-size: 0px;
    display: block;
    min-width: 0px;
    z-index: 3;
    color: rgb(0, 0, 0);
    margin: 0px;
    padding: 0px;
    line-height: 35px;

    .f-thide {
      line-height: 35px;
      display: inline-block;
      width: 100%;
      font-family: 微软雅黑, "Microsoft YaHei";
      font-size: 26px;
      color: rgb(255, 255, 255);
      text-align: left;
      vertical-align: middle;
    }
  }

  .u-tag {
    left: 167px;
    top: 78px;
    width: 564px;
    height: 17px;
    border-radius: 0px;
    position: absolute;
    clear: none;
    font-size: 0px;
    display: block;
    min-width: 0px;
    z-index: 3;
    color: rgb(0, 0, 0);
    margin: 0px;
    padding: 0px;
    line-height: 13px;

    span {
      line-height: 13px;
      display: inline-block;
      width: 100%;
      font-family: 微软雅黑, "Microsoft YaHei";
      font-size: 13px;
      color: rgb(255, 255, 255);
      text-align: left;
      vertical-align: middle;
    }
  }

  .u-f2f {
    left: 167px;
    top: 102px;
    width: 500px;
    height: 21px;
    border-radius: 0px;
    position: absolute;
    clear: none;
    font-size: 0px;
    min-width: 0px;
    color: rgb(0, 0, 0);
    margin: 0px;
    padding: 0px;

    .u-f2f-span {
      line-height: normal;
      display: inline-block;
      width: 100%;
      font-family: 微软雅黑, "Microsoft YaHei";
      font-size: 16px;
      color: rgb(255, 255, 255);
      text-align: left;
      vertical-align: middle;
    }
  }
}
</style>
