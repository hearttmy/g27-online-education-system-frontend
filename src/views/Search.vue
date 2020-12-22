<template>
  <MainLayout>
    <span class="header-title">搜索结果</span>
    <ResultList :data="result"></ResultList>
  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import ResultList from "@/components/search/resultList";

export default {
  name: "Search",
  components: {ResultList, MainLayout},
  data () {
    return {
      activeName: '',
      result: [],
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
    preSearch(searchKey) {
      if (!searchKey) {
        this.$router.replace({name: 'homepage'})
        return
      }
      this.search(searchKey)
    },
    search(searchKey) {

    },
  },
}
</script>

<style scoped>

</style>
