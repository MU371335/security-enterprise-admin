<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
      <el-form-item prop="taskName" label="任务名称">
        <el-input v-model="dataForm.taskName" placeholder="任务名称"></el-input>
      </el-form-item>
      <el-form-item prop="taskType" label="任务类型">
        <el-select v-model="dataForm.taskType" placeholder="任务类型" clearable>
          <el-option label="月度计划" value="月度计划"></el-option>
          <el-option label="季度计划" value="季度计划"></el-option>
          <el-option label="半年计划" value="半年计划"></el-option>
          <el-option label="全年计划" value="全年计划"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="personNum" label="人员数量">
        <el-input v-model="dataForm.personNum" placeholder="请输入整数"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        uuid: '',
        createDate: '',
        creator: '',
        updateDate: '',
        updater: '',
        isDeleted: '',
        taskName: '',
        taskType: '',
        startTime: '',
        endTime: '',
        personNum: '',
        maker: ''
      }
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
        personNum: [
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
      this.$http.get(`/demo/suptaskplan/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/demo/suptaskplan', this.dataForm).then(({ data: res }) => {
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
