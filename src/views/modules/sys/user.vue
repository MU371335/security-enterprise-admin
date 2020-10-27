<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-row :gutter="20">
      <!--侧边部门数据-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div style="height: 40px; line-height: 40px; text-align: center"><h3>部门列表</h3></div>
        <el-tree
                :props="props"
                :load="loadNode"
                lazy
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <div class="mod-sys__user">
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-input v-model="dataForm.username" :placeholder="$t('user.username')" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <ren-select v-model="dataForm.gender" dict-type="gender" :placeholder="$t('user.gender')"></ren-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="$hasPermission('sys:user:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="$hasPermission('sys:user:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="$hasPermission('sys:user:export')" type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item>
          </el-form>
          <el-table
                  v-loading="dataListLoading"
                  :data="dataList"
                  border
                  @selection-change="dataListSelectionChangeHandle"
                  @sort-change="dataListSortChangeHandle"
                  style="width: 100%;"
                  :header-cell-style="headerStyle"
                  :cell-style="cellStyle">
            <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
            <el-table-column prop="realName" :label="$t('user.username')" sortable="custom" header-align="center" align="center"></el-table-column>
            <el-table-column prop="deptName" :label="$t('user.deptName')" header-align="center" align="center"></el-table-column>
            <el-table-column prop="email" :label="$t('user.email')" header-align="center" align="center"></el-table-column>
            <el-table-column prop="mobile" :label="$t('user.mobile')" sortable="custom" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gender" :label="$t('user.gender')" sortable="custom" header-align="center" align="center">
              <template slot-scope="scope">
                {{ $getDictLabel("gender", scope.row.gender) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('user.status')" sortable="custom" header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{ $t('user.status0') }}</el-tag>
                <el-tag v-else size="small" type="success">{{ $t('user.status1') }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" :label="$t('user.createDate')" sortable="custom" header-align="center" align="center" width="180"></el-table-column>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
              <template slot-scope="scope">
                <el-button v-if="$hasPermission('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                <el-button v-if="$hasPermission('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './user-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/user/page',
        getDataListIsPage: true,
        deleteURL: '/sys/user',
        deleteIsBatch: true,
        exportURL: '/sys/user/export'
      },
      dataForm: {
        username: '',
        deptId: '',
        gender: ''
      },
      props: {
        label: 'name',
        isLeaf: 'leaf'
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
    },
    handleNodeClick (data) {
      this.dataForm.deptId = data.id
      this.getDataList()
    },
    isNull (val) {
      return !val ? '/ ' : '/' + val.id
    },
    getNodeList (node, resolve) {
      this.$http.get('/sys/dept/list/' + node.level + this.isNull(node.data)).then(({ data: res }) => {
        if (res.code !== 0) {
          resolve([])
          return this.$message.error(res.msg)
        }
        if (node.level === 2) {
          const arr = res.data.map(function (item, index) {
            item['leaf'] = true
            return item
          })
          resolve(arr)
        } else resolve(res.data)
      }).catch(() => {
        resolve([])
      })
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.getNodeList(node, resolve)
        return
      }
      setTimeout(() => {
        this.getNodeList(node, resolve)
      }, 200)
    }
  }
}
</script>
