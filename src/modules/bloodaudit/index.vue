/*
 * 用血审核
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-24 15:33:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-03 16:55:04
 */
<template>
  <div class="blood-audit-wrap" :style="{zoom:100/100}">
    <!-- 头部查询条件 -->
    <header class="top">
      <w-form :inline="true" :model="form" label-width="60px" v-focusNextOnEnter>
        <w-row :gutter="0">
          <w-col :span="6">
            <w-form-item label="申请日期" class="date-range">
              <w-date-picker
                v-model="form.timeRange"
                type="daterange"
                align="right"
                range-separator="至"
                :clearable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptionsRange">
              </w-date-picker>
            </w-form-item> 
          </w-col>
          <w-col :span="4">
            <w-form-item label="病区">
              <w-select v-model="form.wardno" placeholder="请选择">
                <w-option
                  v-for="item in form.wardList"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.CODE">
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="4">
            <w-form-item label="住院号">
              <w-input
                v-model="form.hospno"
                placeholder="请输入内容"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="4">
            <w-form-item label="床号">
              <w-input
                v-model="form.badno"
                placeholder="请输入内容"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="4" class="view-emergency-blood">
            <w-form-item>
              <w-checkbox v-model="form.checked" true-label="1" false-label="0" >仅查看紧急用血</w-checkbox>
            </w-form-item>
           </w-col>
          <w-col :span="2" class="query-button">
            <w-form-item label="">
              <w-button @click="getExaminList">查 询</w-button>
            </w-form-item>
          </w-col>
        </w-row>
      </w-form>
    </header>
    <!-- 主体内容 -->
    <div class="blood-audit-body" v-loading="loading">
      <div class="left-body re">
        <header class="left-top">
          <w-radio-group  v-model="queryObj.examinstatus" @change="(value) => {changeRadio(value)}">
            <w-radio label="unchecked">待审核</w-radio>
            <w-radio label="checked">已审核</w-radio>
            <w-radio label="all">全部</w-radio>
          </w-radio-group>
          <div class="application">
            <w-checkbox v-model="queryObj.ifblongme" @change="applicationChange">大量用血申请</w-checkbox>
          </div>
        </header>
        <left-info-body :queryObj="queryObj"
                        :tableData="tableData"
                        @getLisItemList="getLisItemList"
                        @getItemFlow="getItemFlow"
                        ></left-info-body>
      </div>
       <!-- 右侧信息 -->
      <div class="right-body">
       <right-info-body :checkedItemList="checkedItemList"
                        :otherItemList="otherItemList"
                        :requestItemList="requestItemList"
                        :approvalnodList="approvalnodList"
                        :currentRow="currentRow"
                        :nowStep="nowStep"></right-info-body>
      </div>
    </div>
  </div>
