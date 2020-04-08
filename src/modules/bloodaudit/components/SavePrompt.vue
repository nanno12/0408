/*
 * 保存信息提示
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-19 17:49:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-19 18:05:22
 */
<template>
  <el-dialog
    title="保存提示"
    :visible.sync="show"
    @open="open"
    :before-close="close"
    size="tiny"
    class="save-prompt-wrap">
    <span>因为患者血红蛋白不满足输血指征条件（HGB）&lt;= 80g/L。</span>
    <span>是否继续保存？</span>
    <span class="title">继续保存原因：</span>
    <el-input v-model="reason" ref="reason" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
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
  },
  methods: {
    /** 打开弹框 */
    open() {
      this.$nextTick(() => {
      setTimeout(_ => {
        this.$refs.reason.$refs.input.select();
      },0)
      })
    },
    /** 确认保存 */
    submit(type) {
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
  >>>.el-dialog--tiny 
    width 380px
    height 220px
    top 30% !important
    .el-dialog__body,.el-dialog__header,.el-dialog__footer 
      background #fff !important
    .el-dialog__body
      padding 15px 10px
      font-size 12px
      color #000
      > span
        display block
        padding-bottom 10px
        letter-spacing 1px
        &.title
          padding-top 5px
          color #999
    .el-dialog__header
      border-bottom 1px solid #eee
      .el-dialog__title
        color #000 !important
</style>