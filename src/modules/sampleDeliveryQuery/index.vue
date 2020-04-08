<!--
* @author w_sh
* @date 2020-03-05
* @module 标本流转查询
-->
<template>
  <div class="sampleDeliveryQuery" v-scroll @click="popoverFilterShow = false" v-loading="loadState"
    element-loading-text="数据获取中">
    <div class="sampleDeliveryQueryBody">
      <div class="top">
        <div class="conditionItem dataTimeItem">
          <span class="conditionTitle">外送时间：</span>
          <el-date-picker
            v-model="form.begindate"
            type="datetime"
            class="datetImeWidth"
            ref="date"
            :clearable="false"
            :editable='false'
            :picker-options="timePickRange"
            @change="handleStartTime"
            placeholder="选择日期时间">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model="form.enddate"
            type="datetime"
            class="datetImeWidth"
            ref="date"
            :clearable="false"
            :editable='false'
            :picker-options="timePickRange"
            @change="handleEndTime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="conditionItem">
          <span class="conditionTitle">检测中心：</span>
          <el-autocomplete
            class="baseConditionWisth"
            v-model="form.targetlabcode"
            custom-item="base-auto-item"
            :props="{label:'NAME',value:'CODE',displayCode:'CODE'}"
            :item-list="jczxList"
            placeholder="请选择检测中心"
          ></el-autocomplete>
        </div>
        <div class="conditionItem">
          <span class="conditionTitle">患者姓名：</span>
          <el-input class="baseConditionWisth" v-model="form.patname" placeholder="请输入患者姓名"></el-input>
        </div>
        <div class="conditionItem">
          <span class="conditionTitle">条形码：</span>
          <el-input class="baseConditionWisth" v-model="form.txm" placeholder="请输入条形码"></el-input>
        </div>
        <el-button class="vt" type="primary" @click="queryList">查 询</el-button>
      </div>
      <div ref="maxBlock" class="contentBody minBlock re" @mousemove="sliderMove" @mouseup="sliderMoveEnd">
        <div ref="block1" class="left mainBody inlB vt">
          <div class="flexBox">
            <div class="titleSetBox">
              <span class="bold"><span class="blue">{{selectRows.length}}</span>/{{tableData.length}}</span>
              <div class="setIconBox" :class="{'canSet' : selectRows.length > 0}">
                <el-tooltip class="item" effect="dark" content="发布" placement="top">
                  <span class="setIcon" @click="releaseReport">发</span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="回收" placement="top">
                  <span class="setIcon" @click="recoveryReport">回</span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="打印" placement="top">
                  <span class="setIcon" @click="printingReport">印</span>
                </el-tooltip>
                <span class="setIcon re selectIcon">撤
                  <div class="ab setSelect">
                    <p @click="cancelDownload">撤销报告下载</p>
                    <p @click="cancelUpload">撤销标本上传</p>
                  </div>
                </span>
                <el-tooltip class="item" effect="dark" content="下载" placement="top">
                  <span class="setIcon" @click="upDownReport">下</span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="恢复自助打印" placement="top">
                  <span class="setIcon" @click="recoverySelfPrint">自</span>
                </el-tooltip>
              </div>
            </div>
            <div class="tableBox">
              <sort-table
              ref="multipleTable"
              :tableData="tableData"
              :tableTitle="tableTitle"
              :moduleCode="moduleCode"
              :moduleName="moduleName"
              :highlight="true"
              :isheightrow="currentRow"
              :border="false"
              @select-change="handleSelectionChange"
              @select-all="handleSelectionChange"
              @current-change="handleRowClick"
              @getNewTableTitle="getNewTableTitle">
                <template v-for="(item)  in tableTitle">
                  <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :fixed="item.fixed" :key="item.name"></vxe-table-column>
                  <!-- 上传状态 -->
                  <vxe-table-column
                    v-else-if="item.name == 'DELIVERYSTATUSDESC'"
                    :sortable="item.sortable"
                    :fixed="item.fixed"
                    :field="item.name"
                    :title="item.label"
                    :show-header-overflow="true"
                    :show-overflow="true"
                    :width="item.width"
                    :key="item.name">
                    <!-- 表头自定义 -->
                    <template slot="header" slot-scope="{ column }">
                      <span>{{ column.title }}</span>
                    </template>
                    <!-- 内容自定义 -->
                    <template slot-scope="scope">
                      <span :class="{'green' : scope.row.DELIVERYSTATUS != 0}">{{scope.row.DELIVERYSTATUSDESC}}</span>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    v-else
                    :sortable="item.sortable"
                    :sort-method="item.sortMethod"
                    :field="item.name"
                    :fixed="item.fixed"
                    :title="item.label"
                    :show-header-overflow="true"
                    :show-overflow="true"
                    :width="item.width"
                    :key="item.name">
                    <template slot="header" slot-scope="{ column }">
                      <span>{{ column.title }}</span>
                      <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                        <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                      </span>
                    </template>
                  </vxe-table-column>
                </template>
              </sort-table>
            </div>
            <div class="filterChecked">
              <div class="filterItem" v-for="(items, index) in filterSet" :key="index">
                <el-checkbox v-model="item.checked" v-for="(item, itemIndex) in items" :key="itemIndex" @change="filterList(item)">{{item.name}}</el-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div ref="block2" class="right mainBody inlB vt">
          <div class="rightInforTitle">
            <right-infor-title :ybgzSample="ybgzSample" :currentRow="currentRow"></right-infor-title>
          </div>
          <div class="rightInforBody">
            <right-infor-body
            :reportResultList="reportResultList"
            :reportImageList="reportImageList"
            :pdfPath="pdfPath"
            :currentRow="currentRow"
            :ybgzSample="ybgzSample"
            ></right-infor-body>
          </div>
        </div>
        <div ref="slider1" @mousedown="(e) => {sliderMoveStart(e, 1)}" class="slider slider1 ab"></div>
      </div>
    </div>
    <!-- 批量操作结果提示 -->
    <batch-operate-result
      @close = "closeBatchResult"
      @keepOn="handleContinueBatchVerify"
      :title="batchOperateResultTitle"
      :show.sync="batchOperateResultShow"
      :listData="batchOperateResult">
    </batch-operate-result>
  </div>
