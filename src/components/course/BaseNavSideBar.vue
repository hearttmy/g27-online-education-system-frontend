<template>
  <el-menu
    :default-active="path"
    class="nav-menu"
    :router="true"
    ref="sideNavMenu"
  >
    <el-menu-item
      :index="navItem.path"
      v-for="(navItem, index) in paths"
      :key="index"
    >
      {{ navItem.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'baseNavSideBar',
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      path: '/index',
      input: '',
      isAuthActive: false,
      indexList: [],

      paths: [
        {path: '/index', name: '课程内容'},
        {path: '/notice', name: '课程公告'},
        {path: '/resources', name: '资源'},
        {path: '/exercise', name: '作业练习'},
        {path: '/exam', name: '考试'}
      ]
    };
  },
  created() {
    this.baseURL = '/course/' + this.$route.params.course_id;
    for (const item of this.paths) {
      item.path = this.baseURL + item.path;
    }
    this.path = this.$route.path.replace(/^((\/[^\/]+){3})(\/.+)/,'$1');
  },  
  watch: {
    '$route.path': function() {
      let path = this.$route.path.replace(/(\/[^\/]+)(\/+$)/g, '$1');
      this.path = this.$route.path.replace(/^((\/[^\/]+){3})(\/.+)/,'$1');
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
