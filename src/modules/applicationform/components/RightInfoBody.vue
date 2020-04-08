/*
 * 右侧信息
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-18 10:08:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-01 14:01:59
 */
<template>
  <div class="right-info-wrap">
    <w-tabs v-model="activeTab">
      <w-tab-pane label="输血前项目" name="currItem"></w-tab-pane>
      <w-tab-pane label="关注项目" name="otherItem"></w-tab-pane>
    </w-tabs>
    <!-- 内容 -->
    <div class="contain">
      <w-table
        border
        class="short-table"
        :data="activeTab == 'otherItem' ? otherFocusItemList : transfusionItemList"
        style="width: 100%">
        <!-- <w-table-column
          prop="seq"
          label="NO."
          width="40"
          v-if="activeTab == 'currItem'"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.$index < 9 ? "0" + (scope.$index + 1) : scope.$index + 1 }}
          </template>
        </w-table-column> -->
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
          show-overflow-tooltip
          sortable>
        </w-table-column>
      </w-table>
      <!-- 输血指标 -->
      <div class="boold-standard">
        <div class="title">输血指征<i>（不合理）</i></div>
        <w-table
          border
          class="short-table"
          :data="transfoList"
          style="width: 100%">
          <w-table-column
            prop="MOULD_ITEM_NAME"
            label="输血成分"
            width="100"
            show-overflow-tooltip
            sortable>
          </w-table-column>
          <w-table-column
            prop="ITEMCONDITION"
            label="输血指征"
            width=""
            show-overflow-tooltip>
          </w-table-column>
          <w-table-column
            prop="TRANSFUSIONADVICE"
            label="合理性"
            width="80"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="[scope.row.TRANSFUSIONADVICE ? '' : 'r-color']">
                {{scope.row.TRANSFUSIONADVICE ? '合理' : '不合理'}}
              </span>
            </template>
          </w-table-column>
        </w-table>
      </div>
    </div>
  </div>
</template>
<script>
import { applicationform  } from '@/app/utils/tableName';
export default {
  data() {
    return {
      // 激活项
      activeTab: 'currItem',
      // 模块code
      moduleCodeOther: applicationform.otherFocusItemList.moduleCode,
      // 模块名称
      moduleNameOther: applicationform.otherFocusItemList.moduleName,
      // 模块code
      moduleCodeCurr: applicationform.transfusionItemList.moduleCode,
      // 模块名称
      moduleNameCurr: applicationform.transfusionItemList.moduleName,
      // 表头
      tableTitle: [
        {name: 'seq', label: 'NO.', width: '50', checked: true, fixed: ''},
        {name: 'INDICATOR_NAME', label: '检验项目', width: '120', checked: true, fixed: '', sortable: true},
        {name: 'INDICATOR_RESULT', label: '结果', width: '80', checked: true, fixed: '', sortable: true},
        {name: 'INDICATOR_REPORT_TIME', label: '报告时间', width: '150', checked: true, fixed: '', sortable: true},
      ],
      /** 输血指征 */
      // 模块code
      moduleCodeTransfo: applicationform.transfoList.moduleCode,
      // 模块名称
      moduleNameTransfo: applicationform.transfoList.moduleName,
      tableTitleTransfo: [
        {name: 'ITEM_NAME', label: '输血成分', width: '90', checked: true, fixed: '', sortable: true},
        {name: 'TRANSBLOODIDICATIO', label: '输血指征', width: '120', checked: true, fixed: '', sortable: true},
        {name: 'SUGGEST', label: '合理性', width: '70', checked: true, fixed: '', sortable: true},
      ],
    };
  },
  components: {
    
  },
  props: {
    // 其他关注项目
    otherFocusItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 输血前项目
    transfusionItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 输血指征
    transfoList: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  computed: {

  },
  watch: {
    transfoList(val) {
      // console.log(val,'klklklkl')
    }
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
      margin 0 16px
      .w-tabs__active-bar
        height 2px
      .w-tabs__item
        height 40px
        line-height 40px
  .contain
    height calc(100% - 40px)
    overflow auto
    padding 16px 16px 0 16px
  >>>.w-table,>>>.sortTable
    // 先注释
    // height 60%
  .boold-standard
    // 先注释
    // height 40%
    // min-height 180px
    overflow hidden
    .title
      height 20px
      line-height 20px
      font-weight 700
      margin 10px 0
      &:before
        display inline-block
        content ""
        width 3px
        height 14px
        vertical-align middle
        margin-right 5px
        margin-bottom 2px
        background rgba(15,73,237,1)
      i
        color #f00
    >>>.w-table,>>>.sortTable
      height calc(100% - 40px)
  >>>.w-table,>>>.sortTable
    font-size 12px
    td,th
      padding 0 !important
    .w-table__body-wrapper
      // 先注释
      // height calc(100% - 35px)
      // overflow auto
    .cell
      padding-left 8px !important
      padding-right 8px !important
      font-size 12px
</style>

<style lang="stylus">
</style>