<template>
  <div class="card" @click="navToUrl">
    <div class="title-wrapper">
      <div class="icon-wrapper">
        <i :class="iconType" style="font-size: 40px;"></i>
      </div>
      <div class="info-wrapper">
        <div>
          {{infoTitle}}
        </div>
        <div style="color: #999;">
          {{getTime(activity.date)}}
        </div>
      </div>
    </div>
    <div>
      课程
      <div style="display: inline-block; color: #00bbbd;">
        {{activity.courseName}}
      </div>
      发布了{{activity.type}}：
      <div style="display: inline-block; color: #00bbbd;">
        {{activity.title}}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ActivityStream",
  props: {
    activity: Object
  },
  data() {
    return {
      iconTypeArray: ['el-icon-bell bell-color', 'el-icon-edit edit-color', 'el-icon-notebook-2 bell-color'],
      infoTitleArray: ['公告发布', '作业发布', '课件发布'],
      routerArray: ['/bulletin', '/homework', '/chapter'],
    }
  },
  computed: {
    _type() {
      switch (this.activity.type) {
        case '公告':
          return 0
        case "作业":
          return 1
        case "课件":
          return 2
      }
    },
    iconType() {
      return this.iconTypeArray[this._type]
    },
    infoTitle() {
      return this.infoTitleArray[this._type]
    },
  },
  methods: {
    getTime(time) {
      return moment(time).format('yyyy-MM-DD HH:mm:ss')
    },
    navToUrl() {
      this.$store.dispatch('updateCourseTchInfo', this.activity.courseID)
      this.$router.push('/course/'+ this.activity.courseID + this.routerArray[this._type])
    }
  }

}
</script>

<style lang="scss" scoped>
.card {
  &:hover {
    border-color: #00bbbd;
  }
  overflow-wrap: break-word;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  padding: 20px;
  margin-bottom: 10px;
  .title-wrapper {
    margin-bottom: 20px;
    .icon-wrapper {
      display: inline-block;
      width: 40px;
      height: 40px;
      overflow: hidden;
      margin-right: 10px;
      text-align: center;
      vertical-align: bottom;
    }
    .info-wrapper {
      display: inline-block;
    }
  }
}

.bell-color {
  color: #00bbbd;
}

.edit-color {
  color: #ff4d4d;
}


</style>
