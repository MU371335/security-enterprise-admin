<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__taskplans">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="getDataList()">
        <div style="height: 30px; line-height: 30px; color: #fff; background-color: #0bb2d4; margin-bottom: 20px; padding-left: 20px">表单信息</div>
        <el-form-item prop="taskName">
          <el-input v-model="dataForm.taskName" placeholder="任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item prop="taskType">
          <el-select v-model="dataForm.taskType" placeholder="任务类型" clearable>
            <el-option label="月度计划1" value="月度计划"></el-option>
            <el-option label="季度计划" value="季度计划"></el-option>
            <el-option label="半年计划" value="半年计划"></el-option>
            <el-option label="全年计划" value="全年计划"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="startTime">
          <el-date-picker
                  v-model="daterange"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  :range-separator="$t('datePicker.range')"
                  :start-placeholder="$t('datePicker.start')"
                  :end-placeholder="$t('datePicker.end')">
          </el-date-picker>
        </el-form-item>
        <div style="height: 30px; line-height: 30px; color: #fff; background-color: #0bb2d4; margin-bottom: 20px; padding-left: 20px">企业</div>
        <el-form-item prop="enterpriseName">
          <el-input v-model="dataForm.enterpriseName" placeholder="企业名称" clearable></el-input>
        </el-form-item>
        <el-form-item prop="province">
          <el-input v-model="dataForm.province" placeholder="省份" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="queryByParam()">{{ $t('query') }}</el-button>
        </el-form-item>
        <span style="display: inline-block; width: 100px; height: 30px; margin-left: 500px"></span>
        <el-form-item>
          <el-button @click.native="tabRemoveHandle($store.state.contentTabsActiveName)">取消</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('demo:supenterprise:save')" type="primary" @click="dataFormSubmitHandle()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="superviseType" label="监管类别" header-align="center" align="center"></el-table-column>
        <el-table-column prop="province" label="地址" header-align="center" align="center"></el-table-column>
        <el-table-column prop="linkMan" label="联系人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="linkWay" label="联系电话" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('demo:supenterprise:update')" type="text" size="small">查看</el-button>
            <el-button v-if="$hasPermission('demo:supenterprise:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import debounce from 'lodash/debounce'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: 'demo/supenterprise/page',
        getDataListIsPage: true,
        getDataListByParamUrl: '/demo/supenterprise',
        getDataListByParamIsPage: true,
        deleteURL: '/demo/supenterprise',
        deleteIsBatch: true
      },
      daterange: null,
      dataForm: {
        taskName: '',
        taskType: '',
        enterpriseName: '',
        province: '',
        startTime: '',
        endTime: '',
        id: ''
      }
    }
  },
  watch: {
    daterange (val) {
      this.dataForm.startTime = val[0]
      this.dataForm.endTime = val[1]
    }
  },
  computed: {
    dataRule () {
      return {
        taskName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 多选
    dataListSelectionChangeHandle (val) {
      this.$data.dataForm.id = JSON.stringify(val.map(item => item['id']))
    },
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
    },
    closeTab () {
      this.tabRemoveHandle(this.$store.state.contentTabsActiveName)
    },
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http['post'](
          '/demo/suptaskplan',
          this.$data.dataForm,
          { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        ).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.closeTab()
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {
        })
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>
