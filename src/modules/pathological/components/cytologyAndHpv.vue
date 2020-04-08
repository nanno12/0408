<template>
  <div id="cytologyAndHpv">
    <!-- 基本信息 -->
    <w-row>
      <TitleLabel name="基本信息" tip-position="bottom">
        <template slot="tip">若曾做过细胞学/HPV相关检查，请勿忘填写以下信息</template>
      </TitleLabel>
      <div class="row-content">
        <w-form sizes="mini" label-align="top" label-width="260px">
          <w-row> <!-- 细胞学结果 -->
            <w-form-item label="细胞学结果">
              <w-input v-model="baseInfo.cytologicalResult"/>
            </w-form-item>
          </w-row>

          <w-row> <!-- HPV DNA 检测结果 -->
            <w-form-item label="HPV DNA 检测结果">
              <w-input v-model="baseInfo.dnaResult" />
            </w-form-item>
          </w-row>

          <w-row> <!-- HPV E6/E7 mRNA检测结果 -->
            <w-form-item label="HPV E6/E7 mRNA检测结果">
              <w-input v-model="baseInfo.mRnaResult"/>
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
      baseInfo: { // 基本信息
        mRnaResult: '',
        dnaResult: '',
        cytologicalResult: ''
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
#cytologyAndHpv
  .w-form-item.is-label-top .w-form-item__label
    margin-bottom 8px
    width 100%
    &::before
      display none
  .w-row
    margin-bottom 24px !important
  .w-form
    padding 6px 0
</style>