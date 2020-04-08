/*
 * 右侧信息
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-18 10:08:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-03 16:47:21
 */
<template>
  <div class="right-info-wrap">
    <w-tabs v-model="activeTab">
      <w-tab-pane label="项目&流程" name="currItem"></w-tab-pane>
      <w-tab-pane label="检验项目" name="otherItem"></w-tab-pane>
    </w-tabs>
    <!-- 项目&流程 -->
    <div class="contain" v-if="activeTab == 'currItem'">
      <!-- 申请项目 -->
      <div class="apply-item inspection-item">
        <div class="title">申请项目 <span>总计：{{this.currentRow.APPLY_AMOUNT ? this.currentRow.APPLY_AMOUNT : 0}}ml</span></div>
        <div class="apply-item-table">
          <table  cellpadding="0" cellspacing="0">
            <tr v-for="(item, index) in requestItemList"
                :key="index">
              <td>{{item.MOULD_ITEM_NAME}}</td>
              <td>{{item.AMOUNTUNIT}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 流程 -->
      <div class="process-item inspection-item">
        <div class="title">流程</div>
        <div class="step-box">
          <w-steps :active="this.nowStep" 
                  finish-status="success" 
                  direction='vertical' 
                  :space="80" 
                  lead>
            <w-step v-for="(item, index) in approvalnodList" :key="index">
              <div slot="title">{{item.NODENAME}}</div>
              <div slot="description">
                <div>{{item.APPROVAL_TIME}}</div>
                <div><span v-if="item.APPROVAL_DOCTORNAME">{{item.APPROVAL_DOCTORNAME}}（{{item.APPROVAL_DOCTORCODE}}）</span> <span v-if="item.MOBILEPHONE">Tel：{{item.MOBILEPHONE}}</span></div>
              </div>
            </w-step>
          </w-steps>
        </div>
      </div>
    </div>
    <!-- 检验项目 -->
    <div class="contain" v-if="activeTab == 'otherItem'">
      <!-- 必检项目 -->
      <div class="must-item inspection-item">
        <div class="title">必检项目</div>
        <div class="must-item-table">
          <w-table
            border
            class="short-table"
            :data="checkedItemList"
            style="width: 100%">
            <w-table-column
              prop="INDICATOR_NAME"
              label="检验项目"
              width="120"
              show-overflow-tooltip>
            </w-table-column>
            <w-table-column
              prop="INDICATOR_RESULT"
              label="结果"
              width="70"
              show-overflow-tooltip>
            </w-table-column>
            <w-table-column
              prop="INDICATOR_REPORT_TIME"
              label="报告时间"
              width=""
              show-overflow-tooltip>
            </w-table-column>
          </w-table>
        </div>
      </div>
      <!-- 关注项目 -->
      <div class="focus-item inspection-item">
        <div class="title">关注项目</div>
        <div class="focus-item-table">
          <w-table
            border
            class="short-table"
            :data="otherItemList"
            style="width: 100%">
            <w-table-column
              prop="INDICATOR_NAME"
              label="检验项目"
              width="120"
              show-overflow-tooltip>
            </w-table-column>
            <w-table-column
              prop="INDICATOR_RESULT"
              label="结果"
              width="70"
              show-overflow-tooltip>
            </w-table-column>
            <w-table-column
              prop="INDICATOR_REPORT_TIME"
              label="报告时间"
              width=""
              show-overflow-tooltip>
            </w-table-column>
          </w-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 激活项
      activeTab: 'currItem',
      active1: 3,
      flowlist: [
        {nodeStatus: 'true', nodeName: '申请单开单', operateName: '张翰（0012）', operateTime: '2020-03-25 09:34', operateTel: '18890679000'},
        {nodeStatus: 'true', nodeName: '一审', operateName: '张翰（0012）', operateTime: '2020-03-25 09:34', operateTel: '18890679000'},
        {nodeStatus: 'true', nodeName: '二审', operateName: '张翰（0012）', operateTime: '2020-03-25 09:34', operateTel: '18890679000'},
        {nodeStatus: 'true', nodeName: '三审', operateName: '张翰（0012）', operateTime: '2020-03-25 09:34', operateTel: '18890679000'}
      ],
      tableData: [
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
        {INDICATOR_NAME: '乙肝e抗原', INDICATOR_RESULT: '80', INDICATOR_REPORT_TIME: '2020-03-26 09:32'},
      ]
    };
  },
  components: {
    
  },
  props: {
    // 必检项目
    checkedItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 关注项目
    otherItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 申请项目
    requestItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 流程
    approvalnodList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 当前行
    currentRow: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 当前步骤
    nowStep: Number,
  },
  computed: {

  },
  watch: {
  },
  created() {

  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.right-info-wrap
  height 100%
  >>>.w-tabs
    .w-tabs__header
      margin 0 10px
      .w-tabs__active-bar
        height 2px
      .w-tabs__item
        height 40px
        line-height 40px
  .contain
    height calc(100% - 40px)
    overflow auto
    .inspection-item
      .title
        height 40px
        line-height 40px
        font-weight 700
        margin 0 10px
        &:before
          display inline-block
          content ""
          width 3px
          height 14px
          vertical-align middle
          margin-right 5px
          margin-bottom 2px
          background rgba(15,73,237,1)
        span
          color #f00
          text-align right
          font-weight 500
          float right
      .focus-item-table,.must-item-table
        height calc(100% - 40px)
        margin 0 10px
        >>>.w-table
          height 100%
          .w-table__body-wrapper
            height calc(100% - 35px)
            // overflow auto
    .apply-item
      margin-bottom 24px
      .apply-item-table
        margin 0 10px
        table
          width 100%
        table,tr,td
          border 1px solid #ccc
          //不加上这个会重合边框
          border-collapse collapse
        table
          tr
            height 30px
            line-height 30px
          td
            padding-left 10px
            text-align left
  .step-box
    // height 300px
    margin 10px 10px 10px 20px
    >>>.w-step__main
      .w-step__description
        color #000622
</style>

<style lang="stylus">
.process-item
  .navline
    padding 0
    position relative
    list-style none
    font-family microsoft yahei
    color #37414a
    // 抗锯齿渲染
    -webkit-font-smoothing antialiased
    margin 10px 10px 10px 20px
    // height calc(100% - 40px)
  .navline-text
    position relative
    width 100%
    top 8px
    font-size 12px
    padding-bottom 5px
    color #000
  .navline:after
    position absolute
    content ''
    left 5px
    top 0
    width 1px
    height calc(100% - 40px)
    background-color #244DA3
  .navline-item
    position relative
    margin 0.8em 0 0 27px
    padding-bottom 0.2em
    height 30%
    .navline-circle
      position absolute
      top .28em
      left -34px
      width 25px
      height 25px
      border-radius 50%
      border 1px solid #1346F4
      background-color #1346F4
      z-index 1
      line-height 25px
      text-align center
      color #fff
      background-color #ccc
      &:first-child
        top 0px
    .navline-circle-active
      background-color #0F49ED
    &:last-child
      padding-bottom unset
      .navline-circle
        top .28em
</style>