<template>
  <div id="specimenentry">
    <header class="patinfo-header">
      <w-input v-model="hospNo" sufAppendIsButton>
        <template slot="suf-append">
          <i class="w-icon-search" @click="searchList"></i>
        </template>
      </w-input>
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
        <section class="info-section" style="height:calc(60% - 26px)"> <!-- 申请单信息 -->
          <TitleLabel name="申请单信息">
            <w-radio-group @change="searchList" slot="right" v-model="time">
              <w-radio label="sevenday">近七天</w-radio>
              <w-radio label="onemonth">近一个月</w-radio>
              <w-radio label="threemonth">近三个月</w-radio>
              <w-radio label="sixmonth">近半年</w-radio>
            </w-radio-group>
          </TitleLabel>
          <div class="row-content">
            <w-table
              :data="tableData"
              @row-click="clickRow"
              tooltip-effect="dark"
              highlight-current-row
              border
              style="width: 100%"
              height="100%"
              max-height="100%">
              <w-table-column prop="ID" label="申请单号" width="180"/>
              <w-table-column prop="TEMPLATE_NAME" label="申请单模板"/>
              <w-table-column :show-overflow-tooltip="true" prop="doctorAdvice" label="医嘱信息">
                <template slot-scope="scope">
                  <span>{{ scope.row.doctorAdvice | doctorAdviceFilter }}</span>
                </template>
              </w-table-column>
              <w-table-column prop="CREATED_BY" label="申请医生"/>
              <w-table-column prop="APPLY_DEPT_CODE" label="申请科室"/>
              <w-table-column prop="ORDER_AT" sortable label="申请时间">
                <template slot-scope="scope">
                  <span>{{ timeFormatter(scope.row.ORDER_AT) }}</span>
                </template>
              </w-table-column>
              <w-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <w-button type="text" @click="detail(scope.$index)">详情</w-button>
                  <w-button type="text" @click="printSpecimen(scope.$index)">打印申请单</w-button>
                </template>
              </w-table-column>
            </w-table>
          </div>
        </section>

        <section class="info-section" style="height:calc(40% - 26px)"> <!-- 标本信息 -->
          <TitleLabel name="标本信息">
            <div id="fixationFluidForm" slot="right">
              <div>
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
      </main>
      <footer class="operation-footer">
        <div class="bottom">
          <w-button>打印全部条码</w-button>
          <w-button type="primary">打印全部条码及申请单</w-button>
        </div>
      </footer>
      <w-modal title="详情" :visible.sync="detailVisiable">
        <div class="detail-container">
          <section>
            <TitleLabel name="手术信息"/>
            <div class="info-content">
              <p>
                <span class="title">手术所见：</span>
                <span>{{ currentPafListInfo.pafList.otherFindings }}</span>
              </p>
              <p>
                <span class="title">感染信息：</span>
                <span>{{ infectionInfo }}</span>
              </p>
            </div>
          </section>
          <section>
            <TitleLabel name="临床信息"/>
            <div class="info-content">
              <p>
                <span class="title">临床诊断：</span>
                <span>{{ currentPafListInfo.pafList.clinicalDiag }}</span>
              </p>
              <p>
                <span class="title">历史摘要及其他病历信息：</span>
                <span>{{ currentPafListInfo.pafList.medicalHistory }}</span>
              </p>
            </div>
          </section>
          <section>
            <TitleLabel name="妇科信息"/>
            <div class="info-content">
              <w-row :gutter="10">
                <w-col :span="8">是否绝经：{{ currentPafListInfo.pafList.isMenopause == 1 ? '是' : '否' }}</w-col>
                <w-col :span="8">月经周期：{{ currentPafListInfo.pafList.menstrualCycles }}</w-col>
                <w-col :span="8">经血量：{{ currentPafListInfo.pafList.menstrualBlood }}</w-col>
              </w-row>
              <w-row :gutter="10">
              <w-col :span="8">本次月经：{{ currentPafListInfo.pafList.lastMenstrualAt }}</w-col>
                <w-col :span="8">月经史：{{ currentPafListInfo.pafList.menstrualHistory }}</w-col>
                <w-col :span="8">妊娠史：4，2，2，2</w-col>
              </w-row>
              <w-row :gutter="10">
                <w-col :span="8">末次生产：{{ currentPafListInfo.pafList.lastProductAt }}</w-col>
                <w-col :span="8">末次流产：{{ currentPafListInfo.pafList.abortionAt }}</w-col>
                <w-col :span="8">刮宫日期：{{ currentPafListInfo.pafList.curettageAt }}</w-col>
              </w-row>
              <w-row :gutter="10">
                <w-col :span="8">小便或血：血HCG，23.00</w-col>
                <w-col :span="8">激素治疗：2019-05-23，10ml</w-col>
                <w-col :span="8">备注：{{ currentPafListInfo.pafList.remarks }}</w-col>
              </w-row>
              <w-row :gutter="10">
                <w-col :span="8">病人病历：</w-col>
              </w-row>
            </div>
          </section>
          <section>
            <TitleLabel name="细胞学/HPV"/>
            <div class="info-content">
              <p>
                <span class="title">细胞学结果：</span>
                <span>{{ currentPafListInfo.pafList.cytologicalResult }}</span>
              </p>
              <p>
                <span class="title">HPV DNA 检测结果：</span>
                <span>{{ currentPafListInfo.pafList.hpvDnaResult }}</span>
              </p>
              <p>
                <span class="title">HPV E6/E7 mRNA检测结果：</span>
                <span>{{ currentPafListInfo.pafList.hpvMrnaResult }}</span>
              </p>
            </div>
          </section>
          <section>
            <TitleLabel name="既往病理检查"/>
            <div class="info-content">
              <div v-for="(item, index) in currentPafListInfo.historyCheck" :key="index">
                <p>
                  <span class="title">病理号：</span>
                  <span>{{ item.inspectNo }}</span>
                </p>
                <p>
                  <span class="title">检测时间/机构：</span>
                  <span>{{ item.inspectAt }}&ensp;&ensp;{{ item.inspectOrgan }}</span>
                </p>
                <p>
                  <span class="title">病理诊断：</span>
                  <span>{{ item.inspectDiag }}</span>
                </p>
                <hr/>
              </div>
            </div>
          </section>
        </div>
      </w-modal>
    </div>
  </div>
