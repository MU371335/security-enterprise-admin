<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '180px'">
      <div v-if="!dataForm.id">
        <el-form-item label="所属机构" prop="deptId" style="width: 340px" label-width="84px">
          <ren-dept-tree v-model="dataForm.deptId" :placeholder="$t('dept.title')" :query="true"></ren-dept-tree>
        </el-form-item>
      </div>
      <div v-if="dataForm.id">
        <el-form-item label="所属机构" prop="deptName" style="width: 320px" label-width="84px">
          <el-input v-model="dataForm.deptName" placeholder="选择部门" readonly></el-input>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手持移动端配置数" prop="handMobileNumber" label-width="140px">
            <el-input v-model="dataForm.handMobileNumber" placeholder="请输入正整数" maxlength="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配置时间" prop="handMobileDate" label-width="100px">
            <el-date-picker v-model="dataForm.handMobileDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="笔记本电脑配置数" prop="laptopNumber" label-width="140px">
            <el-input v-model="dataForm.laptopNumber" placeholder="请输入正整数" maxlength="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配置时间" prop="laptopDate" label-width="100px">
            <el-date-picker v-model="dataForm.laptopDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="便携式扫描打印机配置数" prop="portablePrinterNumber" label-width="182px">
            <el-input v-model="dataForm.portablePrinterNumber" placeholder="请输入正整数" maxlength="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配置时间" prop="portablePrinterDate" label-width="100px">
            <el-date-picker v-model="dataForm.portablePrinterDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="便携式WiFi热点配置数" prop="portableWifiNumber" label-width="168px">
            <el-input v-model="dataForm.portableWifiNumber" placeholder="请输入正整数" maxlength="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配置时间" prop="portableWifiDate" label-width="100px">
            <el-date-picker v-model="dataForm.portableWifiDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
import { isInteger } from '@/utils/validate'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        deptId: '',
        handMobileNumber: '',
        handMobileDate: '',
        laptopNumber: '',
        laptopDate: '',
        portablePrinterNumber: '',
        portablePrinterDate: '',
        portableWifiNumber: '',
        portableWifiDate: '',
        isDeleted: '0'
      }
    }
  },
  computed: {
    dataRule () {
      var validateInteger = (rule, value, callback) => {
        if (value && !isInteger(value)) {
          return callback(new Error('请输入正整数'))
        }
        if (!value) {
          return callback(new Error('必填项不能为空'))
        }
        callback()
      }
      return {
        deptId: [
          { required: true, message: this.$t('validate.required') }
        ],
        handMobileNumber: [
          { required: true, validator: validateInteger, trigger: 'blur' }
        ],
        handMobileDate: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        laptopNumber: [
          { required: true, validator: validateInteger, trigger: 'blur' }
        ],
        laptopDate: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        portablePrinterNumber: [
          { required: true, validator: validateInteger, trigger: 'blur' }
        ],
        portablePrinterDate: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        portableWifiNumber: [
          { required: true, validator: validateInteger, trigger: 'blur' }
        ],
        portableWifiDate: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
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
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        console.log(this.dataForm)
        this.$http[!this.dataForm.id ? 'post' : 'put']('/demo/rankequipment/', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>
