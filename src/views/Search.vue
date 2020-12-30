<template>
  <MainLayout :lg="14">
    <div class="search-title">
      <span>搜索结果</span>
    </div>

    <ResultList :data="result"></ResultList>
  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import ResultList from "@/components/search/ResultList";
import SearchProvider from "@/network/request/search";

export default {
  name: "Search",
  components: {ResultList, MainLayout},
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
}
</style>
