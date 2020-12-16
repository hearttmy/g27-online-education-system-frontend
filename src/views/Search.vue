<template>
  <main-layout>
    <span class="header-title">搜索结果</span>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, key) in result"
                  :key="key"
                  :label="nameMap[key]" 
                  :name="key">
        <component :is="key + 'List'" :data="item"></component>
      </el-tab-pane>
    </el-tabs>
  </main-layout>
</template>

<script>
import MainLayout from '../../components/MainLayout';
import { OthersProvider } from '../../provider'
import ArticleList from './components/articleList'
import CoursesList from './components/coursesList'
import QaList from './components/qaList'

export default {
  components: {
    MainLayout,
    ArticleList,
    CoursesList,
    QaList
  },
  data () {
    return {
      activeName: '',
      result: {},
      nameMap: {
        article: '文章',
        courses: '课程',
        resources: '资源',
        qa: '答疑'
      }
    }
  },
  watch: {
    '$route.query.key': function (newSearchKey) {
      this.preSearch(newSearchKey)
    }
  },
  created () {
    this.preSearch(this.$route.query.key)
  },
  methods: {
    preSearch (searchKey) {
      if (!searchKey) {
        this.$router.replace({ name: 'homepage' })
        return
      }
      this.search(searchKey)
    },
    search (searchKey) {
      OthersProvider.search({ searchKey })
        .then(res => {
          if (res.code !== 1) {
            return
          }
          this.result = res.data
          this.activeName = Object.keys(this.result)[0]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  display: block;
  margin-bottom: 20px;
  font-size: 2rem;
}
</style>