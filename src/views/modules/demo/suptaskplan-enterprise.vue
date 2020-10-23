<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-demo__suptaskplan}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <div style="height: 30px; line-height: 30px; color: #fff; background-color: #0bb2d4; margin-bottom: 20px; padding-left: 20px">检查企业信息</div>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="area" label="区域" header-align="center" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" header-align="center" align="center"></el-table-column>
        <el-table-column prop="linkMan" label="联系人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="linkWay" label="联系方式" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('demo:goods:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              :current-page="page"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="limit"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChangeHandle"
              @current-change="pageCurrentChangeHandle">
      </el-pagination>
      <div style="margin-top: 40px">
        <span style="display: inline-block; width: 100px; height: 30px; margin-left: 940px"></span>
        <el-button @click.native="tabRemoveHandle($store.state.contentTabsActiveName)">取消</el-button>
        <el-button v-if="$hasPermission('demo:goods:save')" type="primary" @click="addOrUpdateHandle()">移除</el-button>
        <el-button v-if="$hasPermission('demo:goods:delete')" type="danger" @click="deleteHandle()">保存</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/demo/suptaskplanenterprise',
        getDataListIsPage: true,
        deleteURL: '/demo/suptaskplanenterprise',
        deleteIsBatch: true
      },
      dataForm: {
        id: this.$route.params.taskId
      }
    }
  },
  methods: {
    // tabs, 删除tab
    tabRemoveHandle (tabName) {
      if (tabName === 'home') {
        return false
      }
      this.$store.state.contentTabs = this.$store.state.contentTabs.filter(item => item.name !== tabName)
      if (this.$store.state.contentTabs.length <= 0) {
        this.$store.state.sidebarMenuActiveName = this.$store.state.contentTabsActiveName = 'home'
        return false
      }
      // 当前选中tab被删除
      if (tabName === this.$store.state.contentTabsActiveName) {
        let tab = this.$store.state.contentTabs[this.$store.state.contentTabs.length - 1]
        this.$router.push({
          name: tab.name,
          params: { ...tab.params },
          query: { ...tab.query }
        })
      }
    }
  }
}
</script>
