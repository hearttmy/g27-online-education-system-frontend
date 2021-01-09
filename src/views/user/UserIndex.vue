<template>
  <div style="padding-left: 20px; width: 772px;">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="动态" name="first">

        <div v-if="activityListInPage.length" style="margin-top: 10px; margin-bottom: 10px; overflow: hidden">
          <el-pagination
            background small style="float: right;"
            layout="prev, slot, next, jumper" :page-count="totalPage"
            :current-page.sync="currentPage">
            <span style="min-width: 0px !important;">{{ currentPage }}/{{ totalPage }}</span>
          </el-pagination>
        </div>

        <div v-else>
          暂无动态
        </div>


        <div v-for="(item, i) in activityListInPage" :key="i">
          <ActivityStream :activity="item"></ActivityStream>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ActivityStream from "@/components/user/ActivityStream";
import UserProvider from "@/network/request/user";
export default {
  name: "UserIndex",
  components: {ActivityStream},
  data() {
    return {
      activeName: 'first',
      activityList: [],
      pageSize: 6,
      currentPage: 1,
    }
  },
  created() {
    this.getActivity()
  },
  computed: {
    activityListInPage() {
      if (this.currentPage * this.pageSize <= this.activityList.length) {
        return this.activityList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
      else {
        return this.activityList.slice((this.currentPage - 1) * this.pageSize, this.activityList.length)
      }
    },
    totalPage() {
      return Math.ceil(this.activityList.length / this.pageSize)
    }
  },
  methods: {
    getActivity() {
      UserProvider.getActivity({
        headers: {'Authorization': this.$store.state.token},
      })
      .then(res => {
        console.log(res)
        if (res.state) {
          this.activityList = res.result
          this.activityList.reverse()
        }
      })
    },


  },
}
</script>

<style scoped>

</style>
