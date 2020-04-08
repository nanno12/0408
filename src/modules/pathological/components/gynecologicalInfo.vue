<template>
  <div id="gynecologicalInfo">
    <!-- 基本信息 -->
    <w-row>
      <TitleLabel name="基本信息">
        <template slot="tip">若系子宫内膜标本，请勿忘填写以下信息</template>
      </TitleLabel>
      <div class="row-content">
        <w-form sizes="mini" label-align="right" label-width="60px">
          <w-row> <!-- 是否绝经 -->
            <w-form-item label="是否绝经">
              <w-select v-model="baseInfo.isMenopause">
                <w-option
                  v-for="item in menopauseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-row>

          <w-row> <!-- 月经周期 -->
            <w-form-item label="月经周期">
              <w-select v-model="baseInfo.menstrualCycles">
                <w-option
                  v-for="item in menstrualCyclesOptions"
                  :key="item.SLAVENO"
                  :label="item.SLAVENAME"
                  :value="item.SLAVENO">
                </w-option>
              </w-select>
            </w-form-item>
          </w-row>

          <w-row> <!-- 经血量 -->
            <w-form-item label="经血量">
              <w-select v-model="baseInfo.menstrualBloodVolume">
                <w-option
                  v-for="item in menstrualBloodVolumeOptions"
                  :key="item.SLAVENO"
                  :label="item.SLAVENAME"
                  :value="item.SLAVENO">
                </w-option>
              </w-select>
            </w-form-item>
          </w-row>

          <w-row> <!-- 末次月经 -->
            <w-form-item label="末次月经">
              <w-date-picker
                :picker-options	="pickerOptions"
                v-model="baseInfo.lastMenstrualDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 月经史 -->
            <w-form-item label="月经史">
              <w-input v-model="baseInfo.menstrualHistory"/>
            </w-form-item>
          </w-row>

          <w-row :gutter="6"> <!-- 妊娠史 -->
            <w-col :span="12">
              <w-form-item label="妊娠史">
                <w-select v-model="baseInfo.reproductiveHistory">
                  <w-option
                    v-for="item in reproductiveHistoryOptions"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="G" 
                  v-model="baseInfo.gpal[0]"
                  :disabled="baseInfo.reproductiveHistory !== '001'"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="P" 
                  v-model="baseInfo.gpal[1]"
                  :disabled="baseInfo.reproductiveHistory !== '001'"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="A"
                  v-model="baseInfo.gpal[2]"
                  :disabled="baseInfo.reproductiveHistory !== '001'"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="L"
                  v-model="baseInfo.gpal[3]"
                  :disabled="baseInfo.reproductiveHistory !== '001'"/>
              </w-form-item>
            </w-col>
          </w-row>

          <w-row> <!-- 末次生产 -->
            <w-form-item label="末次生产">
              <w-date-picker
               :picker-options	="pickerOptions"
                v-model="baseInfo.lastBirthDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 末次流产 -->
            <w-form-item label="末次流产">
              <w-date-picker
                :picker-options	="pickerOptions"
                v-model="baseInfo.lastAbortionDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 刮宫日期 -->
            <w-form-item label="刮宫日期">
              <w-date-picker
                :picker-options	="pickerOptions"
                v-model="baseInfo.curettageDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 小便或血 -->
            <w-col :span="15">
              <w-form-item label="小便或血">
                <w-select v-model="baseInfo.urineOrBlood">
                  <w-option
                    v-for="item in urineOrBloodOptions"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="9">
              <w-form-item id="hcg" label="HCG">
                <w-input v-model="baseInfo.hcg"/>
              </w-form-item>
            </w-col>
          </w-row>

          <w-row :gutter="5"> <!-- 激素治疗 -->
            <w-col :span="18">
              <w-form-item label="激素治疗">
                <w-date-picker
                  :picker-options	="pickerOptions"
                  v-model="baseInfo.hormoneTherapyDate"
                  type="date"
                  placeholder="选择日期">
                </w-date-picker>
              </w-form-item>
            </w-col>
            <w-col :span="6">
              <w-form-item class="no-label">
                <w-input placeholder="ml" v-model="baseInfo.hormoneTherapyAmount"/>
              </w-form-item>
            </w-col>
          </w-row>

          <w-row> <!-- 备注 -->
            <w-form-item label="备注">
              <w-input v-model="baseInfo.note"/>
            </w-form-item>
          </w-row>
        </w-form>
      </div>
    </w-row>

    <!-- 病人病历 -->
    <w-row>
      <TitleLabel name="病人病历">
        <template slot="tip">请选择所有合适的项目</template>
      </TitleLabel>
      <div class="row-content">
        <w-checkbox-group v-model="medicalRecordCheckList" class="checkbox-group-column">
          <w-checkbox label="口服避孕药或避孕针"/>
          <w-checkbox label="子宫环"/>
          <w-checkbox label="宫内节育器"/>
          <w-checkbox label="产后四个月"/>
          <w-checkbox label="怀孕"/>
          <w-checkbox label="哺乳期"/>
          <w-checkbox label="不正常流血"/>
        </w-checkbox-group>
      </div>
    </w-row>

    <!-- 手术后 -->
    <w-row>
      <TitleLabel name="手术后"/>
      <div class="row-content">
        <w-checkbox-group v-model="surgeryHistoryCheckList" class="checkbox-group-column">
          <w-checkbox label="卵巢切除术"/>
          <w-checkbox label="子宫切除术"/>
          <w-checkbox label="宫颈椎切除术或Leep术"/>
          <w-checkbox label="其他"/>
        </w-checkbox-group>
      </div>
    </w-row>
  </div>
