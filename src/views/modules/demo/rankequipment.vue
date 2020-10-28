<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-row :gutter="20">
      <!--侧边部门数据-->
      <el-col :span="4">
        <div style="height: 40px; line-height: 40px; text-align: center"><h3>部门列表</h3></div>
        <el-tree
                :props="props"
                :load="loadNode"
                lazy
                :expand-on-click-node="false"
                @node-click="handleNode">
        </el-tree>
      </el-col>
      <!--移动装备执法信息-->
      <el-col :span="20">
        <div class="mod-demo__rankequipment">
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-button v-if="$hasPermission('demo:rankequipment:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="$hasPermission('demo:rankequipment:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item>
          </el-form>
          <el-table
                  v-loading="dataListLoading"
                  :data="dataList"
                  border
                  @selection-change="dataListSelectionChangeHandle"
                  style="width: 100%;"
                  :header-cell-style="headerStyle"
                  :cell-style="cellStyle">
            <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
            <el-table-column prop="deptName" label="所属机构" header-align="center" align="center"></el-table-column>
            <el-table-column prop="preDeptName" label="上级机构" header-align="center" align="center"></el-table-column>
            <el-table-column prop="handMobileNumber" label="手持移动终端配置数" header-align="center" align="center"></el-table-column>
            <el-table-column prop="laptopNumber" label="笔记本电脑配置数" header-align="center" align="center"></el-table-column>
            <el-table-column prop="portablePrinterNumber" label="便携式扫描打印配置数" header-align="center" align="center"></el-table-column>
            <el-table-column prop="portableWifiNumber" label="便携式Wifi热点配置数" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" header-align="center" align="center"></el-table-column>
            <el-table-column prop="updaterName" label="修改人" header-align="center" align="center"></el-table-column>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
              <template slot-scope="scope">
                <el-button v-if="$hasPermission('demo:rankequipment:info')" type="text" size="small" @click="infoHandle(scope.row.id)">查看</el-button>
                <el-button v-if="$hasPermission('demo:rankequipment:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                <el-button v-if="$hasPermission('demo:rankequipment:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
          <!-- 弹窗, 新增 / 修改 -->
          <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
          <info v-if="infoVisible" ref="info" @refreshDataList="getDataList"></info>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './rankequipment-add-or-update'
import Info from './rankequipment-info'
import sysUser from '../sys/user'
export default {
  mixins: [mixinViewModule, sysUser],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/demo/rankequipment/page',
        getDataListIsPage: true,
        exportURL: '/demo/rankequipment/export',
        deleteURL: '/demo/rankequipment',
        deleteIsBatch: true
      },
      dataForm: {
        deptId: ''
      }
    }
  },
  components: {
    AddOrUpdate,
    Info
  },
  methods: {
    headerStyle () {
      return {
        'font-size': '14px',
        height: '20px',
        padding: '0'
      }
    },
    cellStyle () {
      return {
        'font-size': '14px',
        height: '35px',
        padding: '0'
      }
    }
  }
}
</script>
