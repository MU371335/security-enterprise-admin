<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <div style="height: 62vh">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="realName" :label="$t('user.realName')">
              <el-input v-model="dataForm.realName" :placeholder="$t('user.realName')"></el-input>
            </el-form-item>
            <el-form-item prop="deptName" :label="$t('user.deptName')" >
              <ren-dept-tree v-model="dataForm.deptId" :placeholder="$t('dept.title')" :dept-name.sync="dataForm.deptName"></ren-dept-tree>
            </el-form-item>
            <el-form-item prop="username" :label="$t('user.username')">
              <el-input v-model="dataForm.username" :placeholder="$t('user.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password" :label="$t('user.password')" :class="{ 'is-required': !dataForm.id }">
              <el-input v-model="dataForm.password" type="password" :placeholder="$t('user.password')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="status" :label="$t('user.status')">
              <el-radio-group v-model="dataForm.status">
                <el-radio :label="0">{{ $t('user.status0') }}</el-radio>
                <el-radio :label="1">{{ $t('user.status1') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="roleIdList" :label="$t('user.roleIdList')" class="role-list">
              <el-select v-model="dataForm.roleIdList" multiple :placeholder="$t('user.roleIdList')">
                <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="job" :label="$t('user.job')">
              <el-select v-model="dataForm.job" :placeholder="$t('user.job')">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="jobLevel" :label="$t('user.jobLevel')">
              <el-select v-model="dataForm.jobLevel" :placeholder="$t('user.jobLevel')">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="gender" :label="$t('user.gender')">
                  <ren-radio-group v-model="dataForm.gender" dict-type="gender"></ren-radio-group>
                </el-form-item>
                <el-form-item prop="nativePlace" label="籍贯">
                  <el-input v-model="dataForm.nativePlace" placeholder="籍贯"></el-input>
                </el-form-item>
                <el-form-item prop="cardNo" label="身份证号码">
                  <el-input v-model="dataForm.cardNo" placeholder="身份证号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="birthday" label="出生年月">
                  <el-date-picker
                          v-model="dataForm.birthday"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="nation" label="民族">
                  <el-input v-model="dataForm.nation" placeholder="民族"></el-input>
                </el-form-item>
                <el-form-item prop="source" label="来源">
                  <el-input v-model="dataForm.source" placeholder="来源"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="联系信息" name="second">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="office" label="办公室">
                  <el-input v-model="dataForm.office" placeholder="办公室"></el-input>
                </el-form-item>
                <el-form-item prop="workPhone" label="办公电话">
                  <el-input v-model="dataForm.workPhone" placeholder="办公电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="email" :label="$t('user.email')">
                  <el-input v-model="dataForm.email" :placeholder="$t('user.email')"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" :label="$t('user.mobile')">
                  <el-input v-model="dataForm.mobile" :placeholder="$t('user.mobile')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="职务信息" name="third">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="administrationCardNo" label="行政执法证号">
                  <el-input v-model="dataForm.administrationCardNo" placeholder="行政执法证号"></el-input>
                </el-form-item>
                <el-form-item prop="userType" label="人员类别">
                  <el-input v-model="dataForm.userType" placeholder="人员类别"></el-input>
                </el-form-item>
                <el-form-item prop="startWork" label="开始工作时间">
                  <el-date-picker
                          v-model="dataForm.startWork"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="superviseCardNo" label="监察执法证号">
                  <el-input v-model="dataForm.superviseCardNo" placeholder="监察执法证号"></el-input>
                </el-form-item>
                <el-form-item prop="officeInfo" label="岗位情况">
                  <el-input v-model="dataForm.officeInfo" placeholder="岗位情况"></el-input>
                </el-form-item>
                <el-form-item prop="endWork" label="结束工作时间">
                  <el-date-picker
                          v-model="dataForm.endWork"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="教育信息" name="fourth">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="education" label="最高学历">
                  <el-select v-model="dataForm.education" placeholder="最高学历">
                    <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="考核情况" name="fifth">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="checkYear" label="考核年份">
                  <el-input v-model="dataForm.checkYear" placeholder="考核年份"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="checkInfo" label="考核情况">
                  <el-input v-model="dataForm.checkInfo" placeholder="考核情况"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
import { isEmail, isMobile } from '@/utils/validate'
export default {
  data () {
    return {
      visible: false,
      roleList: [],
      roleIdListDefault: [],
      dataForm: {
        id: '',
        username: '',
        password: '',
        realName: '',
        status: 1,
        job: '',
        jobStart: '',
        jobLevel: '',
        levelStart: '',
        deptId: '',
        sort: '',
        remarks: '',
        deptName: '',
        userId: '',
        mobile: '',
        office: '',
        workPhone: '',
        email: '',
        roleIdList: [],
        superviseCardNo: '',
        administrationCardNo: '',
        userType: '',
        workGrade: '',
        officeInfo: '',
        gender: 2,
        nation: '',
        source: '',
        nativePlace: '',
        birthday: '',
        startWork: '',
        endWork: '',
        education: '',
        checkYear: '',
        checkInfo: '',
        cardNo: ''
      },
      options: [{
        value: '4',
        label: '局长'
      }, {
        value: '3',
        label: '科长'
      }, {
        value: '2',
        label: '主任'
      }, {
        value: '1',
        label: '队长'
      }, {
        value: '0',
        label: '普通职员'
      }],
      value: '',
      options2: [{
        value: '2',
        label: '正职'
      }, {
        value: '1',
        label: '副职'
      }, {
        value: '0',
        label: '无'
      }],
      options3: [{
        value: '3',
        label: '博士生'
      }, {
        value: '2',
        label: '研究生'
      }, {
        value: '1',
        label: '本科'
      }, {
        value: '0',
        label: '专科'
      }],
      activeName: 'first'
    }
  },
  computed: {
    dataRule () {
      const validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      const validateEmail = (rule, value, callback) => {
        if (value && !isEmail(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.email') })))
        }
        callback()
      }
      const validateMobile = (rule, value, callback) => {
        if (value && !isMobile(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.mobile') })))
        }
        callback()
      }
      return {
        username: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.dataForm.deptId = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.roleIdListDefault = []
        Promise.all([
          this.getRoleList()
        ]).then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取角色列表
    getRoleList () {
      return this.$http.get('/sys/role/list').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.roleList = res.data
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$http.get(`/sys/user/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        console.log(res.data)
        this.dataForm = {
          ...this.dataForm,
          ...res.data,
          ...res.data.sysUserExtraDTO,
          roleIdList: []
        }
        // 角色配置, 区分是否为默认角色
        for (var i = 0; i < res.data.roleIdList.length; i++) {
          if (this.roleList.filter(item => item.id === res.data.roleIdList[i])[0]) {
            this.dataForm.roleIdList.push(res.data.roleIdList[i])
            continue
          }
          this.roleIdListDefault.push(res.data.roleIdList[i])
        }
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/sys/user', {
          ...this.dataForm,
          roleIdList: [
            ...this.dataForm.roleIdList,
            ...this.roleIdListDefault
          ]
        }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        ).then(({ data: res }) => {
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

<style lang="scss">
.mod-sys__user {
  .role-list {
    .el-select {
      width: 100%;
    }
  }
}
</style>