</template>
<script>
import dataApi from './api/api.js';
import Common from '@/app/api/common.js';
import dataHandle from 'app/utils/dataHandle';
import autoResize from '@/app/components/autoResize';
import { sampleDeliveryQuery } from '@/app/utils/tableName';
import {dateTimeFormat} from '@/app/utils/index';
// import { setEelementSelect } from '@/app/utils/vdom';
// import httpUtils from '@techCommon/utils/httpUtils';
import rightInforTitle from './components/rightInforTitle';
// import rightInforBody from './components/rightInforBody';
import Print from '@/app/utils/printUtils';
import BatchOperateResult from '@/app/components/dialog/BatchOperateResult';

export default {
  mixins: [autoResize],
  components: {
    rightInforTitle,
    // rightInforBody,
    BatchOperateResult
  },
  data() {
    return {
      // 数据加载状态
      loadState: false,
      // 模块Code
      moduleCode: sampleDeliveryQuery.listData.moduleCode,
      // 模块name
      moduleName: sampleDeliveryQuery.listData.moduleName,
      // 条件
      form: {
        begindate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        enddate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59),
        targetlabcode: '',
        patname: '',
        txm: '',
        cusparam: []
      },
      // 只能选择小于当天得数据
      timePickRange: {
        disabledDate(time) {
          return time.getTime() >= new Date();
        }
      },
      // 检测中心下拉数据
      jczxList: [],
      // 底部筛选操作项
      filterSet: [
        [
          {name: '未检测', value: '1', group: 'report', checked: false, desc: '未检测'},
          {name: '下载异常', value: '3', group: 'report', checked: false, desc: '下载异常'},
          {name: '未发布', value: '4', group: 'report', checked: false, desc: '未发布'},
          {name: '撤销上传', value: '0', group: 'report', checked: false, desc: '撤销上传'},
          {name: '已发布', value: '5', group: 'report', checked: false, desc: '已发布'},
          {name: '撤销下载', value: '2', group: 'report', checked: false, desc: '撤销下载'}
        ],
        [
          {name: '加急', value: '1', group: 'mjzbz', checked: false, desc: '门急诊标志'},
          {name: '传染', value: '1', group: 'biohazardflag', checked: false, desc: '传染病标志'}
        ],
        [
          {name: '未超时', value: '1', group: 'timestatus', checked: false, desc: '未超时'},
          {name: '即将超时', value: '2', group: 'timestatus', checked: false, desc: '即将超时'},
          {name: '已超时', value: '3', group: 'timestatus', checked: false, desc: '已超时'}
        ]
      ],
      // 查询数据
      tableData: [],
      // 表格头部
      tableTitle: [
        {name: 'selection', type: 'selection', label: 'selection', width: '35', checked: true, fixed: ''},
        {
          name: 'TXM',
          label: '条码号',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DELIVERYSTATUSDESC',
          label: '状态',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PRINTSTATUSDESC',
          label: '打印状态',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'ESTIMATETIME',
          label: '预计出报告时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'RPTTYP',
          label: '报告类型',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PATNAME',
          label: '患者姓名',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TARGETLABNAME',
          label: '检测中心',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PANICFLAGDESC',
          label: '危',
          width: '60',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'BIOHAZARDFLAGDESC',
          label: '传染',
          width: '60',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'APPLYNO',
          label: '报告单号',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'REMARK',
          label: '报告备注',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CLINICDESC',
          label: '临床诊断',
          width: '200',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISORDERNAME',
          label: '检测医嘱',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SAMPLEDESCNAME',
          label: '标本说明',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'WARDORREGNAME',
          label: '病人类型',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SEXDESC',
          label: '性别',
          width: '60',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'AGEDESC',
          label: '年龄',
          width: '60',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SAMPLENAME',
          label: '标本类型',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'INSTNAME',
          label: '仪器',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TECHNO',
          label: '样本号',
          width: '60',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CARDNO',
          label: '卡号',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HOSPNO',
          label: '住院号',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'APPLYDEPTNAME',
          label: '申请科室',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'WARDNAME',
          label: '病区',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'BEDNO',
          label: '床号',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'EXECDOCNAME',
          label: '检测人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'EXECTIME',
          label: '检测时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'VERIFIERNAME',
          label: '审核人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'VERIFYDATE',
          label: '审核时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PUBNAME',
          label: '发布人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PUBDATETIME',
          label: '发布时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'APPLYDOCNAME',
          label: '申请人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'APPLYTIME',
          label: '申请时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DRAWUSERNAME',
          label: '采样人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DRAWDATE',
          label: '采样时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'QSRDM',
          label: '签收人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'QSSJ',
          label: '签收时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DELIVERYRXM',
          label: '上传人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DELIVERYTIME',
          label: '上传时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TRANSPORTXM',
          label: '运送人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TRANSPORTTIME',
          label: '运送时间',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        }
      ],
      // 当前选中项
      currentRow: {},
      // 表格多选数据
      selectRows: [],
      // 报告结果
      reportResultList: [],
      // 报告图片
      reportImageList: [],
      // 原始报告PDF
      pdfPath: '',
      // 批量操作结果提示弹窗
      batchOperateResultShow: false,
      // 批量操作结果提示弹窗Title
      batchOperateResultTitle: '',
      //  批量操作结果list
      batchOperateResult: {},
      // 样本跟踪数据
      ybgzSample: {}
    };
  },
  props: {

  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  mounted() {
    this.getInitData();
  },
  methods: {
    /* 获取新的排序，并重置 */
    getNewTableTitle(newTableTitle) {
      this.tableTitle = [];
      this.$nextTick(() => {
        this.tableTitle = JSON.parse(JSON.stringify(newTableTitle));
      });
    },
    /* 初始化 */
    getInitData() {
      dataApi.getInitData().then(Data => {
        if(Data.type == 'SUCCESS') {
          console.log(Data);
          this.jczxList = Data.data.hospitalInfoList || [];
        }
      });
    },
    /* 开始结束时间校验 */
    handleStartTime(val) {
      if(new Date(val).getTime() > new Date(this.form.enddate).getTime()) {
        this.form.enddate = new Date(new Date(val).getFullYear(), new Date(val).getMonth(), new Date(val).getDate(), 23, 59, 59);
        this.$layerUtils.showMessage('开始时间不能大于结束时间', this.$layerUtils.messageType.WARNING);
      }
    },
    handleEndTime(val) {
      if(new Date(val).getTime() < new Date(this.form.begindate).getTime()) {
        this.form.begindate = new Date(new Date(val).getFullYear(), new Date(val).getMonth(), new Date(val).getDate());
        this.$layerUtils.showMessage('结束时间不能小于开始时间', this.$layerUtils.messageType.WARNING);
      }
    },
    /* 底部筛选项操作 */
    filterList(item) {
      if(item.checked) {
        this.form.cusparam.push(item);
      } else {
        let removeIndex = this.form.cusparam.findIndex(val => {
          return val.group == item.group && val.value == item.value;
        });
        this.form.cusparam.splice(removeIndex, 1);
      }
      this.queryList();
    },
    /* 查询 */
    queryList() {
      let logPram = {
        begindate: dateTimeFormat(this.form.begindate),
        enddate: dateTimeFormat(this.form.enddate),
        targetlabcode: this.form.targetlabcode,
        patname: this.form.patname,
        txm: this.form.txm,
        cusparam: this.form.cusparam
      };
      dataApi.getSampleDeliveryQueryList(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.tableData = Data.data || [];
          if(this.tableData.length > 0) {
            this.handleRowClick(this.tableData[0]);
          }
          this.selectRows = [];
        }
      });
    },
    /* 表格单选 */
    handleRowClick(val) {
      this.currentRow = val;
      this.getReportResult(val);
      this.reportImage(val);
      this.getYbqlc(val.TXM);
    },
    /* 获取报告结果 */
    getReportResult(val) {
      let logPram = {
        applyno: val.APPLYNO,
        SAMPLETYPE: '',
        TECHNO: val.TECHNO,
        PATIENTID: val.PATIENTID,
        type: 0
      };
      dataApi.getReportResult(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.reportResultList = Data.data || [];
        } else {
          this.reportResultList = [];
        }
      });
    },
    /* 获取报告图片/pdf仅一个 */
    reportImage(val) {
      let logPram = {
        applyno: val.APPLYNO
      };
      dataApi.reportImage(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.reportImageList = [];
          this.pdfPath = '';
          if(Data.data.imageinfos === null) {
            return false;
          }
          Data.data.imageinfos.forEach(item => {
            if(item.IMAGEFORMAT != 9) {
              this.reportImageList.push(item);
            } else if(item.IMAGEFORMAT == 9) {
              this.pdfPath = item.IMAGEDATA;
            }
          });
        } else {
          this.reportImageList = [];
          this.pdfPath = '';
        }
      });
    },
    /* 获取样本全流程 */
    getYbqlc(txm) {
      let params = {
        txm: txm
      };
      Common.getsampleInfo(params, data => {
        dataHandle(data).then(Data => {
          this.ybgzSample = Data.data;
        });
      });
    },
    /* 表格多选 */
    handleSelectionChange(list) {
      this.selectRows = list;
    },
    /* 发布 */
    releaseReport() {
      if(this.selectRows.length == 0) {
        return false;
      }
    },
    /* 回收 */
    recoveryReport() {
      if(this.selectRows.length == 0) {
        return false;
      }
    },
    /* 打印 */
    printingReport() {
      // if(this.selectRows.length == 0) {
      //   return false;
      // }
      const params = {
        applynolist: [53636966, 53637117, 53637194, 53637211],
        instid: '',
        printmode: 2,
        operatemode: 'BATCH',
        confirmflag: false
      };
      console.log(params);
      Print.reportPrint(params).then(responseMessage => {
        console.log(responseMessage);
        this.batchOperateResult = responseMessage.data.FAILTDETAILLIST;
        if(this.batchOperateResult && this.batchOperateResult.FAILTNUM > 0) {
          this.batchOperateResultShow = true;
          this.batchOperateResultTitle = '批量打印提示';
        }
      });
    },
    /* 继续操作 */
    handleContinueBatchVerify() {
      this.batchOperateResultShow = false;
    },
    /* 关闭 */
    closeBatchResult() {
      this.batchOperateResultShow = false;
    },
    /* 撤销报告下载 */
    cancelDownload() {
      if(this.selectRows.length == 0) {
        return false;
      }
    },
    /* 撤销标本上传 */
    cancelUpload() {
      if(this.selectRows.length == 0) {
        return false;
      }
    },
    /* 下载 */
    upDownReport() {
      if(this.selectRows.length == 0) {
        return false;
      }
    },
    /* 恢复自助打印 */
    recoverySelfPrint() {
      if(this.selectRows.length == 0) {
        return false;
      }
      console.log('恢复自助打印');
    }
  }
};
</script>

