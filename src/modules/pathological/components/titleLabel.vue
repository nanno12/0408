<template>
  <div class="row-label"><!--  type="flex" align="middle" -->
    <div class="row-label-left">
      <span class="row-label-pre"></span>
      <span class="row-label-name">{{ name }}</span>
      <span class="row-label-tip" :class="tipPosition === 'bottom' ? 'label-tip-bottom' : 'label-tip-right'">
        <slot name="tip"/>
      </span>
    </div>
    <div class="row-label-right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    tipPosition: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style lang="stylus" scoped>
.row-label
  color #000
  font-size 14px
  .label-tip-bottom
    display block
    margin-top 8px
  &::after
    content ''
    display block
    clear both
  .row-label-left
    float left
    font-weight 600
    margin 5px 0
  .row-label-pre
    vertical-align bottom
    margin-right 5px
    display inline-block
    width 3px
    height 14px
    background rgba(15,73,237,1)
  .row-label-name
    line-height 14px
  .row-label-tip
    font-size 12px
    font-weight 400
    color #F52C2C
    margin-left 9px
  .row-label-right
    float right 
</style>

