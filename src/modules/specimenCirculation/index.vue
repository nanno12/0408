<!--
* @author w_sh
* @date 2020-02-16
* @module 标本流转
-->
<template>
  <div class="specimenCirculation" v-scroll @click="popoverFilterShow = false" v-loading="loadState"
    element-loading-text="数据获取中">
    <div class="specimenCirculationBody">
      <div class="top">
        <div class="txmInput inlB vm">
          <span class="txmTitle inlB vm" @click="ceshi">扫描条码</span>
          <base-input-support  type="text"
            class="base-input-support vm"
            v-model.trim="codeValue"
            :placeholder="'扫描条形码，添加标本信息'"
            @handleScanEnd="handleBarCode"
            ref='code'
            @focus.native="barcodeFocus"
            @blur.native="barcodeBlur">
          </base-input-support>
        </div>
        <div class="inlB vm inforText mr-5" ref="triggerEl" @click.stop="popoverShow">
          <ellipsis-lable>
            <span class="text">今日外送总量</span>
          </ellipsis-lable>
        </div>
        <el-popover
          ref="popoverInfo"
          placement="bottom"
          width="400"
          trigger="click"
          v-model="popoverFilterShow">
          <today-summary :popoverFilterShow="popoverFilterShow"></today-summary>
        </el-popover>
        <div class="inlB vm inforText" @click="showUserVerify = true">
          <ellipsis-lable>
            <span v-if="workerLogin.userCode == ''" class="text">未验证</span>
            <span v-else class="text">运送人：{{this.workerLogin.userName}}
              <span v-if="this.workerLogin.userPhone">({{this.workerLogin.userPhone}})</span>
            </span>
          </ellipsis-lable>
        </div>
        <user-verify :show.sync="showUserVerify"
          continueuse="true"
          :modalAppendToBody="false"
          @checkValid="checkUserValid">
        </user-verify>
        <div class="btnBox inlB vm">
          <el-button type="primary" @click="uploadList">上传</el-button>
          <el-button @click="cancelUploadList">撤销上传</el-button>
          <el-button @click="exportList">导出</el-button>
          <el-button @click="printList">打印清单</el-button>
          <el-button @click="clearList">清空列表</el-button>
          <el-button @click="setOpen">设置</el-button>
        </div>
      </div>
      <div ref="maxBlock" class="contentBody minBlock re" @mousemove="sliderMove" @mouseup="sliderMoveEnd">
        <div ref="block2" class="left mainBody inlB vt">
          <div class="tableBox">
            <sort-table
            ref="multipleTable"
            :tableData="newTableListArray[typeFlag]"
            :tableTitle="tableTitle"
            :moduleCode="moduleCode"
            :moduleName="moduleName"
            :highlight="true"
            :isheightrow="currentRow"
            :border="false"
            :checkReset="true"
            :checkReseFunc="checkMethod"
            @select-change="handleSelectionChange"
            @select-all="handleSelectionChange"
            @current-change="handleRowClick"
            @getNewTableTitle="getNewTableTitle">
              <template v-for="(item)  in tableTitle">
                <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :fixed="item.fixed" :key="item.name"></vxe-table-column>
                <!-- 检测中心 -->
                <vxe-table-column
                  v-else-if="item.name == 'TARGETHOSPITALNAME'"
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
                    <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                      <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                    </span>
                  </template>
                  <!-- 内容自定义 -->
                  <template slot-scope="scope">
                    <span class="inlB re jczxSet">
                      <span class="jczxText inlB">
                        <ellipsis-lable>
                          <span>{{scope.row.TARGETHOSPITALNAME}}</span>
                        </ellipsis-lable>
                      </span>
                      <i v-if="scope.row.SCANTATUS != 1" class="iconfont icon-more1 iconColor ab" @click="jczxListShow(scope.$rowIndex)"></i>
                    </span>
                  </template>
                </vxe-table-column>
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
                    <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                      <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                    </span>
                  </template>
                  <!-- 内容自定义 -->
                  <template slot-scope="scope">
                    <span :class="{'green' : scope.row.DELIVERYSTATUS != 0}">{{scope.row.DELIVERYSTATUSDESC}}</span>
                  </template>
                </vxe-table-column>
                <!-- 异常信息 -->
                <vxe-table-column
                  v-else-if="item.name == 'FAILUREREASON'"
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
                    <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                      <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                    </span>
                  </template>
                  <!-- 内容自定义 -->
                  <template slot-scope="scope">
                    <span v-if="scope.row.DELIVERYCODE == 1 || scope.row.DELIVERYCODE == 3" @click.stop="failtReasonShow(scope.row)" class="failtText">{{scope.row.FAILUREREASON}}</span>
                    <span v-else class="">{{scope.row.FAILUREREASON}}</span>
                  </template>
                </vxe-table-column>
                <!-- 条形码 -->
                <vxe-table-column
                  v-else-if="item.name == 'TXM'"
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
                    <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                      <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                    </span>
                  </template>
                  <!-- 内容自定义 -->
                  <template slot-scope="scope">
                    <span :class="[scope.row.MJZBZ == 1 ? 'red' : '', scope.row.BIOHAZARDFLAG == 1 ? 'yellow' : '']">{{scope.row.TXM}}</span>
                  </template>
                </vxe-table-column>
                <!-- 设置项 -->
                <vxe-table-column
                  v-else-if="item.name == 'SET'"
                  :sortable="item.sortable"
                  :fixed="item.fixed"
                  :field="item.name"
                  :title="item.label"
                  :show-header-overflow="true"
                  :show-overflow="true"
                  align="center"
                  :width="item.width"
                  :key="item.name">
                  <!-- 表头自定义 -->
                  <template slot="header" slot-scope="{ column }">
                    <span>{{ column.title }}</span>
                    <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                      <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
                    </span>
                  </template>
                  <!-- 内容自定义 -->
                  <template slot-scope="scope">
                    <div class="setBox">
                      <span class="text-btn" :class="[scope.row.SCANTATUS == 5 ? '' : 'not-allowed']" v-if="scope.row.DELIVERYSTATUS == 0 || scope.row.SCANTATUS == 1" @click.stop="uploadItem(scope.row)">上传</span>
                      <span class="text-btn" v-if="scope.row.DELIVERYSTATUS == 10 || scope.row.DELIVERYSTATUS == 20 || scope.row.DELIVERYSTATUS == 50" @click.stop="cancelUploadItem(scope.row)">撤销</span>
                      <span class="text-btn" :class="[scope.row.SCANTATUS == 5 ? '' : 'not-allowed']" @click="printItem(scope.row)">打印</span>
                      <el-popover
                        placement="bottom-start"
                        trigger="hover"
                        class="item-name-popover">

                        <div class="specimenCirculationTableSetBtn" @click="setMjzbz(scope.row, scope.$rowIndex)">
                          <span v-if="scope.row.MJZBZ == 0">置为加急</span>
                          <span v-else>置为常规</span>
                        </div>
                        <div class="specimenCirculationTableSetBtn" @click="openChangeInfor(scope.row)">
                          <span>修改标本说明</span>
                        </div>

                        <i class="iconfont icon-more" slot="reference"></i>
                      </el-popover>
                    </div>
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
          <div class="tableStatistics">
            <ul class="statisticsBox">
              <li
              v-for="(item, index) in tableFilterData"
              :key="index"
              :class="{active : typeFlag == item.key}"
              @click="typeChange(item.key)"
              >
                {{item.name}}
                <span class="bold" :class="item.class">({{item.length}})</span>
              </li>
            </ul>
          </div>
        </div>
        <div ref="block3" class="right mainBody inlB vt">
          <right-infor-body :selectCurrentRow="currentRow" :phonemap="phonemap" :sampleItemsList="sampleItemsList"
          @setLoadState="setLoadState"></right-infor-body>
        </div>
        <div ref="slider2" @mousedown="(e) => {sliderMoveStart(e, 2)}" class="slider slider2 ab"></div>
      </div>
    </div>
    <!-- 参数设置 -->
    <el-dialog
      title="参数设置"
      size="tiny"
      :modal-append-to-body="false"
      :before-close="setClose"
      :modal="false"
      :width="370"
      :max-height="186"
      :top="'25%'"
      class="publicDialog"
      :visible.sync="setShow"
      >
      <div class="setBody">
        <div class="checkBox" :class="[index%2 == 0 ? 'pl-20' : 'mb-15']" v-for="(item, index) in setListData[0].children" :key="index">
          <el-checkbox v-model="item.VALUE" true-label="1" false-label="0" @change="checkedChange(index, item)">{{item.PARAMNAME}}</el-checkbox>
        </div>
      </div>
      <div class="dialogBottom">
        <el-button @click="confirmSet" type="primary">确 定</el-button>
        <el-button @click="setClose">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 修改标本说明 -->
    <el-dialog
      title="修改标本说明"
      size="tiny"
      :modal-append-to-body="false"
      :before-close="changeClose"
      :modal="false"
      :width="370"
      :max-height="154"
      :top="'25%'"
      class="publicDialog"
      :visible.sync="changeShow"
      >
      <div class="setBody">
        <el-autocomplete
          style="width:100%;"
          v-model="changeInfor.CODE"
          custom-item="base-auto-item"
          :item-list="changeInforList"
          @select="handleCurrentItem"
          placeholder="请输入内容"
        ></el-autocomplete>
      </div>
      <div class="dialogBottom">
        <el-button @click="confirmChange" type="primary">确 定</el-button>
        <el-button @click="changeClose">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 检测中心切换 -->
    <set-jczx
      :setJczxShow.sync="setJczxShow"
      :organList="organList"
      @rowClick="rowClick"
    ></set-jczx>
    <!-- 选择原因组件 -->
    <select-reason
      :show.sync="reasonShow"
      v-model="reasonListText"
      :modal-append-to-body="false"
      :dic-type="dicType"
      :modal="true"
      :move="true"
      :is-empty="false"
      @confirm="certainBtn"
      :list-title="listTitle"
      :title="dialogTitle">
    </select-reason>
    <!-- 多信息提示框 -->
    <message-list
      :show.sync="messageLisShow"
      @keepOn="keepOnSet"
      :listData="listDataMessage">
    </message-list>
  </div>
