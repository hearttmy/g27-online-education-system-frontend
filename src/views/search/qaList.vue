<template>
  <div>
    <el-table :data="data"
							stripe
							highlight-current-row>
		  <el-table-column prop="title"
									    label="标题"
									    align="left">
			</el-table-column>
			<el-table-column prop="questionerName"
									    label="姓名"
									    align="left">
			</el-table-column>
			<el-table-column prop="tag"
						          label="问题标签"
									    align="left">
			</el-table-column>
			<el-table-column prop="created"
					            label="提出时间"
									    sortable
									    align="left">
			</el-table-column>
		  <el-table-column prop="replysLength"
									    label="回答数"
									    sortable
									    align="left">
      </el-table-column>
			<el-table-column label="" align="center">
				<template slot-scope="scope">
					<el-button size="mini"
										@click="$router.push({
                      name: 'qa_question',
                      params: {
                        question_id: scope.row.qaID
                      }
			              })"
					>查看</el-button>
				</template>
			</el-table-column>
		</el-table>
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

</style>