/*
 * 有无未关联的申请单
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-19 17:49:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-29 17:19:04
 */
<template>
  <w-modal
    title="提示"
    :visible.sync="show"
    :close-on-click-modal='false'
    @open="open"
    :before-close="close"
    class="save-prompt-wrap">
    <span>改患者有一个【常规备血申请】信息，是否关联？</span>
    <span> 
      <w-checkbox v-model="isChecked" true-value="1" false-value="0" >2020-02-20 9:00 吴磊 消化内科一病区 38床</w-checkbox>
    </span>
    <span slot="footer" class="dialog-footer">
      <w-button class="cancel-btn" @click="close">取 消</w-button>
      <w-button type="primary" @click="submit">确 定</w-button>
    </span>
  </w-modal>
</template>
<script>
import DataHandle from '@/app/utils/dataHandle'
import * as layerUtils from 'app/utils/layerUtils'
export default {
  data() {
    return {
      isChecked: '0'
    }
  },
  computed: {
  },
  props: {
    show: Boolean,
  },
  methods: {
    /** 打开弹框 */
    open() {
      this.$nextTick(() => {
      })
    },
    /** 确定 */
    submit(type) {
      this.close();
    },
    /** 关闭弹框 */
    close() {
      this.$emit('update:show',false);
    }
  }
}
</script>
<style lang="stylus" scoped>
.save-prompt-wrap
  >>>.w-modal
    width 456px
    height 182px
    background rgba(255,255,255,1)
    border-radius 2px
    .w-modal__header__title
      font-size 16px
    .w-modal__body
      > span
        padding-bottom 10px
        font-size 14px
        font-family PingFangSC-Regular,PingFang SC
        font-weight 400
        color rgba(0,6,34,1)
    .w-modal__footer
      .w-button
        width 90px
        height 32px
</style>