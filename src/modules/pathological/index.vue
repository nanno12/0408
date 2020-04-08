<template>
  <div id="pathological" v-loading="loading.addPafLoading">
      <header class="patinfo-header">
        <w-select id="examTypeSelect" v-model="templateId" placeholder="请选择" @change="changeExamType">
          <w-option
            v-for="item in examTypes"
            :key="item.id"
            :label="item.templateName"
            :value="item.id">
          </w-option>
        </w-select>
        <span>
          <w-iconx style="width:28px;height:28px;" :name="avatar"/>
        </span>
        <span style="font-weight:600">{{ patInfo.patName }}</span>
        <span style="font-weight:600">{{ patInfo.bedNo }}床</span>
        <span>{{ patInfo.genderCode }}</span>
        <span>{{ patInfo.age }}岁</span>
        <span>{{ patInfo.medicalInsuranceName }}</span>
        <span>体重：53.5kg</span>
        <span>住院号：{{ patInfo.hospNo }}</span>
        <span>身份证号：{{ patInfo.idnum }}</span>
        <span>民族：汉族</span>
      </header>

      <div class="main-container">
        <main class="main-panel">
          <main class="main-info">
            <section class="info-section" ref="doctorAdvice" v-if="visiable.templateVisiable"> <!-- 医嘱信息 -->
              <TitleLabel name="医嘱信息"/>
              <div class="row-content">
                <template v-for="(item, index) in pafTemplateitems">
                  <w-button class="tag" plain type="primary"
                    v-if="item.pafTemplateId == templateId"
                    @click="checkPafTemp(index)"
                    :key="index"
                    :icon="checkedPafTempList[index] ? 'w-icon-success' : ''"
                    :class="checkedPafTempList[index] ? 'checked' : 'unchecked'"
                  >{{ item.itemName }} ￥{{ item.chargeItemPrice }}</w-button>
                </template>
              </div>
            </section>

            <section class="info-section" ref="clinicalInfo" v-if="visiable.clinicalInfoVisiable"> <!-- 临床信息 -->
              <TitleLabel name="临床信息"/>
              <div class="row-content">
                <w-form label-align="right" label-width="130px">
                  <w-form-item label="临床所见及诊断">
                    <w-input v-model="patUserClinicalInfo.clinicalDiag"/>
                  </w-form-item>
                  <w-form-item label="病史摘要及其他病例信息" class="textarea-form-item">
                    <w-input type="textarea" :rows="6" v-model="patUserClinicalInfo.medicalHistory"/>
                  </w-form-item>
                </w-form>
              </div>
            </section>

            <section class="info-section" ref="specimenInfo" v-if="visiable.specimenInfoVisiable"> <!-- 标本信息 -->
              <TitleLabel name="标本信息">
                <div id="fixationFluidForm" slot="right">
                  <div v-if="visiable.fixationFluidVisiable">
                    <span style="white-space:nowrap;">固定液</span>
                    <w-select size="small" v-model="fixationFluid">
                      <w-option
                        v-for="item in initData['固定液']"
                        :key="item.SLAVENO"
                        :label="item.SLAVENAME"
                        :value="item.SLAVENO">
                      </w-option>
                    </w-select>
                  </div>
                  <w-button style="padding:6px 10px" @click="printSpecimen('all')">打印全部标本</w-button>
                </div>
              </TitleLabel>
              <div class="row-content">
                <!-- 标本信息行 -->
                <w-row :gutter="6"
                  style="margin-bottom:16px"
                  v-for="(item, index) in specimenInfos"
                  :key="index">
                  <w-col :span="3">
                    <w-input disabled v-model="item.specimenLabelCode" placeholder="标本条码"/>
                  </w-col>
                  <w-col :span="3"> <!-- 标本部位 -->
                    <w-cascader :ref="'specimen'+index"
                      clearable
                      placeholder="标本部位"
                      v-model="item.specimenData"
                      :options="specimenData"
                      :show-all-levels="false"
                      @change="value => changeSpecimen(value, index)"
                      :props="{
                        label: 'SPECIMEN_NAME',
                        value: 'ID',
                        children: 'children'
                      }"/>
                  </w-col>
                  <w-col :span="3"> <!-- 标本名称 -->
                    <w-cascader
                      placeholder="标本名称"
                      v-model="item.specimenData"
                      :options="specimenData"
                      :show-all-levels="false"
                      @change="value => changeSpecimen(value, index)"
                      :props="{
                        label: 'SPECIMEN_NAME',
                        value: 'ID',
                        children: 'children'
                      }"/>
                  </w-col>
                  <w-col :span="2"> <!-- 采集数量 -->
                    <w-input-number
                      v-model="item.specimenQty"
                      class="is-controls-right"
                      :min="1"
                      :max="10"/>
                  </w-col>
                  <w-col :span="3"> <!-- 采集方式 -->
                    <w-select placeholder="采集方式" v-model="item.specimenCollectMode">
                      <w-option
                        v-for="item in initData['采集方式']"
                        :key="item.SLAVENO"
                        :label="item.SLAVENAME"
                        :value="item.SLAVENO">
                      </w-option>
                    </w-select>
                  </w-col>
                  <w-col :span="3"> <!-- 采集人 -->
                    <w-select placeholder="采集人" v-model="item.gatherBy">
                      <w-option
                        v-for="item in gatherers"
                        :key="item.USERCODE"
                        :label="item.USERNAME"
                        :value="item.USERCODE">
                      </w-option>
                    </w-select>
                  </w-col>
                  <w-col :span="4"> <!-- 采集日期 -->
                    <w-date-picker
                      v-model="item.gatherAt"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options	="pickerOptions"
                      placeholder="选择日期">
                    </w-date-picker>
                  </w-col>
                  <w-col :span="3"> <!-- 操作按钮组 -->
                    <div class="icon-group">
                      <w-tooltip theme="dark" width="60px" content="复制" placement="top">
                        <w-iconx name="iconfuzhi" @click.native="copySpecimen(index)" slot="reference"></w-iconx>
                      </w-tooltip>
                      <w-tooltip theme="dark" width="60px" content="删除" placement="top">
                        <w-iconx name="iconshanchu" @click.native="removeSpecimen(index)" slot="reference"></w-iconx>
                      </w-tooltip>
                      <w-tooltip theme="dark" width="60px" content="打印" placement="top">
                        <w-iconx name="icondayin" @click.native="printSpecimen(index)" slot="reference"></w-iconx>
                      </w-tooltip>
                    </div>
                  </w-col>
                </w-row>
                <w-row> <!-- 新增按钮 -->
                  <span id="addSpecimen" @click="addSpecimen">
                    <span class="el-icon-plus"></span>
                    <span>新增</span>
                  </span>
                </w-row>
              </div>
            </section>

            <section class="info-section" ref="endoscopeInfo" v-if="visiable.endoscopeInfoVisiable"> <!-- 内镜信息 -->
              <TitleLabel name="内镜信息"/>
              <div class="row-content">
                <w-form label-align="right" label-width="130px">
                  <w-form-item required label="内窥镜检查所见及结论" class="textarea-form-item">
                    <w-input
                      placeholder="请输入内容"
                      type="textarea"
                      v-model="patUserEndoscopeInfo.ENDOSCOPY_DIAGNOSIS"
                      :rows="6"/>
                  </w-form-item>
                  <w-form-item required label="感染信息" class="checkbox-group-form-item">
                    <w-checkbox-group v-model="patUserEndoscopeInfo.checkList">
                      <w-checkbox label="无"/>
                      <w-checkbox label="结核"/>
                      <w-checkbox label="梅毒"/>
                      <w-checkbox label="艾滋病"/>
                      <w-checkbox label="乙肝"/>
                      <w-checkbox label="丙肝"/>
                      <w-checkbox label="其他"/>
                    </w-checkbox-group>
                    <w-input v-model="patUserEndoscopeInfo.otherTuberculosis" v-if="enableOther1" style="width:calc(100% - 551px);margin-left:9px"/>
                  </w-form-item>
                </w-form>
              </div>
            </section>

            <section class="info-section" ref="operInfo" v-if="visiable.operInfoVisiable"> <!-- 手术信息 -->
              <TitleLabel name="手术信息"/>
              <div class="row-content">
                <w-form label-align="right" label-width="130px">
                  <w-form-item required label="手术所见" class="textarea-form-item">
                    <w-input
                      placeholder="请输入内容"
                      type="textarea"
                      v-model="operInfo.operFindings"
                      :rows="6"/>
                  </w-form-item>
                  <w-form-item required label="感染信息" class="checkbox-group-form-item">
                    <w-checkbox-group v-model="operInfo.checkList">
                      <w-checkbox label="无"/>
                      <w-checkbox label="结核"/>
                      <w-checkbox label="梅毒"/>
                      <w-checkbox label="艾滋病"/>
                      <w-checkbox label="乙肝"/>
                      <w-checkbox label="丙肝"/>
                      <w-checkbox label="其他"/>
                    </w-checkbox-group>
                    <w-input v-model="operInfo.otherTuberculosis" v-if="enableOther2" style="width:calc(100% - 551px);margin-left:9px"/>
                  </w-form-item>
                </w-form>
              </div>
            </section>
          </main>
          <aside class="patinfo-aside">
            <w-tabs size="small" :value="tabValue">
              <w-tab-pane label="妇科信息" name="1" v-if="visiable.gynecologicalInfoVisiable">
                <GynecologicalInfo ref="gynecologicalInfo"
                  :menstrualCyclesOptions="initData['月经周期']"
                  :menstrualBloodVolumeOptions="initData['经血量']"
                  :urineOrBloodOptions="initData['小便血']"
                  :reproductiveHistoryOptions="initData['妊娠史']"/>
              </w-tab-pane>

              <w-tab-pane label="肿瘤信息" name="2" v-if="visiable.tumorInfoVisiable">
                <TumorInfo ref="tumorInfo"
                  :sizeList="initData['肿瘤大小']"
                  :positionList="initData['肿瘤部位']"
                  :shapeList="initData['肿瘤形状']"
                  :materialQualityList="initData['肿瘤质地']"
                  :growSpeedList="initData['肿瘤生长速度']"
                  />
              </w-tab-pane>

              <w-tab-pane label="细胞学/HPV" name="4" v-if="visiable.cytologyAndHPVVisiable">
                <CytologyAndHPV ref="cah"/>
              </w-tab-pane>

              <w-tab-pane label="既往病理检查" name="3" v-if="visiable.pathExamVisiable">
                <PathologicalExam ref="pathExam"
                  :pathList="pathList"
                  @removeExam="removeExam"
                  @addExam="visiable.addExamVisiable=true"/>
                <w-modal title="添加" :visible.sync="visiable.addExamVisiable">
                  <w-form label-width="82px" label-align="right">
                    <w-row :gutter="40">
                      <w-col :span="12">
                        <w-form-item label="病理号">
                          <w-input v-model="pathAddForm.inspectNo" placeholder="请输入内容"/>
                        </w-form-item>
                      </w-col>
                      <w-col :span="12">
                        <w-form-item label="检查机构">
                          <w-input v-model="pathAddForm.HOSPITAL_CODE" placeholder="请输入内容"/>
                        </w-form-item>
                      </w-col>
                    </w-row>
                    <w-row :gutter="40">
                      <w-col :span="12">
                        <w-form-item label="检查日期">
                          <w-date-picker
                            v-model="pathAddForm.CHECK_DATE"
                            type="date"
                            :picker-options	="pickerOptions"
                            placeholder="选择日期">
                          </w-date-picker>
                        </w-form-item>
                      </w-col>
                    </w-row>
                    <w-row>
                      <w-col :span="24">
                        <w-form-item label="病理诊断">
                          <w-input type="textarea" :rows="6" v-model="pathAddForm.PATHOLOGIC_DIAGNOSIS" placeholder="请输入内容"/>
                        </w-form-item>
                      </w-col>
                    </w-row>
                  </w-form>

                  <template slot="footer">
                    <div class="bottom">
                      <w-button @click="visiable.addExamVisiable=false">取 消</w-button>
                      <w-button type="primary" @click="addExam">保 存</w-button>
                    </div>
                  </template>
                </w-modal>
              </w-tab-pane>

            </w-tabs>
              
          </aside>
        </main>
        <footer class="operation-footer">
          <div class="bottom-left">
            <span>
              已选医嘱:
              <span style="color:red">{{ checkedPafCount }}</span>
            </span>
            <span>
              总费用:
              <span style="color:red">￥{{ totalCost.toFixed(2) }}</span>
            </span>
            <span>
              已绑定标本:
              <span style="color:red">{{ specimenCount }}</span>
            </span>
            <span>
              已打印条码:
              <span style="color:red">{{ printCount }}</span>
            </span>
          </div>
          <div class="bottom">
            <w-button>取消</w-button>
            <w-button @click="savePafListInfo">保存</w-button>
            <w-button type="primary" @click="sendPafListInfo">打印并发送</w-button>
          </div>
        </footer>
      </div>
  </div>