<style lang="stylus" scoped>
.red
  color rgb(255, 80, 80)
.yellow
  color #FABF03
.not-allowed
  color #ccc
.sampleDeliveryQuery
  height 100%
  background rgba(255, 255, 255, 0.95)
  overflow-x auto
  .sampleDeliveryQueryBody
    height 100%
    padding 10px
    background rgba(255, 255, 255, 0.95)
    font-size 0
    min-width 980px
  .top
    height 36px
    font-size 12px
    .conditionItem
      display inline-block
      vertical-align middle
      width 185px
      height 36px
      line-height 26px
      margin-right 10px
      .conditionTitle
        color #000
      .baseConditionWisth
        width 120px
    >>>.el-button
      padding 6px
      min-width 60px
    .dataTimeItem
      width 400px
      .datetImeWidth
        width 160px!important
  .contentBody
    height calc(100% - 36px)
    width 100%
    .mainBody
      height 100%
    .left
      width 350px
      background #fff
      border 1px solid #eee
      overflow hidden
      .flexBox
        display flex
        box-orient vertical
        box-direction normal
        flex-direction column
        height 100%
        .titleSetBox
          height 32px
          line-height 32px
          padding 0 5px
          background rgb(242, 242, 242)
          z-index 2001
          .blue
            color rgb(32, 160, 255)
          .setIconBox
            float right
            .setIcon
              display inline-block
              width 24px
              height 24px
              border-radius 12px
              border 2px solid #d4d4d4
              text-align center
              line-height 18px
              font-weight bold
              color #d4d4d4
              cursor no-drop
              font-size 12px
              margin-left 3px
              .setSelect
                width 86px
                background #fff
                border 1px solid #ddd
                top 22px
                left -30px
                text-align center
                display none
                box-shadow 1px 1px 1px #ddd
                p
                  font-size 12px
                  line-height 22px
                  color #000
                  font-weight 500
                p:hover
                  background rgb(32, 160, 255)
                  color #fff
          .canSet
            .setIcon
              border 2px solid #333
              color #333
              cursor pointer
          .canSet .setIcon:hover
            color rgb(32, 160, 255)
            border 2px solid rgb(32, 160, 255)
          .canSet .setIcon.selectIcon:hover .setSelect
            display block
        .tableBox
          display flex
          flex 1
        .filterChecked
          display flex
          background rgb(242, 242, 242)
          padding 3px 0
          .filterItem
            border 2px solid #add8e6
            margin 0 1px
            padding 2px 4px
            >>>.el-checkbox
              margin 2px 4px 2px 0
    .right
      width calc(100% - 350px)
      padding-left 5px
      .rightInforTitle
        height 82px
      .rightInforBody
        height calc(100% - 87px)
        margin-top 5px
    .slider1
      margin-right -4px
</style>
<style lang="stylus">

</style>
