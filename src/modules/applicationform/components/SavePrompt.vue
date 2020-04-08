/*
 * 保存信息提示
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-19 17:49:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-30 10:13:50
 */
<template>
  <w-modal
    title="保存提示"
    :visible.sync="show"
    :close-on-click-modal='false'
    @open="open"
    :before-close="close"
    class="save-prompt-wrap">
    <span>因为患者不满足以下输血指征条件：</span>
    <span v-for="(item,index) in unreasonableList" :key="index">{{item.ITEMCONDITION}}；</span>
    <span>是否继续保存？</span>
    <span class="title">继续保存原因：</span>
    <w-input v-model="reason" ref="reason" placeholder="请输入内容"></w-input>
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
      // 继续保存原因
      reason: ''
    }
  },
  computed: {
  },
  props: {
    show: Boolean,
    unreasonableList: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  methods: {
    /** 打开弹框 */
    open() {
      this.$nextTick(() => {
      setTimeout(_ => {
        this.reason = '';
        this.$refs.reason.$refs.input.select();
      },0)
      })
    },
    /** 确认保存 */
    submit(type) {
      if(!this.reason) {
        layerUtils.showMessage("请输入继续保存原因",layerUtils.messageType.WARNING);
        this.$refs.reason.$refs.input.select();
        return;
      }
      this.$emit('confirmSave',this.reason);
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
    height 280px
    background rgba(255,255,255,1)
    border-radius 2px
    .w-modal__header__title
      font-size 16px
    .w-modal__body
      padding 20px
      overflow auto
      height calc(100% - 108px)
      > span
        display block
        padding-bottom 10px
        font-size 14px
        font-family PingFangSC-Regular,PingFang SC
        font-weight 400
        color rgba(0,6,34,1)
        &.title
          color rgba(0,6,34,0.4)
          font-size 13px
      .w-input
        .w-input__border-bottom
          bottom -10px
    .w-modal__footer
      .w-button
        width 90px
        height 32px
</style>