</template>

<script>
import GynecologicalInfo from './components/gynecologicalInfo'
import TumorInfo from './components/tumorInfo'
import PathologicalExam from './components/pathologicalExam'
import TitleLabel from './components/titleLabel'
import CytologyAndHPV from './components/cytologyAndHpv'
import DataHandle from '@/app/utils/dataHandle'
import API from './api'
import util from './util'

const today = new Date()
const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
const infectionInfoListMapping = function (data, list) {
  if (data.isInfectionInfor === '1')   list.push('无')
  if (data.isTuberculosis === '1')     list.push('结合')
  if (data.isSyphilis === '1')         list.push('梅毒')
  if (data.isAids === '1')             list.push('艾滋病')
  if (data.isHepatitisb === '1')       list.push('乙肝')
  if (data.isHCV === '1')              list.push('丙肝')
  if (data.otherTuberculosis === '1')  list.push('其他')
}

const validateSpecimen = function (item) {
  let errors = []
  if (item.specimenData.length !== 3) errors.push('标本部位')
  if (item.specimenData.length !== 3) errors.push('标本名称')
  if (item.specimenQty < 1)           errors.push('标本数量')
  if (!item.gatherBy)                 errors.push('采集人')
  if (!item.gatherAt)                 errors.push('采集时间')
  return errors
}

