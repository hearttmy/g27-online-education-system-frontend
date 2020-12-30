<template>
  <MainLayout :lg="14">
    <div class="search-title">
      <span>搜索结果</span>
    </div>

   <CourseLongCards :courses="result"></CourseLongCards>
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
        console.log(res)
        this.result = res
      })
      .catch(err => {

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