</template>

<script>
import TitleLabel from './titleLabel'

export default {
  components: { TitleLabel },
  props: {
    menstrualCyclesOptions: { // 月经周期选项
      type: Array,
      default: () => []
    },
    menstrualBloodVolumeOptions: { // 经血量选项
      type: Array,
      default: () => []
    },
    urineOrBloodOptions: { // 小便或血选项
      type: Array,
      default: () => []
    },
    reproductiveHistoryOptions: { // 妊娠史选项
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now();
        }
      },
      baseInfo: { // 基本信息
        isMenopause: 2, // 是否绝经 1-是 2-否
        menstrualCycles: null, // 月经周期是否正常
        menstrualBloodVolume: null, // 经血量是否正常
        lastMenstrualDate: '', // 末次月经日期
        menstrualHistory: '', // 月经史
        reproductiveHistory: '002', // 妊娠史
        gpal: ['', '', '', ''],
        lastBirthDate: '', // 末次生产日期
        lastAbortionDate: '', // 末次流产日期
        curettageDate: '', // 刮宫日期
        hcg: '', // HCG
        urineOrBlood: '', // 小便或血
        hormoneTherapyDate: '', // 激素治疗日期
        hormoneTherapyAmount: null, // 激素治疗量
        note: '' // 备注
      },
      medicalRecordCheckList: [], // 病人病历选中列表
      surgeryHistoryCheckList: [], // 手术史选中列表
      menopauseOptions: [ // 选项 => 是否绝经
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
    }
  },
  computed: {
    hasReproductiveHistory () {
      return this.baseInfo.reproductiveHistory
    }
  },
  watch: {
    hasReproductiveHistory (newV, oldV) {
      if (newV !== '001') {
        this.baseInfo.gpal = ['','','','']
      }
    }
  }
}
</script>

<style lang="stylus">
#gynecologicalInfo
  .placeholder-center
    input::-webkit-input-placeholder,input
      text-align: center
    input
      padding 0
  .no-label
    .w-form-item__main
      margin-left 0 !important
    .w-form-item__label.is-empty
      margin 0 !important
  .w-form-item .w-form-item__label
    &::before
      display none
  #hcg
    .w-form-item__label
      width 60px !important
    .w-form-item__main
      margin-left 60px !important
</style>