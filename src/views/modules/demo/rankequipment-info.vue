<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" ref="dataForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构:" style="width: 320px" label-width="84px">
            <span>{{ dataForm.deptName }}</span>
          </el-form-item>
          <el-form-item label="手持移动端配置数:" label-width="140px">
            <span>{{ dataForm.handMobileNumber }}</span>
          </el-form-item>
          <el-form-item label="笔记本电脑配置数:" label-width="140px">
            <span>{{ dataForm.laptopNumber }}</span>
          </el-form-item>
          <el-form-item label="便携式扫描打印机配置数:" label-width="182px">
            <span>{{ dataForm.portablePrinterNumber }}</span>
          </el-form-item>
          <el-form-item label="便携式WiFi热点配置数:" label-width="168px">
            <span>{{ dataForm.portableWifiNumber }}</span>
          </el-form-item>
          <el-form-item label="创建人:" label-width="70px">
            <span>{{ dataForm.creatorName }}</span>
          </el-form-item>
          <el-form-item label="修改人:" label-width="70px">
            <span>{{ dataForm.updaterName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级机构:" style="width: 320px" label-width="80px">
            <span>{{ dataForm.preDeptName }}</span>
          </el-form-item>
          <el-form-item label="手持移动端配置时间:" label-width="150px">
            <span>{{ dataForm.handMobileDate }}</span>
          </el-form-item>
          <el-form-item label="笔记本电脑配置时间:" label-width="150px">
            <span>{{ dataForm.laptopDate }}</span>
          </el-form-item>
          <el-form-item label="便携式扫描打印机配置时间:" label-width="192px">
            <span>{{ dataForm.portablePrinterDate }}</span>
          </el-form-item>
          <el-form-item label="便携式WiFi热点配置时间:" label-width="178px">
            <span>{{ dataForm.portableWifiDate }}</span>
          </el-form-item>
          <el-form-item label="创建时间:" label-width="82px">
            <span>{{ dataForm.createDate }}</span>
          </el-form-item>
          <el-form-item label="修改时间:" label-width="82px">
            <span>{{ dataForm.updateDate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: ''
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo () {
      this.$http.get(`/demo/rankequipment/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => {})
    }
  }
}
</script>