export default {
  components: {
    GynecologicalInfo,
    TumorInfo,
    PathologicalExam,
    TitleLabel,
    CytologyAndHPV
  },
  data () {
    return {
      tabValue: '1', // 当前标签页的位置
      hospitalCode: '1', // 医院编码
      pafListId: '', // 申请单ID，如果为空则表示开单；反之则为更新

      loading: { // 加载状态
        addPafLoading: false
      },

      initData: {}, // 数据字典

      specimenData: [],

      fixationFluid: 0, // 所选中的固定液

      gatherers: [], // 采集人列表

      templateId: null,
      examTypes: [],

      visiable: {
        templateVisiable: false,
        clinicalInfoVisiable: false,
        specimenInfoVisiable: false,
        operInfoVisiable: false,
        endoscopeInfoVisiable: false,
        
        gynecologicalInfoVisiable: false,
        tumorInfoVisiable: false,
        pathExamVisiable: false,
        cytologyAndHPVVisiable: false,

        fixationFluidVisiable: false,

        addExamVisiable: false,
      },

      pafTemplateitems: [], // 医嘱信息列表
      checkedPafTempList: [], // 医嘱已选择列表，长度与医嘱信息列表一致，未选择的元素则用undefined填充
      checkedPafCount: 0, // 已选医嘱计数
      printCount: 0, // 打印计数
      totalCost: 0, // 总费用

      specimenInfos: [], // 标本列表
      patInfo: {}, // 病人信息

      patUserEndoscopeInfo: { // 内镜信息
        PATHOLOGIC_DIAGNOSIS: '',
        ENDOSCOPY_DIAGNOSIS: '',
        checkList: [],
        otherTuberculosis: ''
      },

      patUserClinicalInfo: { // 临床信息
        clinicalDiag: '', // 临床诊断
        medicalHistory: '' // 病史摘要
      },

      operInfo: { // 手术信息
        operFindings: '', // 手术所见
        checkList: [], // 感染信息列表
        otherTuberculosis: ''
      },

      pathList: [], // 病理列表
      pathAddForm: {
        inspectNo: '',
        CHECK_DATE: '',
        HOSPITAL_CODE: '',
        PATHOLOGIC_DIAGNOSIS: ''
      },
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now();
        }
      },
    }
  },
  computed: {
    /**统计已绑定的标本数量 */
    specimenCount () {
      let count = 0

      this.specimenInfos.forEach(item => {
        if (!validateSpecimen(item).length) count++
      })

      return count
    },
    /**根据年龄与性别判断应使用的矢量头像 */
    avatar () {
      let age = this.patInfo.age || 0
      let gender = this.patInfo.genderCode

      if (age <= 1) {
        return 'iconyinger'
      }

      if (age <= 16) {
        return gender == '男' ? 'iconnantong' : 'iconnvtong'
      }

      if (age <= 59) {
        return gender == '男' ? 'iconnanqingnian' : 'iconnvqingnian'
      }

      return gender == '男' ? 'iconyeye' : 'iconnainai'
    },
    enableOther1 () {
      return (this.patUserEndoscopeInfo.checkList.indexOf('其他') !== -1)
    },
    enableOther2 () {
      return (this.operInfo.checkList.indexOf('其他') !== -1)
    }
  },
  watch: {
    'operInfo.checkList': (nv, ov) => util.checkListHandler(nv, ov),
    'patUserEndoscopeInfo.checkList': (nv, ov) => util.checkListHandler(nv, ov)
  },
  methods: {  
    changeExamType (no) {
      if (no == 1) { // 常规组织学检查
        this.tabValue = "1"
        this.visiable.templateVisiable          = true
        this.visiable.clinicalInfoVisiable      = true
        this.visiable.specimenInfoVisiable      = true
        this.visiable.operInfoVisiable          = false
        this.visiable.endoscopeInfoVisiable     = true
        
        this.visiable.gynecologicalInfoVisiable = true
        this.visiable.tumorInfoVisiable         = true
        this.visiable.pathExamVisiable          = true
        this.visiable.cytologyAndHPVVisiable    = false

        this.visiable.fixationFluidVisiable     = true
      }

      else if (no == 2) { // 术中冰冻组织检查
        this.tabValue = "2"
        this.visiable.templateVisiable          = true
        this.visiable.clinicalInfoVisiable      = true
        this.visiable.specimenInfoVisiable      = true
        this.visiable.operInfoVisiable          = true
        this.visiable.endoscopeInfoVisiable     = false
        
        this.visiable.gynecologicalInfoVisiable = false
        this.visiable.tumorInfoVisiable         = true
        this.visiable.pathExamVisiable          = true
        this.visiable.cytologyAndHPVVisiable    = false

        this.visiable.fixationFluidVisiable     = false
      }

      else if (no == 3) { // 妇科细胞学检查
        this.tabValue = "1"
        this.visiable.templateVisiable          = true
        this.visiable.clinicalInfoVisiable      = true
        this.visiable.specimenInfoVisiable      = true
        this.visiable.operInfoVisiable          = false
        this.visiable.endoscopeInfoVisiable     = false
        
        this.visiable.gynecologicalInfoVisiable = true
        this.visiable.tumorInfoVisiable         = false
        this.visiable.pathExamVisiable          = true
        this.visiable.cytologyAndHPVVisiable    = true

        this.visiable.fixationFluidVisiable     = true
      }

      else if (no == 4) { // 非妇科细胞学检查
        this.tabValue = "4"
        this.visiable.templateVisiable          = true
        this.visiable.clinicalInfoVisiable      = true
        this.visiable.specimenInfoVisiable      = true
        this.visiable.operInfoVisiable          = false
        this.visiable.endoscopeInfoVisiable     = false
        
        this.visiable.gynecologicalInfoVisiable = false
        this.visiable.tumorInfoVisiable         = false
        this.visiable.pathExamVisiable          = true
        this.visiable.cytologyAndHPVVisiable    = true

        this.visiable.fixationFluidVisiable     = true
      }
    },
    /**新增标本 */
    addSpecimen () {
      this.specimenInfos.push({
        seqNo: '1', // 标本序号
        specimenData: [], // 标本器官、部位、名称
        specimenQty: 1, // 数量
        specimenLabelCode: '', // 标本条码
        specimenCollectMode: '', // 采集方式
        specimenFixativeSolution: 0, // 固定液
        gatherAt: todayStr, // 采集时间
        gatherBy: '', // 采集人编码
      })
    },
    /**移除标本 */
    removeSpecimen (index) {
      let specimen = this.specimenInfos[index]
      API.deleteCheckSpecimen(specimen.id || '').then(resp => {
        DataHandle(resp).then(resp => {
          this.specimenInfos.splice(index, 1)
        })
      })
    },
    /**复制标本 */
    copySpecimen (index) {
      let specimen = this.specimenInfos[index]

      let copy = JSON.parse(JSON.stringify(specimen))
      this.specimenInfos.push(copy)
      copy.specimenLabelCode = '' // 标本条码无需复制
      let value = copy.specimenData
      let no = this.specimenInfos.length - 1

      this.$nextTick(() => {
        this.changeSpecimen(value, no)
      })
    },
    /**添加既往病理检查项 */
    addExam () {
      let errors = []
      if (!this.pathAddForm.CHECK_DATE)           errors.push('检查日期')
      if (!this.pathAddForm.HOSPITAL_CODE)        errors.push('检察机构')
      if (!this.pathAddForm.PATHOLOGIC_DIAGNOSIS) errors.push('病理诊断')

      if (errors.length) {
        this.$message({
          message: `请完善${errors.join('、')}`,
          type: 'error'
        })
        return
      }

      let param = {
        inspectNo: this.pathAddForm.inspectNo,
        CHECK_DATE: util.dateFormatter(this.pathAddForm.CHECK_DATE),
        HOSPITAL_CODE: this.pathAddForm.HOSPITAL_CODE,
        PATHOLOGIC_DIAGNOSIS: this.pathAddForm.PATHOLOGIC_DIAGNOSIS
      }

      this.pathList.push(param)

      this.pathAddForm.inspectNo = ''
      this.pathAddForm.CHECK_DATE = ''
      this.pathAddForm.HOSPITAL_CODE = ''
      this.pathAddForm.PATHOLOGIC_DIAGNOSIS = ''

      this.visiable.addExamVisiable = false
    },
    /**移除既往病理检查项 */
    removeExam (index) {
      this.pathList.splice(index, 1)
    },
    /**点击医嘱信息项按钮 */
    checkPafTemp (index) {
      let checkedPafTemp = this.checkedPafTempList[index]
      let temp = this.pafTemplateitems[index]
      if (checkedPafTemp) {
        this.checkedPafTempList[index] = undefined
        this.checkedPafCount--
        this.totalCost -= parseFloat(checkedPafTemp.chargeItemPrice)
      } else {
        this.checkedPafTempList[index] = temp
        this.checkedPafCount++
        this.totalCost += parseFloat(temp.chargeItemPrice)
      }
    },
    /**打印标本信息 */
    printSpecimen (index) {
      // 打印全部标本
      if (index === 'all') {
        this.specimenInfos.forEach(item => {
          if (item.specimenLabelCode && item.specimenData.length === 3) {
            this.printCount ++
          }
        })
      }

      // 打印指定标本信息
      else {
        let item = this.specimenInfos[index]
        let errors = validateSpecimen(item)

        if (errors.length) {
          this.$message({
            message: `完善${errors.join('、')}后才能打印`,
            type: 'error'
          })
          return
        }

        this.printCount++
      }
    },
    changeSpecimen (value, index) {
      let dom = this.$refs['specimen' + index][0].$refs.reference.getElementsByClassName('w-cascader__label')[0]
      let name = ''

      for (let i = 0, size = this.specimenData.length; i < size; i++) {
        let id = this.specimenData[i].ID
        if (id == value[0]) {
          let children = this.specimenData[i].children
          for (let j = 0, jsize = children.length; j < jsize; j++) {
            if (children[j].ID == value[1]) {
              name = children[j].SPECIMEN_NAME
              break;
            }
          }
          break;
        }
      }

      dom.innerText = name
    },
    /**收集申请单的参数，便于进行后续的保存、更新或发送操作 */
    collectTemplateParams () {
      let messages = [] // 用来收集错误提示消息

      let gynecologicalInfo = this.$refs.gynecologicalInfo
      let tumorInfo = this.$refs.tumorInfo
      let cah = this.$refs.cah
      let pathExam = this.$refs.pathExam
      let doctorAdvice = this.$refs.doctorAdvice
      let clinicalInfo = this.$refs.clinicalInfo
      let specimenInfo = this.$refs.specimenInfo
      let endoscopeInfo = this.$refs.endoscopeInfo
      let operInfo = this.$refs.operInfo


      let params = { pafList: {} }

      // 添加申请单信息参数
      params.pafList = Object.assign(params.pafList, {
        pafListNo: '1',
        pafTemplateId: this.templateId,
        applyDeptCode: '1',
        applyDeptName: '申请科室名',
        createdBy: 1,
        isDel: 0,
        orderAt: util.timeFormatter(new Date())
      })

      // 添加病人信息参数
      params.pafList = Object.assign(params.pafList, {
        patId: this.patInfo.patId,
        pattpyeCode: this.patInfo.pattpyeCode,
        hospNo: this.patInfo.hospNo,
        patName: this.patInfo.patName,
        cardNo: this.patInfo.cardNo,
        genderCode: this.patInfo.genderCode,
        age: this.patInfo.age,
        cureNo: this.patInfo.cureNo,
        wardNo: this.patInfo.wardNo,
        wardName: this.patInfo.wardName,
        bedNo: this.patInfo.bedNo,
        idnum: this.patInfo.idnum,
        contactInformation: this.patInfo.contactInformation,
        contactAddress: this.patInfo.contactAddress,
        medicalInsuranceNo: this.patInfo.medicalInsuranceNo,
        medicalInsuranceName: this.patInfo.medicalInsuranceName,
        yexh: this.patInfo.yexh,
      })

      // 添加医嘱信息参数
      if (doctorAdvice) {
        let list = []

        this.checkedPafTempList.forEach(item => {
          if (item) {
            list.push({
              pafItemId: item.pafTemplateitemId,
              itemName: item.itemName,
              itemQty: '1'
            })
          }
        })
        
        params.doctorAdvice = list
      }

      // 添加临床信息参数
      if (clinicalInfo) {
        params.pafList.clinicalDiag   = this.patUserClinicalInfo.clinicalDiag
        params.pafList.medicalHistory = this.patUserClinicalInfo.medicalHistory
      }

      // 添加标本信息参数
      if (specimenInfo) {
        
        // TODO 暂时不确定标本部位和标本名称是否为级联
        let specimens = []

        this.specimenInfos.forEach(item => {
          if (item.specimenData.length === 3) {
            let specimenItem = {
              seqNo: item.seqNo, // 标本序号
              positionName: item.specimenData[1], // 标本部位
              specimenName: item.specimenData[2], // 标本名称
              specimenQty: item.specimenQty, // 数量
              specimenLabelCode: item.specimenLabelCode, // 标本条码
              specimenCollectMode: item.specimenCollectMode, // 采集方式
              specimenFixativeSolution: item.specimenFixativeSolution, // 固定液
              gatherAt: item.gatherAt, // 采集时间
              gatherBy: item.gatherBy, // 采集人编码
              isDel: 0
            }

            specimens.push(specimenItem)
          }
        })

        params.specimen = specimens
      }

      // 添加内镜信息参数
      if (endoscopeInfo) {
        params.pafList = Object.assign(params.pafList, {
          isInfectionInfor: this.patUserEndoscopeInfo.checkList.indexOf('无') !== -1 ? 1 : 0,
          isTuberculosis: this.patUserEndoscopeInfo.checkList.indexOf('结核') !== -1 ? 1 : 0,
          isSyphilis: this.patUserEndoscopeInfo.checkList.indexOf('梅毒') !== -1 ? 1 : 0,
          isAids: this.patUserEndoscopeInfo.checkList.indexOf('艾滋病') !== -1 ? 1 : 0,
          isHepatitisb: this.patUserEndoscopeInfo.checkList.indexOf('乙肝') !== -1 ? 1 : 0,
          isHCV: this.patUserEndoscopeInfo.checkList.indexOf('丙肝') !== -1 ? 1 : 0,
          otherTuberculosis: this.patUserEndoscopeInfo.checkList.indexOf('其他') !== -1 ? this.patUserEndoscopeInfo.otherTuberculosis : '',
          clinicalDiag: this.patUserEndoscopeInfo.ENDOSCOPY_DIAGNOSIS
        })

        if (!this.patUserEndoscopeInfo.ENDOSCOPY_DIAGNOSIS) {
          messages.push('内窥镜检查所见及结论')
        }

        if (!this.patUserEndoscopeInfo.checkList.length) {
          messages.push('感染信息')
        }
      }

      // 添加手术信息参数
      if (operInfo) {
        params.pafList = Object.assign(params.pafList, {
          otherFindings: this.operInfo.operFindings, // TODO operFindings or otherFindings ??
          isInfectionInfor: this.operInfo.checkList.indexOf('无') !== -1 ? 1 : 0,
          isTuberculosis: this.operInfo.checkList.indexOf('结核') !== -1 ? 1 : 0,
          isSyphilis: this.operInfo.checkList.indexOf('梅毒') !== -1 ? 1 : 0,
          isAids: this.operInfo.checkList.indexOf('艾滋病') !== -1 ? 1 : 0,
          isHepatitisb: this.operInfo.checkList.indexOf('乙肝') !== -1 ? 1 : 0,
          isHCV: this.operInfo.checkList.indexOf('丙肝') !== -1 ? 1 : 0,
          otherTuberculosis: this.operInfo.checkList.indexOf('其他') !== -1 ? this.operInfo.otherTuberculosis : '',
        })

        if (!this.operInfo.operFindings) {
          messages.push('手术所见')
        }

        if (!this.operInfo.checkList.length) {
          messages.push('感染信息')
        }
      }

      // 添加妇科信息参数
      if (gynecologicalInfo) {
        params.pafList = Object.assign(params.pafList, {
          isMenopause: gynecologicalInfo.baseInfo.isMenopause,
          menstrualCycles: gynecologicalInfo.baseInfo.menstrualCycles,
          menstrualBlood: gynecologicalInfo.baseInfo.menstrualBloodVolume,
          lastMenstruatAt: gynecologicalInfo.baseInfo.lastMenstrualDate,
          menstrualHistory:gynecologicalInfo.baseInfo.menstrualHistory,
          curettageAt: gynecologicalInfo.baseInfo.curettageDate,
          pregnancy:"",
          parity:"",
          lastProductAt: gynecologicalInfo.baseInfo.lastBirthDate,
          abortionAt: gynecologicalInfo.baseInfo.lastAbortionDate,
          urinationBlood: gynecologicalInfo.baseInfo.urineOrBlood,
          hcg: gynecologicalInfo.baseInfo.hcg,
          hormoneTreatAt: gynecologicalInfo.baseInfo.hormoneTherapyDate,
          doseNumber: gynecologicalInfo.baseInfo.hormoneTherapyAmount,
          remarks: gynecologicalInfo.baseInfo.note,

          isOralNeedles: gynecologicalInfo.medicalRecordCheckList.indexOf('口服避孕药或避孕针') !== -1 ? 1 : 0,
          isUterineRing: gynecologicalInfo.medicalRecordCheckList.indexOf('子宫环') !== -1 ? 1 : 0,
          isIntrauterDevice: gynecologicalInfo.medicalRecordCheckList.indexOf('宫内节育器') !== -1 ? 1 : 0,
          isFourmPostpartum: gynecologicalInfo.medicalRecordCheckList.indexOf('产后四个月') !== -1 ? 1 : 0,
          isPreGnant: gynecologicalInfo.medicalRecordCheckList.indexOf('怀孕') !== -1 ? 1 : 0,
          isLactation: gynecologicalInfo.medicalRecordCheckList.indexOf('哺乳期') !== -1 ? 1 : 0,

          isOvariectOperat: gynecologicalInfo.surgeryHistoryCheckList.indexOf('卵巢切除术') !== -1 ? 1 : 0,
          isHysterectOperat: gynecologicalInfo.surgeryHistoryCheckList.indexOf('子宫切除术') !== -1 ? 1 : 0,
          isCervicalLeep: gynecologicalInfo.surgeryHistoryCheckList.indexOf('宫颈椎切除术或Leep术') !== -1 ? 1 : 0,
          otherPostoperat: gynecologicalInfo.surgeryHistoryCheckList.indexOf('其他') !== -1 ? 1 : 0,
        })
      }

      // 添加肿瘤信息参数
      if (tumorInfo) {
        params.pafList = Object.assign(params.pafList, {
          tumorSite: tumorInfo.baseInfo.position,
          tumorSize: tumorInfo.baseInfo.size,
          tumorShape: tumorInfo.baseInfo.shape,
          tumorTexture: tumorInfo.baseInfo.materialQuality,
          tumorGrowthRate: tumorInfo.baseInfo.growSpeed,
          tumorActivity: tumorInfo.baseInfo.activity,
          tumorTransfer: tumorInfo.baseInfo.transfer,
        })
      }

      // cah
      if (cah) {
        params.pafList = Object.assign(params.pafList, {
          cytologicalResult: cah.baseInfo.cytologicalResult,
          hpvDnaResult: cah.baseInfo.dnaResult,
          hpvMrnaResult: cah.baseInfo.mRnaResult
        })
      }

      // 既往病理检查
      if (pathExam) {
        let list = []

        if (this.pathList) {
          this.pathList.forEach(item => {
            list.push({
              inspectOrgan: item.HOSPITAL_CODE,
              inspectAt: item.CHECK_DATE,
              inspectDiag: item.PATHOLOGIC_DIAGNOSIS,
              inspectNo: '1',
            })
          })
        }
        params.historyCheck = list
      }

      // 检验信息
      if (messages.length) {
        this.$message({
          message: `请完善${messages.join('、')}`,
          type: 'error'
        })

        return null
      }

      console.log(params)

      return params
    },
    /**保存或更新病理申请单 */
    savePafListInfo () {
      let params = this.collectTemplateParams()
      if (params) {
        this.loading.addPafLoading = true

        params.pafList.id = !!this.pafListId ? this.pafListId : ''

        let message = !!this.pafListId ? '更新成功' : '保存成功'

        API.addPafListInfo(params).then(resp => {
          if (resp.type == 'SUCCESS') {
            this.$message({
              message: message,
              type: 'success'
            })
          }

          DataHandle(resp).then(resp => {
            if (!this.pafListId) {
              this.pafListId = resp.data
            }

            API.getPafListInfo(this.pafListId).then(resp => {
              DataHandle(resp).then(resp => {
                
                let specimens = resp.data.specimen || []
                specimens.forEach(spe => {
                  let specimenName = spe.specimenName
                  let positionName = spe.positionName
                  spe.specimenData = [0, parseInt(positionName), parseInt(specimenName)]

                  exit:
                  for (let i = 0, size = this.specimenData.length; i < size; i++) {
                    let organ = this.specimenData[i]
                    let children = organ.children

                    for (let j = 0, jsize = children.length; j < jsize; j++) {
                      if (positionName == children[j].ID) {
                        spe.specimenData[0] = organ.ID
                        break exit
                      }
                    }
                  }
                })

                this.specimenInfos = specimens

                this.$nextTick(() => {
                  this.specimenInfos.forEach((item, index) => {
                    this.changeSpecimen(item.specimenData, index)
                  })
                })
              })
            })
          }).finally(() => this.loading.addPafLoading = false)
        })
      }
    },
    /**发送病理申请单信息 */
    sendPafListInfo () {
      let params = this.collectTemplateParams()
      if (params) {
        this.loading.addPafLoading = true

        API.sendPafListInfo(params).then(resp => {
          if (resp.type == 'SUCCESS') {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          }

          DataHandle(resp).then(resp => {
            console.log(resp)
          }).finally(() => this.loading.addPafLoading = false)
        }).finally(() => this.loading.addPafLoading = false)
      }
    }
  },
  created () {
    API.getPafTemplate().then(resp => {
      DataHandle(resp).then(resp => {
        this.examTypes = resp.data || []
        this.templateId = '1'
        this.changeExamType(this.templateId)
      })
    })

    this.addSpecimen()

    API.getPatUserInfo().then(resp => {
      this.patInfo = resp.data || {}
    })

    API.getPafTemplateitems({}).then(resp => {
      let data = resp.data
      this.pafTemplateitems = data || []
      this.checkedPafTempList.length = data.length
      this.pafTemplateitems.forEach((item,index) => {
        if (item.defaultCheck) {
          this.checkedPafTempList[index] = item
          this.totalCost = this.totalCost + item.chargeItemPrice
          this.checkedPafCount++
        }
      })
    })

    API.getDictionaryData().then(resp => {
      this.initData = resp.data || {}
      this.fixationFluid = this.initData['固定液'][0].SLAVENO
    })

    API.getSpecimenGatherers().then(resp => {
      // TODO
      this.gatherers = resp.data || []
    })

    API.getSpecimenData().then(resp => {
      this.specimenData = resp.data
    })

    API.getPatUserClinicalInfo().then(resp => {
      let data = resp.data
      this.patUserClinicalInfo = data || {}
    })

    API.getHistoryCheck().then(resp => {
      let data = resp.data
      this.pathList = data || []
    })

    API.getPatUserEndoscopeInfo().then(resp => {
      let data = resp.data

      this.patUserEndoscopeInfo.ENDOSCOPY_DIAGNOSIS  = data[0].ENDOSCOPY_DIAGNOSIS || ''
      this.patUserEndoscopeInfo.PATHOLOGIC_DIAGNOSIS = data[0].PATHOLOGIC_DIAGNOSIS || ''
      infectionInfoListMapping(data, this.patUserEndoscopeInfo.checkList)
    })

    API.getPatUserOperationInfo().then(resp => {
      let data = resp.data

      if (data) {
        this.operInfo.operFindings = data.operFindings || ''
        infectionInfoListMapping(data, this.operInfo.checkList)
      }

    })
  }
}
</script>