</template>

<script>
import TitleLabel from '../components/titleLabel'
import API from '../api'
import DataHandle from '@/app/utils/dataHandle'
import util from '../util'

const today = new Date()
const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

export default {
  components: { TitleLabel },
  data () {
    return {
      detailVisiable: false,
      time: 'onemonth',
      hospNo: '',
      initData: {}, // 数据字典
      gatherers: [],
      patInfo: { // 病人信息
        patName: '',
        bedNo: '',
        genderCode: '',
        age: '',
        medicalInsuranceName: '',
        hospNo: '',
        idnum: ''
      },
      fixationFluid: 0,
      specimenData: [],
      specimenInfos: [],
      tableData: [],
      currentPafListInfo: { // 当前查看的申请单详情
        pafList: {}
      },
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now();
        }
      },
    }
  },
  methods: {
    searchList () {
      let createdAt = ''

      if (this.time == 'sevenday') {
        createdAt = util.addmulDay(todayStr, -1)
      }

      else if (this.time == 'onemonth') {
        createdAt = util.addmulMonth(todayStr, -1)
      }

      else if (this.time == 'threemonth') {
        createdAt = util.addmulMonth(todayStr, -3)
      }

      else {
        createdAt = util.addmulMonth(todayStr, -6)
      }

      API.findPafLists(this.hospNo, createdAt).then(resp => {
        let data = resp.data || []

        data.forEach(item => {
          let specimens = item.specimen || []
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
        })

        this.tableData = data
      })
    },
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
    removeSpecimen (index) {
      let specimen = this.specimenInfos[index]

      if (specimen.id) {
        API.deleteCheckSpecimen(specimen.id).then(resp => {
          DataHandle(resp).then(resp => {
            this.specimenInfos.splice(index, 1)
          })
        })
      } else {
        this.specimenInfos.splice(index, 1)
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
    printSpecimen (index) {
      if (index === 'all') {
        this.specimenInfos.forEach(item => {
          if (item.specimenLabelCode && item.specimenData.length === 3) {
            this.printCount ++
          }
        })
      }

      else {
        let item = this.specimenInfos[index]
        let messages = []
        if (!item.specimenLabelCode) {
          messages.push('标本条码')
        }

        if (item.specimenData.length !== 3) {
          messages.push('标本部位')
        }

        if (!item.specimenData.length !== 3) {
          messages.push('标本名称')
        }

        if (messages.length) {
          this.$message({
            message: `完善${messages.join('、')}后才能打印`,
            type: 'error'
          })
        } else {
          this.printCount++
        }
      }
    },
    detail (index) {
      API.getPafListInfo(this.tableData[index].ID).then(resp => {
        this.currentPafListInfo = resp.data
        this.detailVisiable = true
      })
    },
    clickRow (row, event, column) {
      this.specimenInfos = row.specimen || []

      this.$nextTick(() => {
        this.specimenInfos.forEach((item, index) => {
          this.changeSpecimen(item.specimenData, index)
        })
      })
    },
    timeFormatter (timestamp) {
      return util.timeFormatter(timestamp)
    }
  },
  created () {
    API.getPatUserInfo().then(resp => {
      this.patInfo = resp.data
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

      this.searchList()
    })
  },
  computed: {
    /**根据年龄与性别判断应使用的矢量头像 */
    avatar () {
      let age = this.patInfo.age || 0
      let gender = this.patInfo.genderCode

      if (age <= 1)  return 'iconyinger'
      if (age <= 16) return gender == '男' ? 'iconnantong' : 'iconnvtong'
      if (age <= 59) return gender == '男' ? 'iconnanqingnian' : 'iconnvqingnian'
      return gender == '男' ? 'iconyeye' : 'iconnainai'
    },
    /**计算感染信息内容 */
    infectionInfo () {
      let pafList = this.currentPafListInfo.pafList
      if (pafList.isInfectionInfor == 1) {
        return '无'
      }

      let infos = []
      if (pafList.isTuberculosis == 1) {
        infos.push('结核')
      }

      if (pafList.isSyphilis == 1) {
        infos.push('梅毒')
      }

      if (pafList.isAids == 1) {
        infos.push('艾滋病')
      }

      if (pafList.isHepatitisb == 1) {
        infos.push('乙肝')
      }

      if (pafList.isHcv == 1) {
        infos.push('丙肝')
      }

      if (pafList.otherTuberculosis) {
        infos.push(pafList.otherTuberculosis)
      }

      return infos.join('; ')
    }
  },
  filters: {
    doctorAdviceFilter (doctorAdvice) {
      let names = []
      doctorAdvice.forEach(item => names.push(item.ITEM_NAME))
      return names.join(';')
    }
  }
}
</script>

<style lang="stylus">
#specimenentry
  .patinfo-header
    .w-input
      width auto
  .w-cascader
    line-height 1
    .w-cascader__label
      line-height 32px
  .w-input-number
    min-width 0
    .w-input__inner
      padding 0
      padding-right 30px
    .w-input-number--controller
      width 30px
  .w-form-item .w-date-editor input
    font-weight normal
  .row-content
    .w-date-editor,.w-select,.w-cascader
      width 100%
  .w-table
    td,th
      padding 3px 0
  .w-drawer__content
    width 35%
    
  .w-modal__wrapper
    .w-modal__body
      padding-top 0
    &> div
      height 500px
      width 696px
    .w-modal__body
      height calc(100% - 60px)
      overflow scroll
    .detail-container
      height 100%
      .row-label-left
        font-weight 600
      .w-row
        margin-bottom 9px
      .w-form-item__label
        font-size 13px
      section
        margin 15px 0
      .info-content
        .title
          font-weight 500
        p
          line-height 20px
          margin-bottom 8px
</style>

<style lang="stylus" scoped>
#specimenentry
  font-size 13px
  font-family PingFangSC-Medium,PingFang SC
  height 100%
  .patinfo-header
    font-size 14px
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
    height calc(100% - 67px)
    background #fff
    border-radius 2px
    padding 13px 17px
    overflow scroll
    .info-section
      margin-bottom 26px
      .row-label
        margin-bottom 5px
      .row-content
        height calc(100% - 32px)
        overflow-y scroll
  .operation-footer
    position relative
    height 67px
    border-top 1px solid rgb(216, 216, 216)
    background #fff
  .bottom
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
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
  .row-content
    padding 10px
    .tag
      margin 3px
  .icon-group
    display flex
    align-items center
    height 32px
    justify-content space-around
    svg
      width 16px
      height 16px
      cursor pointer
</style>
