<template>
  <div>
    <div class="no-result" v-if="data.length === 0">
      <span>没有结果</span>
    </div>

    <div v-for="(item, index) in data"
        :key="index"
        class="article">
      <el-row style="padding: 10px 0;">
        <el-link type="primary" 
              class="title" 
              @click="$router.push({ 
                name: 'article_news_detail', 
                params: { article_id: item.articleID },
                query: { articleType: item.articleType }
              })"
        >{{item.title}}</el-link>
      </el-row>
      <span class="summary">{{item.summary}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  span {
    font-size: 1rem;
    color: #aaa;
  }
}

.article {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  .title {
    font-size: 1.2rem;
  }

  .summary {
    display: block;
    margin-bottom: 5px;
    padding: 5px 0;
    font-size: 1rem;
  }
}
</style>