<style lang="stylus">
#pathological
  font-size 12px !important
  font-family PingFangSC-Medium,PingFang SC
  .checkbox-group-column
    display flex
    flex-direction column
    label
      margin 0
      margin-bottom 10px

  .checkbox-group-form-item
    .w-form-item__main
      height 32px
      display flex
      align-items center
  
  #examTypeSelect
    .w-input__inner
      font-size 12px
      border none
      width 140px
      height 26px
      background linear-gradient(180deg, rgba(255,200,0,1) 0%, rgba(223,141,24,1) 100%)
      box-shadow 0px 1px 1px 0px rgba(181,181,181,0.5)
      border-radius 2px
      color #fff
    .w-input__icon
      color #fff
    .w-input__border-bottom
      display none

  .row-content
    padding 10px
    .tag
      margin 3px

    .w-button--primary.is-plain.unchecked
      background #fff

      &:hover, &:active, &:focus
        background #fff
        color #0F49ED

    .w-button--primary.is-plain.checked
      position relative
      background #4071FF
      color #fff
      &:focus, &:active 
        color #fff
      span
        margin-left 18px
      i.w-icon-success
        position absolute

  .w-input-number
    min-width 0
    .w-input__inner
      padding 0
      padding-right 30px
    .w-input-number--controller
      width 30px
  
  .w-form .w-select
    width 100%

  .w-modal
    width 40%
    height auto
    .w-modal__footer
      position relative
      height 64px
      padding 0
    .w-modal__body
      padding 21px 19px
      border-bottom 1px solid #DFE7F5

  .bottom
    font-size 0
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .w-button
      min-width 90px
      +.w-button
        margin-left 24px
  .bottom-left
    position absolute
    left 10px
    top 50%
    transform translateY(-50%)
    & > span
      margin-right 10px

  .w-cascader
    line-height 1
    .w-cascader__label
      line-height 32px

  .textarea-form-item
    .w-form-item__label
      line-height 20px !important

  .w-textarea__inner
    min-height 60px
  
  .w-checkbox__inner::after
    box-sizing initial

  .w-form .w-form-item+.w-form-item
    margin-top 13px

  .w-date-editor
    width 100%
    input
      font-weight normal

  .w-form-item__main
    line-height 1

  .patinfo-aside
    .w-row
      margin-bottom 9px
    .w-form-item__label
      font-size 13px
    .w-tabs
      height 100%
      .w-tabs__content
        height calc(100% - 28px)
        overflow scroll
        padding-right 8px
      .w-tabs__small .w-tabs__item
        padding 0
        width 100px
        text-align center
  .w-form-item__label
    margin-left 0
    padding-right 8px

