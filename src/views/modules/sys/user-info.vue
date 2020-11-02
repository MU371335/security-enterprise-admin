<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <div style="height: 52vh">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="100px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户信息" name="first">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="realName" label="真实姓名:">
                  <span>{{ dataForm.realName }}</span>
                </el-form-item>
                <el-form-item prop="deptId" label="所属部门:">
                  <span>{{ dataForm.deptName }}</span>
                </el-form-item>
                <el-form-item prop="username" label="用户名:">
                  <span>{{ dataForm.username }}</span>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号:">
                  <span>{{ dataForm.mobile }}</span>
                </el-form-item>
                <el-form-item prop="email" label="邮箱:">
                  <span>{{ dataForm.email }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="roleIdList" :label="$t('user.roleIdList')" class="role-list">
                  <el-select v-model="dataForm.roleIdList" multiple :placeholder="$t('user.roleIdList')">
                    <el-option v-for="role in roleList" :disabled="true" :key="role.id" :label="role.name" :value="role.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="status" :label="$t('user.status')">
                  <el-radio-group v-model="dataForm.status" :disabled="true">
                    <el-radio :label="0">{{ $t('user.status0') }}</el-radio>
                    <el-radio :label="1">{{ $t('user.status1') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="gender" :label="$t('user.gender')">
                  <el-radio-group v-model="dataForm.gender" :disabled="true">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="2">保密</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="job" :label="$t('user.job')">
                  <el-select v-model="dataForm.job" :placeholder="$t('user.job')">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="true">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="jobLevel" :label="$t('user.jobLevel')">
                  <el-select v-model="dataForm.jobLevel" :placeholder="$t('user.jobLevel')">
                    <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="true">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="基本信息" name="second">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="office" label="办公室:">
                  <span>{{ dataForm.office }}</span>
                </el-form-item>
                <el-form-item prop="source" label="来源:">
                  <span>{{ dataForm.source }}</span>
                </el-form-item>
                <el-form-item prop="nation" label="民族:">
                  <span>{{ dataForm.nation }}</span>
                </el-form-item>
                <el-form-item prop="nativePlace" label="籍贯:">
                  <span>{{ dataForm.nativePlace }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="workPhone" label="办公电话:">
                  <span>{{ dataForm.workPhone }}</span>
                </el-form-item>
                <el-form-item prop="cardNo" label="身份证号码:">
                  <span>{{ dataForm.cardNo }}</span>
                </el-form-item>
                <el-form-item prop="birthday" label="出生年月:">
                  <span>{{ dataForm.birthday }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="工作信息" name="third">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="administrationCardNo" label="行政执法证号:">
                  <span>{{ dataForm.administrationCardNo }}</span>
                </el-form-item>
                <el-form-item prop="startWork" label="开始工作时间:">
                  <span>{{ dataForm.startWork }}</span>
                </el-form-item>
                <el-form-item prop="endWork" label="结束工作时间:">
                  <span>{{ dataForm.endWork }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="superviseCardNo" label="监察执法证号:">
                  <span>{{ dataForm.superviseCardNo }}</span>
                </el-form-item>
                <el-form-item prop="officeInfo" label="岗位情况:">
                  <span>{{ dataForm.officeInfo }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="fourth">
            <el-form-item prop="education" label="最高学历">
              <el-select v-model="dataForm.education" placeholder="最高学历">
                <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="true">
                </el-option>
              </el-select>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="checkYear" label="考核年份:">
                  <span>{{ dataForm.checkYear }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="checkInfo" label="考核情况:">
                  <span>{{ dataForm.checkInfo }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="remarks" label="备注信息:">
              <span>{{ dataForm.remarks }}</span>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
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
      roleList: [],
      roleIdListDefault: [],
      dataForm: {
        id: '',
        deptName: '',
        roleIdList: [],
        username: '',
        password: '',
        realName: '',
        gender: 2,
        email: '',
        mobile: '',
        deptId: '',
        status: 1,
        job: '',
        jobLevel: '',
        userId: '',
        office: '',
        workPhone: '',
        superviseCardNo: '',
        administrationCardNo: '',
        userType: '',
        workGrade: '',
        officeInfo: '',
        nation: '',
        source: '',
        nativePlace: '',
        birthday: '',
        startWork: '',
        endWork: '',
        education: '',
        checkYear: '',
        checkInfo: '',
        cardNo: '',
        remarks: ''
      },
      value: '',
      options: [{
        value: '3',
        label: '局长'
      }, {
        value: '2',
        label: '科长'
      }, {
        value: '1',
        label: '队长'
      }, {
        value: '0',
        label: '普通职员'
      }],
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
        this.dataForm = {
          ...this.dataForm,
          ...res.data.sysUserExtraDTO,
          ...res.data,
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
    }
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
