<template>
  <div id="gynecologicalInfo">
    <w-row>
      <div class="row-content">
        <w-form sizes="mini" label-align="right" label-width="78px">
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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-row>

          <w-row> <!-- 经血量 -->
            <w-form-item label="经血量">
              <w-select v-model="baseInfo.menstrualBloodVolume">
                <w-option
                  v-for="item in menstrualBloodVolumeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-row>

          <w-row> <!-- 末次月经 -->
            <w-form-item label="末次月经">
              <w-date-picker
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="G" 
                  v-model="baseInfo.gpal[0]"
                  :disabled="baseInfo.reproductiveHistory !== 1"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="P" 
                  v-model="baseInfo.gpal[1]"
                  :disabled="baseInfo.reproductiveHistory !== 1"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="A"
                  v-model="baseInfo.gpal[2]"
                  :disabled="baseInfo.reproductiveHistory !== 1"/>
              </w-form-item>
            </w-col>
            <w-col :span="3">
              <w-form-item class="no-label">
                <w-input class="placeholder-center" placeholder="L"
                  v-model="baseInfo.gpal[3]"
                  :disabled="baseInfo.reproductiveHistory !== 1"/>
              </w-form-item>
            </w-col>
          </w-row>

          <w-row> <!-- 末次生产 -->
            <w-form-item label="末次生产">
              <w-date-picker
                v-model="baseInfo.lastBirthDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 末次流产 -->
            <w-form-item label="末次流产">
              <w-date-picker
                v-model="baseInfo.lastAbortionDate"
                type="date"
                placeholder="选择日期">
              </w-date-picker>
            </w-form-item>
          </w-row>

          <w-row> <!-- 刮宫日期 -->
            <w-form-item label="刮宫日期">
              <w-date-picker
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseInfo: { // 基本信息
        isMenopause: 2, // 是否绝经 1-是 2-否
        menstrualCycles: null, // 月经周期是否正常
        menstrualBloodVolume: null, // 经血量是否正常
        lastMenstrualDate: '', // 末次月经日期
        menstrualHistory: '', // 月经史
        reproductiveHistory: 2, // 妊娠史
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
      menstrualBloodVolumeOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '较多'
        },
        {
          value: 3,
          label: '较少'
        },
        {
          value: 4,
          label: '未知'
        }
      ],
      menstrualCyclesOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '长'
        },
        {
          value: 3,
          label: '短'
        }
      ],
      urineOrBloodOptions: [
        {
          value: 1,
          label: '小便'
        },
        {
          value: 2,
          label: '血'
        }
      ],
      reproductiveHistoryOptions: [
        {
          value: 1,
          label: '有'
        },
        {
          value: 2,
          label: '无'
        },
        {
          value: 3,
          label: '不详'
        }
      ]
    }
  },
  computed: {
    hasReproductiveHistory () {
      return this.baseInfo.reproductiveHistory
    }
  },
  watch: {
    hasReproductiveHistory (newV, oldV) {
      if (newV !== 1) {
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
  #hcg
    .w-form-item__label
      width 60px !important
    .w-form-item__main
      margin-left 60px !important
</style>