.w-select-dropdown
  position absolute
  z-index 1001
  border 1px solid rgba(15,73,237,.2)
  border-radius 2px
  background-color #fff
  box-shadow 0 1px 3px 1px #cfdbfb
  box-sizing border-box
  margin 5px 0
  .w-select-dropdown__empty
    padding 12px
</style>

<style lang="stylus" scoped>
#pathological
  height 100%
  .patinfo-header
    padding 0 16px
    height 50px
    display flex
    align-items center
    background-color #fff
    span
      margin 0 10px
  .main-container
    padding 12px 15px
    height calc(100% - 50px)
    background rgba(234,237,244,1)
    box-shadow inset 0px 3px 4px 0px rgba(208,214,228,1)
  .main-panel
    display flex
    justify-content space-between
    height calc(100% - 67px)
    background #fff
    box-shadow 0px 3px 4px 0px rgba(208,214,228,1)
    border-radius 2px
  .main-info
    padding 13px 17px
    width calc(100% - 350px)
    border-right 1px solid rgb(216, 216, 216)
    overflow scroll
    .info-section
      margin-bottom 9px
  .patinfo-aside
    padding 16px
    width 350px
    height 100%
  .operation-footer
    position relative
    height 67px
    border-top 1px solid rgb(216, 216, 216)
    background #fff
  .icon-group
    display flex
    align-items center
    height 32px
    justify-content space-around
    svg
      width 16px
      height 16px
      cursor pointer
    
  #addSpecimen
    user-select none
    cursor pointer
    font-size 12px
    font-weight 600
    color #0F49ED
  #fixationFluidForm
    display flex
    justify-content center
    align-items center
    *
      margin-right 10px
</style>