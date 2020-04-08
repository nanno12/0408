<template>
  <div id="tumorInfo">
    <w-row>
      <TitleLabel name="基本信息">
        <template slot="tip">若系肿瘤标本，请勿忘填写以下信息</template>
      </TitleLabel>
      <div class="row-content">
          <w-form sizes="mini" label-align="right" label-width="76px">
            <w-row> <!-- 部位 -->
              <w-form-item label="部位">
                <w-select v-model="baseInfo.position">
                  <w-option
                    v-for="item in positionList"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-row>

            <w-row> <!-- 大小 -->
              <w-form-item label="大小">
                <w-select v-model="baseInfo.size">
                  <w-option
                    v-for="item in sizeList"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-row>

            <w-row> <!-- 形状 -->
              <w-form-item label="形状">
                <w-select v-model="baseInfo.shape">
                  <w-option
                    v-for="item in shapeList"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-row>

            <w-row> <!-- 质地 -->
              <w-form-item label="质地">
                <w-select v-model="baseInfo.materialQuality">
                  <w-option
                    v-for="item in materialQualityList"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-row>

            <w-row> <!-- 生长速度 -->
              <w-form-item label="生长速度">
                <w-select v-model="baseInfo.growSpeed">
                  <w-option
                    v-for="item in growSpeedList"
                    :key="item.SLAVENO"
                    :label="item.SLAVENAME"
                    :value="item.SLAVENO">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-row>

            <w-row> <!-- 活动度 -->
              <w-form-item label="活动度">
                <w-input v-model="baseInfo.activity"/>
              </w-form-item>
            </w-row>

            <w-row> <!-- 有无转移或可疑转移 -->
              <w-form-item label="有无转移或可疑转移" class="textarea-form-item">
                <w-input v-model="baseInfo.transfer" type="textarea" :rows="3"/>
              </w-form-item>
            </w-row>
          </w-form>
      </div>
    </w-row>
  </div>
</template>

<script>
import TitleLabel from './titleLabel'

export default {
  components: { TitleLabel },
  data () {
    return {
      baseInfo: {
        position: '',
        size: '',
        shape: '',
        materialQuality: '',
        growSpeed: '',
        activity: '',
        transfer: ''
      }
    }
  },
  props: {
    positionList: {
      type: Array,
      default: () => []
    },
    sizeList: {
      type: Array,
      default: () => []
    },
    shapeList: {
      type: Array,
      default: () => []
    },
    materialQualityList: {
      type: Array,
      default: () => []
    },
    growSpeedList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus">
#tumorInfo
  .w-form-item .w-form-item__label
    &::before
      display none
</style>