<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__suptaskplan">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.taskName" placeholder="检查对象名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
                  v-model="dataForm.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="检查日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataListByParam()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('demo:suptaskplan:save')" type="primary" @click="gotoAddTaskPlan()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('demo:suptaskplan:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="taskName" label="任务名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="taskType" label="任务类型" header-align="center" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="personNum" label="人员数量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="maker" label="制定人" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEnterprise(scope.row.id)">查看企业</el-button>
            <el-button v-if="$hasPermission('demo:suptaskplan:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
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
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './suptaskplan-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/demo/suptaskplan/page',
        getDataListIsPage: true,
        getDataListByParamUrl: '/demo/suptaskplan',
        getDataListByParamIsPage: true,
        deleteURL: '/demo/suptaskplan',
        deleteIsBatch: true
      },
      dataForm: {
        taskName: '',
        startTime: ''
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    gotoAddTaskPlan () {
      this.$router.push({ name: 'addTaskPlan' })
    },
    gotoEnterprise (taskId) {
      this.$router.push({ name: 'taskPlanEnterprise', params: { taskId: taskId } })
    }
  }
}
</script>
