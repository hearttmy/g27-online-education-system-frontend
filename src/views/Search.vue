<template>
  <MainLayout :lg="14">
    <div class="search-title">
      <span>搜索结果</span>
    </div>

    <CourseLongCards v-if="result.length" :courses="result"></CourseLongCards>
    <div v-else style="padding: 20px;">
      没有结果
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import ResultList from "@/components/search/ResultList";
import SearchProvider from "@/network/request/search";
import CourseLongCards from "@/components/common/CourseLongCards";

export default {
  name: "Search",
  components: {CourseLongCards, ResultList, MainLayout},
  data () {
    return {
      result: [],
    }
  },
  watch: {
    '$route.query.key': function (newSearchKey) {
      this.search(newSearchKey)
    }
  },
  created () {
    this.search(this.$route.query.key)
  },
  methods: {
    search(searchKey) {
      SearchProvider.search({
          params: {
            'title': searchKey
          }
      })
      .then(res => {
        this.result = res.map(value => {
          value['teacherName'] = value.teacher[0].realName
          return value
        })
      })
    },
  },
}
</script>

<style scoped>
.search-title {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