</template>
<script>
import dataApi from './api/api.js';
import Common from '@/app/api/common.js';
import autoResize from '@/app/components/autoResize';
import { specimenCirculation } from '@/app/utils/tableName';
import rightInforBody from './components/rightInforBody';
// import projectMatching from './components/projectMatching';
import userVerify from '@/app/components/dialog/UserVerify.vue';
import { setEelementSelect } from '@/app/utils/vdom';
import setJczx from '@/app/components/dialog/setJczx.vue';
import httpUtils from '@techCommon/utils/httpUtils';
import Print from '@/app/utils/printUtils';
import messageList from '@/app/components/dialog/messageList';
import selectReason from '@/app/components/dialog/selectReason.vue';

export default {
  mixins: [autoResize],
  components: {
    rightInforBody,
    // projectMatching,
    userVerify,
    setJczx,
    selectReason,
    messageList
  },
  data() {
    return {
      // 数据加载状态
      loadState: false,
      // 扫条码
      codeValue: '',
      // 表格头部
      tableTitle: [
        {name: 'selection', type: 'selection', label: 'selection', width: '35', checked: true, fixed: 'left'},
        {
          name: 'TARGETHOSPITALNAME',
          label: '检测中心',
          width: '110',
          checked: true,
          fixed: 'left',
          sortable: true
        },
        {
          name: 'DELIVERYSTATUSDESC',
          label: '上传状态',
          width: '110',
          checked: true,
          fixed: 'left',
          sortable: true
        },
        {
          name: 'FAILUREREASON',
          label: '异常信息',
          width: '110',
          checked: true,
          fixed: 'left',
          sortable: true
        },
        {
          name: 'CLINICDESC',
          label: '临床诊断',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TXM',
          label: '条码号',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TXMSTATUSDESC',
          label: '标本状态',
          width: '90',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PATNAME',
          label: '姓名',
          width: '70',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'WARDORREGNAME',
          label: '病人类型',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SEXDESC',
          label: '性别',
          width: '40',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'AGEDESC',
          label: '年龄',
          width: '70',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SAMPLENAME',
          label: '标本种类',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'LISORDERNAME',
          label: '项目',
          width: '200',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'LISORDERCODE',
          label: '项目代码',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'DRAWDATE',
          label: '采样时间',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'BAREXAMNAME',
          label: '条码分组',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CXSJ',
          label: '绑定时间',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'APPLYDOCNAME',
          label: '申请医生',
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
          name: 'CARDNO',
          label: '磁卡号',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CURENO',
          label: '病员号',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'INVOICENO',
          label: '发票号',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'WARDNAME',
          label: '病区名称',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'BEDNO',
          label: '床号',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CXRXM',
          label: '抽血人',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CXPCNAME',
          label: '绑定电脑',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SET',
          label: '操作',
          width: '125',
          checked: true,
          fixed: 'right',
          sortable: true
        }
      ],
      // 当前选中的对象
      currentRow: {},
      // 表格多选数据
      selectRows: [],
      // 列表数据
      dataList: [],
      // 筛选数据
      filterList: [],
      // 模块Code
      moduleCode: specimenCirculation.txmdata.moduleCode,
      // 模块name
      moduleName: specimenCirculation.txmdata.moduleName,
      // 今日汇总信息弹窗
      popoverFilterShow: false,
      // 用户验证弹窗
      showUserVerify: false,
      // 用户信息
      workerLogin: {
        userCode: '',
        userName: '',
        userId: '',
        userPhone: ''
      },
      // 电话信息
      phonemap: {},
      // 医嘱详情
      sampleItemsList: [],
      // 表格底部筛选，下标, -1表示全部
      typeFlag: 'all',
      // 表格底部数据
      tableFilterData: [
        {
          name: '全部',
          key: 'all',
          class: '',
          length: 0
        },
        {
          name: '未上传',
          key: 'noUpload',
          class: '',
          length: 0
        },
        {
          name: '已上传',
          key: 'alreadyUpload',
          class: '',
          length: 0
        },
        {
          name: '失败',
          key: 'fail',
          class: 'red',
          length: 0
        },
        {
          name: '加急',
          key: 'urgent',
          class: 'red',
          length: 0
        },
        {
          name: '传染',
          key: 'contagion',
          class: 'yellow',
          length: 0
        }
      ],
      // 对象重组
      newTableListArray: {
        all: [],
        noUpload: [],
        alreadyUpload: [],
        fail: [],
        urgent: [],
        contagion: []
      },
      // 扫码队列
      sampleQueue: [],
      // 当前执行的代码
      thisCode: '',
      // 队列结束标记
      sampleQueueEnd: true,
      // 设置弹框显示标记
      setShow: false,
      // 设置信息
      setData: {
        scanselection: '',
        sendprint: '',
        scanupload: ''
      },
      // 设置渲染数组
      setListData: [
        [
          {
            children: []
          }
        ]
      ],
      // 检测中心下拉数据
      organList: [],
      // 检测中心切换弹窗
      setJczxShow: false,
      // 修改检测中心下标
      changeJczxIndex: -1,
      // 修改标本说明
      changeShow: false,
      // 修改标本说明下拉数据
      changeInforList: [],
      // 修改的信息
      changeInfor: {
        CODE: '',
        NAME: ''
      },
      // 修改的标本
      thisSample: {},
      // 选择原因弹窗
      reasonShow: false,
      // 选则的原因字符串
      reasonListText: '',
      // 字典查询，保存
      dicType: '撤销上传原因',
      // 列表title
      listTitle: '常用原因列表',
      // 原因弹窗 title
      dialogTitle: '撤销上传原因',
      // 撤销上传选中数据
      cancelList: [],
      // 多信息弹窗
      messageLisShow: false,
      // 失败信息提示
      listDataMessage: {
        title: '异常信息提醒',
        subtitle: '',
        messagedate: []
      }
    };
  },
  props: {

  },
  computed: {

  },
  watch: {

  },
  created() {
    this.$nextTick(()=>{
      this.$refs.popoverInfo.referenceElm = this.$refs.triggerEl;
    });
  },
  mounted() {
    this.barcodeFocus();
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
          this.setData = {
            scanselection: Data.data.scanSelection,
            sendprint: Data.data.sendPrint,
            scanupload: Data.data.scanUpload
          };
          this.organList = Data.data.hospitalInfoList || [];
        }
      });
    },
    /* 今日汇总信息展示 */
    popoverShow() {
      this.popoverFilterShow = !this.popoverFilterShow;
    },
    /* 用户验证信息返回 */
    checkUserValid(val) {
      console.log(val);
      if (val.type == 'NOTVERIFY') {
        return false;
      }
      this.workerLogin = {
        userCode: val.data.logcode,
        userName: val.data.username,
        userId: val.data.userid,
        userPhone: val.data.mobilephone
      };
    },
    /* barcodeBlur */
    barcodeBlur() {

    },
    /* barcodeFocus */
    barcodeFocus() {
      setEelementSelect(this.$refs.code.$el);
    },
    ceshi() {
      let aaa = ['2699025286', '3000141227', '3100000038', '13000000PO', '1613382039', '3200000058', '1900000059', '2200000061', '1900000063'];
      let aa = 0;
      let aaaa = setInterval(() =>{
        this.pushList(aaa[aa]);
        aa += 1;
        if(aa == 9) {
          clearInterval(aaaa);
        }
      }, 20);
    },
    /* 扫条码 */
    handleBarCode() {
      if (this.codeValue.trim() === '') {
        this.$layerUtils.showMessage('条码不能为空', this.$layerUtils.messageType.WARNING);
        return;
      }
      setEelementSelect(this.$refs.code.$el);
      this.pushList(this.codeValue);
    },
    /* 条码添加队列 */
    pushList(codeValue) {
      // 队列里找到就不继续添加
      let findeFlag = this.sampleQueue.findIndex(item => {
        return item == codeValue;
      });
      if(findeFlag > -1) {
        this.$layerUtils.showMessage('该条码已存在队列，待执行', this.$layerUtils.messageType.WARNING);
        return false;
      }
      // 列表里找
      let dataFlag = this.dataList.findIndex(item => {
        return item && item.TXM == codeValue;
      });
      // 找不到的添加默认的
      if(dataFlag < 0) {
        let items =  {
          TXM: codeValue,
          DELIVERYSTATUS: 0
        };
        this.dataList.unshift(items);
      }
      this.sampleQueue.unshift(codeValue);
      // console.log(this.sampleQueue);
      this.filterData();
      if(this.sampleQueueEnd) {
        this.thisCode = codeValue;
        this.getInforList();
        this.sampleQueueEnd = false;
      }
    },
    /* 执行队列 */
    runList() {
      this.sampleQueue.splice(this.sampleQueue.length - 1, 1);
      if(this.sampleQueue.length > 0) {
        this.thisCode = this.sampleQueue[this.sampleQueue.length - 1];
        this.getInforList();
      } else {
        this.sampleQueueEnd = true;
      }
    },
    /* 获取信息数据 */
    getInforList() {
      let logPram = {
        txm: this.thisCode,
        carriercode: this.workerLogin.userCode,
        carriername: this.workerLogin.userName
      };
      dataApi.getSampleDeliveryList(logPram).then(Data => {
        // if(Data.type == 'SUCCESS') {
        let dataFlag = this.dataList.findIndex(item => {
          return item && item.TXM == this.thisCode;
        });
        this.dataList.splice(dataFlag, 1);
        this.dataList.unshift(Data.data.samplelist[0]);
        this.currentRow = this.dataList[0];
        this.phonemap = Data.data.phonemap || {};
        this.sampleItemsList = Data.data.sampleItemsList || [];
        // console.log(this.dataList);
        this.typeFlag = 'all';
        if(this.setData.scanselection && this.currentRow.SCANTATUS == 5) {
          console.log('扫码即勾选');
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(this.currentRow);
          });
        }
        // }
        this.filterData();
      }).finally(() => {
        this.runList();
      });
    },
    /* checkBox禁用 */
    checkMethod(row) {
      return row.SCANTATUS == 5;
    },
    /* 数据筛选处理 */
    filterData() {
      this.newTableListArray = {
        all: [],
        noUpload: [],
        alreadyUpload: [],
        fail: [],
        urgent: [],
        contagion: []
      };
      this.dataList.forEach((item) => {
        if(item.BIOHAZARDFLAG == 1) {
          this.newTableListArray.contagion.push(item);
        }
        if(item.MJZBZ == 1) {
          this.newTableListArray.urgent.push(item);
        }
        if(item.DELIVERYSTATUS == 10 || item.DELIVERYSTATUS == 20 || item.DELIVERYSTATUS == 50) {
          this.newTableListArray.alreadyUpload.push(item);
        } else if(item.DELIVERYSTATUS == 0) {
          this.newTableListArray.noUpload.push(item);
        }
        if(item.DELIVERYCODE == 1 || item.DELIVERYCODE == 3) {
          this.newTableListArray.fail.push(item);
        }
      });
      this.newTableListArray.all = this.dataList;
      this.tableFilterData.forEach((item) => {
        item.length = this.newTableListArray[item.key].length;
      });
    },
    /* handleRowClick */
    handleRowClick(val) {
      this.currentRow = val;
      console.log(this.currentRow);
      this.getAcceptitemsbyOrdernoList(val);
      this.getPhone(val);
    },
    /* 表格多选 */
    handleSelectionChange(rows) {
      this.selectRows = rows;
      console.log(this.selectRows);
    },
    /* 获取医嘱 */
    getAcceptitemsbyOrdernoList(val) {
      let logPram = {
        TXM: val.TXM
      };
      dataApi.getAcceptitemsbyOrdernoList(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.sampleItemsList = Data.data || [];
        } else {
          this.sampleItemsList = [];
        }
      });
    },
    /* 获取联系方式 */
    getPhone(val) {
      let logPram = {
        ward: val.WARD,
        applydeptcode: val.APPLYDEPTCODE,
        applydoccode: val.APPLYDOCCODE
      };
      Common.getPhone(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.phonemap = {
            PATNAME: val.PATNAME,
            PATIENTPHONE: val.M_PHONE,
            APPLYDEPTNAME: val.APPLYDEPTNAME,
            APPLYDEPTPHONE: Data.data.APPLYDEPTPHONE || '',
            WARDNAME: val.WARDNAME,
            WARDPHONE: Data.data.WARDPHONE || '',
            APPLYDOCNAME: val.APPLYDOCNAME,
            APPLYDOCPHONE: Data.data.APPLYDOCPHONE || ''
          };
        } else {
          this.phonemap = {};
        }
      });
    },
    /* 底部状态切换 */
    typeChange(index) {
      this.typeFlag = index;
    },
    /* 清空列表 */
    clearList() {
      this.dataList = [];
      this.newTableListArray = {
        all: [],
        noUpload: [],
        alreadyUpload: [],
        fail: [],
        urgent: [],
        contagion: []
      };
      this.tableFilterData.forEach((item) => {
        item.length = 0;
      });
      this.currentRow = {};
      this.phonemap = {};
      this.sampleItemsList = [];
      this.selectRows = [];
    },
    /* 设置弹窗开启 */
    setOpen() {
      dataApi.getParameterList().then(Data => {
        if(Data.type == 'SUCCESS') {
          this.setShow = true;
          this.setListData = Data.data.paramlist;
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 设置确认 */
    confirmSet() {
      let logPram = {
        paramlist: this.setListData
      };
      dataApi.updateSetting(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.getInitData();
          this.setClose();
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 设置弹窗关闭 */
    setClose() {
      this.setShow = false;
    },
    /* 设置修改 */
    checkedChange(index, item) {
      if(item.VALUE == 1 && index == 0) {
        this.setListData[0].children[1].VALUE = 0;
      }
      if(item.VALUE == 1 && index == 1) {
        this.setListData[0].children[0].VALUE = 0;
      }
    },
    /* 检测中心弹窗展示 */
    jczxListShow(index) {
      this.changeJczxIndex = index;
      this.setJczxShow = true;
    },
    /* 检测中心切换 */
    rowClick(val) {
      console.log(val);
      let logPram = {
        txm: this.currentRow.TXM,
        targethospitalcode: val.CODE
      };
      dataApi.setTargethospital(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.dataList.splice(this.changeJczxIndex, 1, Data.data[0]);
          this.currentRow = Data.data[0];
          this.$layerUtils.showMessage('检测中心修改成功', this.$layerUtils.messageType.SUCCESS);
          // this.filterData();
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 设置门急诊标志 */
    setMjzbz(val) {
      let logPram = {
        txm: val.TXM,
        mjzbz: val.MJZBZ
      };
      dataApi.updateMjzbz(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          val.MJZBZ = val.MJZBZ == 1 ? 0 : 1;
          if(val.TXM == this.currentRow.TXM) {
            this.getAcceptitemsbyOrdernoList(val);
          }
          this.filterData();
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 打开修改标本说明，获取下拉数据 */
    openChangeInfor(val) {
      console.log(val);
      this.changeInfor.CODE = JSON.parse(JSON.stringify(val.SAMPLEDESCCODE));
      this.thisSample = val;
      this.changeShow = true;
      let logPram = {
        classcode: '标本说明'
      };
      Common.getSlavebyClassCode(logPram, Data => {
        if(Data.type == 'SUCCESS') {
          this.changeInforList = Data.data || [];
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 标本说明选择 */
    handleCurrentItem(val) {
      this.changeInfor.NAME = val.NAME;
    },
    /* 修改标本说明确定 */
    confirmChange() {
      let logPram = {
        orderno: this.thisSample.ORDERNO,
        code: this.changeInfor.CODE,
        name: this.changeInfor.NAME
      };
      dataApi.updateSampleDesc(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          console.log(22);
          this.thisSample.SAMPLEDESCCODE = JSON.parse(JSON.stringify(this.changeInfor.CODE));
          this.thisSample.SAMPLEDESCNAME = JSON.parse(JSON.stringify(this.changeInfor.NAME));
          this.$layerUtils.showMessage('修改标本说明成功', this.$layerUtils.messageType.SUCCESS);
          this.changeClose();
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      });
    },
    /* 修改标本说明取消 */
    changeClose() {
      this.changeShow = false;
    },
    /* 批量上传 */
    uploadList() {
      if(this.selectRows.length == 0) {
        this.$layerUtils.showMessage('请选择需要上传的标本', this.$layerUtils.messageType.WARNING);
        return false;
      }
      this.upLoad(this.selectRows);
    },
    /* 单个上传 */
    uploadItem(row) {
      if(row.SCANTATUS != 5) {
        return false;
      }
      this.upLoad([row], false);
      // if(this.setData.sendprint) {
      //   this.toPrint([row]);
      // }
    },
    /* 上传 */
    upLoad(list, flag = true) {
      // flag 用于控制单个条码上传，不自动打印
      let logPram = {
        samplelist: list,
        carriercode: this.workerLogin.userCode,
        carriername: this.workerLogin.userName
      };
      this.loadState = true;
      console.log(logPram);
      dataApi.batchSampleDelivery(logPram).then(Data => {
        this.dataUpdate(Data.data.samplelist || []);
        if(this.setData.sendprint && flag) {
          console.log(1111);
          this.toPrint(Data.data.samplelist || []);
        }
        if(Data.type != 'SUCCESS') {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.SUCCESS);
        }
      }).finally(() => {
        this.loadState = false;
      });
    },
    /* 批量撤销上传 */
    cancelUploadList() {
      if(this.selectRows.length == 0) {
        this.$layerUtils.showMessage('请选择需要撤销上传的标本', this.$layerUtils.messageType.WARNING);
        return false;
      }
      this.reasonShow = true;
      this.cancelList = this.selectRows;
    },
    /* 单个撤销上传 */
    cancelUploadItem(row) {
      this.reasonShow = true;
      this.cancelList = [row];
    },
    /* 选择原因确定返回 */
    certainBtn(list) {
      console.log(list, this.reasonListText);
      this.cancelUpload();
    },
    /* 撤销上传 */
    cancelUpload() {
      let logPram = {
        samplelist: this.cancelList,
        cancelreason: this.reasonListText
      };
      console.log(logPram);
      this.loadState = true;
      dataApi.revokehandleSampleDelivery(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.dataUpdate(Data.data.samplelist || []);
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.SUCCESS);
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      }).finally(() => {
        this.loadState = false;
      });
    },
    /* 数据更新 */
    dataUpdate(list) {
      let subIndex = -1;
      list.forEach(listItem => {
        subIndex = this.dataList.findIndex(item => {
          return item.TXM == listItem.TXM;
        });
        this.dataList.splice(subIndex, 1, listItem);
      });
      this.filterData();
    },
    /* 导出 */
    exportList() {
      if(this.selectRows.length == 0) {
        this.$layerUtils.showMessage('请选择需要导出的标本', this.$layerUtils.messageType.WARNING);
        return false;
      }
      let logPram = {
        samplelist: this.selectRows
      };
      this.loadState = true;
      dataApi.outData(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          console.log(Data);
          let url = dataApi.getUrl() + Data.message;
          this.downLoadFile(url);
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      }).finally(() => {
        this.loadState = false;
      });
    },
    /* 下载到本地 */
    downLoadFile(url) {
      let jwt = httpUtils.GetUrlQueryParam('jwt');
      let newUrl = url + '&' + 'jwt=' + jwt;
      let link = document.createElement('a');
      link.href = newUrl;
      link.click();
      return;
    },
    /* 单条打印 */
    printItem(row) {
      if(row.SCANTATUS != 5) {
        return false;
      }
      this.toPrint([row]);
    },
    /* 批量打印 */
    printList() {
      this.toPrint(this.selectRows);
    },
    /* 打印清单 */
    toPrint(rows) {
      if(rows.length == 0) {
        this.$layerUtils.showMessage('请选择需要打印的标本', this.$layerUtils.messageType.WARNING);
        return false;
      }
      Print.basePrint(rows, '标本外送汇总单.frx');
    },
    /* 设置加载状态 */
    setLoadState(val) {
      this.loadState = val;
    },
    /* 展示上传失败原因 */
    failtReasonShow(row) {
      this.listDataMessage.subtitle = `条码【${row.TXM}】上传失败`;
      this.listDataMessage.messagedate = row.FAILUREREASONDESC || [];
      this.messageLisShow = true;
    },
    /* 上传失败继续操作,暂无操作，方法保留 */
    keepOnSet() {
    }
  }
};
</script>

<style lang="stylus" scoped>
.red
  color rgb(255, 80, 80)
.yellow
  color #FABF03
.iconColor
  color rgb(63, 158, 255)
.green
  color #0dd00d
.not-allowed
  color #ccc
.specimenCirculation
  height 100%
  background rgba(255, 255, 255, 0.95)
  overflow-x auto
  .specimenCirculationBody
    height 100%
    padding 10px
    background rgba(255, 255, 255, 0.95)
    font-size 0
    min-width 980px
  .top
    height 36px
    .txmInput
      width 250px
      .txmTitle
        width 64px
        text-align right
        color #000
    .inforText
      width 13%
      text-align center
      >>>.el-tooltip
        height 18px
      .text
        font-weight bold
        text-decoration underline
        color rgb(78, 101, 255)
        cursor pointer
      .text:hover
        opacity 0.8
    .btnBox
      min-width 436px
      height 26px
      width calc(74% - 255px)
      text-align right
  .contentBody
    height calc(100% - 36px)
    width 100%
    .mainBody
      height 100%
    .left
      width calc(100% - 280px)
      background #fff
      border 1px solid #eee
      .tableBox
        height calc(100% - 30px)
        width 100%
        .jczxSet
          width 100%
          .jczxText
            width calc(100% - 20px)
          .icon-more1
            display none
        .failtText
          font-size 14px
          font-weight bold
          text-decoration underline
          cursor pointer
          color #f00
        .failtText:hover
          opacity 0.8
        .setBox
          .text-btn
            text-decoration underline
            cursor pointer
          .text-btn:hover
            opacity 0.8
      .tableStatistics
        height 30px
        padding-left 5px
        .statisticsBox
          li
            display inline-block
            height 30px
            line-height 30px
            margin-right 8px
            cursor pointer
            .red
              color rgb(255, 80, 80)
            .violet
              color #FABF03
          .active
            font-weight bold
            color #005fed
            border-bottom 2px solid #005fed
    .right
      width 280px
      padding-left 5px
    .slider2
      margin-right -4px
.base-input-support
  width calc(100% - 78px)
  padding 3px 10px
  outline none
  height 26px
  border-radius 2px
  border: 1px solid rgb(191, 203, 217)
  box-sizing border-box
  color rgb(31, 45, 61)
  font-size 14px
  font-weight 700
  min-width 170px
  &:focus
    border-color #20a0ff
    box-shadow 0 0 1px 1px #20a0ff
  &::placeholder
    font-size: 12px;
    font-weight 400
.publicDialog .setBody
  .checkBox
    width 48%
    display inline-block
    .el-checkbox__input
      vertical-align middle
    .el-checkbox__label
      vertical-align middle
</style>
<style lang="stylus">
.specimenCirculation
  .top .inforText .el-tooltip
    height 14px
  .top .el-button
    padding 6px
    min-width 60px
.el-popover
  .specimenCirculationTableSetBtn
    padding-left 10px
    height 26px
    line-height 26px
    displsy block
    cursor pointer
  .specimenCirculationTableSetBtn:hover
    color #fff
    background rgb(63, 158, 255)
.row--hover .icon-more1
  display inline-block !important

</style>
