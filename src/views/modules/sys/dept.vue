<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__dept">
      <el-form :inline="true">
        <el-form-item>
          <el-button v-if="$hasPermission('sys:dept:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading"
                :data="dataList"
                row-key="id"
                border
                style="width: 100%;"
                :header-cell-style="headerStyle"
                :cell-style="cellStyle">
        <el-table-column prop="name" :label="$t('dept.name')" header-align="center" min-width="150"></el-table-column>
        <el-table-column prop="parentName" :label="$t('dept.parentName')" header-align="center" align="center"></el-table-column>
        <el-table-column prop="address" label= 联系地址 header-align="center" align="center"></el-table-column>
        <el-table-column prop="phone" label= 电话 header-align="center" align="center"></el-table-column>
        <el-table-column prop="email" label= 邮箱 header-align="center" align="center"></el-table-column>
        <el-table-column prop="zipCode" label= 邮政编码 header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label= 创建时间 header-align="center" align="center"></el-table-column>
        <el-table-column prop="sort" :label="$t('dept.sort')" header-align="center" align="center" width="80"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('sys:dept:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('sys:dept:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './dept-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/dept/list',
        deleteURL: '/sys/dept'
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    headerStyle () {
      return {
        'font-size': '14px',
        height: '36px',
        padding: '0'
      }
    },
    cellStyle () {
      return {
        'font-size': '14px',
        height: '48px',
        padding: '0'
      }
    }
  }
}
</script>