</template>
<script>
import LeftInfoBody from './components/LeftInfoBody';
import RightInfoBody from './components/RightInfoBody';
import dataApi from './api/api.js';
import {isDateObject} from "@/app/utils/dateUtils";
import {dateTimeFormat, timeFormat} from '@/app/utils/index'
export default {
  components: {
    LeftInfoBody,
    RightInfoBody,
  },
  data() {
    return {
      // 加载状态
      loading: false,
      queryObj: {
        examinstatus: 'unchecked',
        ifblongme: false
      },
      // 查询条件
      form: {
        wardList: [],
        timeRange: '',
        begintime: '',
        endtime: '',
        wardno: '',
        hospno: '',
        badno: '',
        // 仅查看紧急用血
        checked: ''
      },
      // 时间范围快捷项
      pickerOptionsRange: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
              text: '最近二周',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
              }
          }],
          onPick: ({ maxDate, minDate }) => {
            // this.form.timeRange = minDate.getTime()
            // if (maxDate) {
            //   this.form.timeRange = ''
            // }
          },
          disabledDate: (time) => {
            // if (this.form.timeRange !== '') {
            //   const days = (31 - 1) * 24 * 3600 * 1000
            //   let maxTime = this.form.timeRange + days
            //   return time.getTime() > maxTime
            // }
            return time.getTime() > Date.now()
          }
      },
      // 表格数据
      tableData: [],
      // 必检项目
      checkedItemList: [],
      // 关注项目
      otherItemList: [],
      // 申请项目
      requestItemList: [],
      // 流程
      approvalnodList: [],
      // 当前行
      currentRow: {},
      // 当前步骤
      nowStep: 0,
    };
  },
  props: {

  },
  computed: {

  },
  watch: {
    'form.timeRange'(val) {
      console.log(val)
    }
  },
  created() {
    this.$nextTick(() => {
      // 根据状态查询数据
      this.changeRadio(this.queryObj.examinstatus);
    });
  },
  mounted() {
  },
  methods: {
    /** 查询 */
    getExaminList() {
      this.loading = true;
      let params = {
        // 开始申请时间
        begtime: timeFormat(this.form.timeRange[0]),
        // 结束申请时间
        endtime: timeFormat(this.form.timeRange[1]),
        // 病区代码
        wardno: this.form.wardno,
        // 病员号
        hospno: this.form.hospno,
        // 床号
        bedno: this.form.badno,
        // 审核状态 已审核-checked 未审核-unchecked 全部-all
        examinstatus: this.queryObj.examinstatus,
        // 大量申请单  勾上-true 没勾上-false
        ifblongme: this.queryObj.ifblongme
      }
      dataApi.getExaminList(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.tableData = data.data || [];
        }else {
          this.tableData = [];
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    /** 改变状态 */
    changeRadio(val) {
      this.getExaminList();
    },
    /** 大量申请单勾选否 */
    applicationChange() {
      this.getExaminList();
    },
    /** 获取右侧检验项目 */
    getLisItemList(row) {
      if(!row || JSON.stringify(row) == '{}') {
        this.checkedItemList = [];
        this.otherItemList = [];
        return;
      }
      let params = {
        listno: row.LIST_NO
      }
      dataApi.getLisItemList(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.checkedItemList = data.data ? data.data.CHECKEDITEMLIST : [];
          this.otherItemList = data.data ? data.data.OTHERITEMLIST : [];
        }else {
          this.checkedItemList = [];
          this.otherItemList = [];
        }
      })
    },
    /** 获取项目流程数据 */
    getItemFlow(row) {
      this.currentRow = row;
      if(!row || JSON.stringify(row) == '{}') {
        this.requestItemList = [];
        this.approvalnodList = [];
        return;
      }
      let params = {
        listno: row.LIST_NO,
        flowname: row.FLOW_NAME || '',
        flowcode: row.FLOW_CODE || '',
        mobilephone: row.MOBILEPHONE,
        createtime: row.CREATE_TIME,
        operatorname: row.OPERATOR_NAME,
        operatorcode: row.OPERATOR_CODE
      }
      dataApi.getItemFlow(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.nowStep = data.data ? Number(data.data.NOWSTEP) : 0
          this.requestItemList = data.data ? data.data.REQUESTITEMLIST : [];
          this.approvalnodList = data.data ? data.data.APPROVALNODELIST : [];
        }else {
          this.requestItemList = [];
          this.approvalnodList = [];
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.blood-audit-wrap
  height 100%
  width 100%
  background rgba(234,237,244,1)
  overflow hidden
  .top
    height 50px
    background #fff
    padding 10px
    box-shadow 0px 3px 4px 0px rgba(208,214,228,1)
    >>>.w-row
      display flex
      align-items center
    >>>.w-form-item
      width 100%
      .w-form-item__label
        margin-left 0
        font-size 12px
        padding-right 5px
        color #000
        text-align center
      .el-autocomplete,.el-input,.w-date-editor
        width 100%
      .w-form-item__main
        font-size 12px
        line-height normal
    >>>.w-form-item.date-range
      .w-form-item__wrapper
        .w-form-item__label
          width 80px !important
        .w-form-item__main
          margin-left 80px !important
    .view-emergency-blood
      width 136px
      margin-left 10px
      >>>.w-form-item__main
        line-height 32px
    .query-button
      width 56px
      height 32px
  .blood-audit-body
    height calc(100% - 50px)
    width 100%
    padding 12px 15px
    overflow hidden
    .left-body
      height 100%
      width calc(100% - 385px)
      float left
      background #fff
      .left-top
        height 45px
        line-height 45px
        padding 0 20px
        .application
          display inline-block
          padding-left 20px
          margin-left 20px
          border-left 1px solid #eee
          height 20px
          line-height 20px
    .right-body
      width 370px
      margin-left 15px
      height 100%
      float right
      background #fff
</style>
<style lang="stylus">
.blood-audit-wrap
  .w-icon-success
    color #5ebd09 !important
  .w-table
    height 100%
    font-size 12px
    td,th
      padding 0 !important
    .w-table__body-wrapper
      height calc(100% - 35px)
    .cell
      padding-left 8px !important
      padding-right 8px !important
      font-size 12px
  .w-range-input, .w-input, .w-textarea, .w-checkbox, .w-checkbox__label, .w-radio__label, .w-button
    font-size 12px !important
  .w-radio__inner
    width 16px
    height 16px
</style>