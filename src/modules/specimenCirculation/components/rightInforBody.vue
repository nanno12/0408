<!--
* @author w_sh
* @date 2020-02-16
* @module 右侧信息
-->
<template>
  <div class="rightInforBody">
    <div class="bold txmText">
      条形码:
      <span class="underLine" @click="showYbgzDialog(selectCurrentRow.TXM)">{{selectCurrentRow.TXM}}</span>
    </div>
    <div class="inforBox">
      <div class="inforTitle">患者卡片</div>
      <div class="inforBody">
        <div class="patientInfor">
          <span class="name mr-10">{{selectCurrentRow.PATNAME}}</span>
          <span class="sex mr-10">{{selectCurrentRow.SEXDESC}}</span>
          <span class="year">{{selectCurrentRow.AGEDESC}}</span>
          <span class="fr ml-10" v-if="selectCurrentRow.BIOHAZARDFLAG == 1"><i class="iconfont icon-chuanran"></i></span>
          <span class="fr" v-if="selectCurrentRow.MJZBZ == 1"><i class="iconfont icon-weiji"></i></span>
        </div>
        <div class="patientInforList">
          <p>
            <ellipsis-lable>
              <span class="leftKey">磁卡号：</span>
              <span>{{selectCurrentRow.CARDNO}}</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">病原号：</span>
              <span>{{selectCurrentRow.CURENO}}</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">医嘱：</span>
              <span>{{selectCurrentRow.LISORDERNAME}}</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">诊断：</span>
              <span>{{selectCurrentRow.CLINICDESC}}</span>
            </ellipsis-lable>
          </p>
        </div>
      </div>
    </div>
    <div class="inforBox">
      <div class="inforTitle">联系方式</div>
      <div class="inforBody">
        <div class="patientInforList">
          <p>
            <ellipsis-lable>
              <span class="leftKey">患者：</span>{{phonemap.PATNAME}}<span class="red" v-if="phonemap.PATIENTPHONE">({{phonemap.PATIENTPHONE}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">科室：</span>{{phonemap.APPLYDEPTNAME}}<span  class="red" v-if="phonemap.APPLYDEPTPHONE">({{phonemap.APPLYDEPTPHONE}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">病区：</span>{{phonemap.WARDNAME}}<span  class="red" v-if="phonemap.WARDPHONE">({{phonemap.WARDPHONE}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="leftKey">医生：</span>{{phonemap.APPLYDOCNAME}}<span  class="red" v-if="phonemap.APPLYDOCPHONE">({{phonemap.APPLYDOCPHONE}})</span>
            </ellipsis-lable>
          </p>
        </div>
      </div>
    </div>
    <div class="inforBox tableBox">
      <div class="inforTitle">医嘱详情</div>
      <div class="inforBody tableBody">
        <sort-table
        ref="multipleTable"
        :tableData="sampleItemsList"
        :tableTitle="tableTitle"
        :moduleCode="moduleCode"
        :moduleName="moduleName"
        :highlight="true"
        :isheightrow="currentRow"
        :border="false"
        @current-change="handleRowClick"
        @getNewTableTitle="getNewTableTitle">
          <template v-for="(item)  in tableTitle">
            <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :key="item.name"></vxe-table-column>
            <!-- 确认状态 -->
            <vxe-table-column
              v-else-if="item.name == 'STATUSESC'"
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
                <span :class="scope.row.STATUS==='1' ? 'b-color':scope.row.STATUS==='' ?'':'r-color'">{{scope.row.STATUSESC}}</span>
              </template>
            </vxe-table-column>
            <!-- 收费状态 -->
            <vxe-table-column
              v-else-if="item.name == 'CHARGEFLAGESC'"
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
                <span :class="scope.row.CHARGEFLAG==='1' ? 'b-color':scope.row.CHARGEFLAG==='' ?'':'r-color'">{{scope.row.CHARGEFLAGESC}}</span>
              </template>
            </vxe-table-column>
            <!-- 门急诊标志 -->
            <vxe-table-column
              v-else-if="item.name == 'MJZBZ'"
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
                <span :class="scope.row.MJZBZ =='加急' ? 'r-color':''">{{scope.row.MJZBZ}}</span>
              </template>
            </vxe-table-column>
            <!-- 项目代码 -->
             <vxe-table-column
              v-else-if="item.name == 'HISORDERCODE'"
              :sortable="item.sortable"
              :fixed="item.fixed"
              :field="item.name"
              :title="item.label"
              :show-header-overflow="true"
              :show-overflow="true"
              :width="item.width"
              align="center"
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
                <span class="bar-color font-color" :class="[scope.row.iswhite?'is-white':'']" :style="{background:`rgb(${scope.row.ORDERCOLOR})`}" v-if="scope.row.ORDERCOLOR">{{scope.row.HISORDERCODE}}</span>
                <span class="bar-color border-none" v-else>{{scope.row.HISORDERCODE}}</span>
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
    </div>
    <!-- 样本跟踪弹窗 -->
    <el-dialog :visible.sync="ybgzDialogShow" size="large" top="10%" class="ybgz-dialog" @open="ybgzInit"
               :modal-append-to-body="false">
      <ybgz-dialog></ybgz-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { specimenCirculation } from '@/app/utils/tableName';
import Common from '@/app/api/common';
import dataHandle from 'app/utils/dataHandle';
import ybgzDialog from '@/app/components/dialog/sampleTrack.vue';

export default {
  components: {
    ybgzDialog
  },
  data() {
    return {
      // 表格头部
      tableTitle: [
        {
          name: 'STATUSESC',
          label: '确认状态',
          width: '90',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CHARGEFLAGESC',
          label: '收费状态',
          width: '90',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'MJZBZ',
          label: '门急诊标志',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISORDERNAME',
          label: '医嘱名称',
          width: '200',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISORDERCODE',
          label: '项目代码',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TXMSTATUSDESC',
          label: '条码状态',
          width: '90',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'PRICE',
          label: '价格',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'XMSL',
          label: '数量',
          width: '80',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'ENTRUST',
          label: '嘱托',
          width: '150',
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
          name: 'LISORDERCODE',
          label: 'LIS代码',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'EXECDEPTNAME',
          label: '执行科室',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        }
      ],
      // 当前选中的对象
      currentRow: {},
      // 模块Code
      moduleCode: specimenCirculation.txmdata.moduleCode,
      // 模块name
      moduleName: specimenCirculation.txmdata.moduleName,
      // 样本跟踪信息弹窗显示标记
      ybgzDialogShow: false
    };
  },
  props: {
    // 选中的病人信息
    selectCurrentRow: Object,
    // 联系方式
    phonemap: Object,
    // 医嘱详情
    sampleItemsList: Array
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
    /* 获取新的排序，并重置 */
    getNewTableTitle(newTableTitle) {
      this.tableTitle = [];
      this.$nextTick(() => {
        this.tableTitle = JSON.parse(JSON.stringify(newTableTitle));
      });
    },
    /* 打开后出触发样本初始化 */
    ybgzInit() {
      setTimeout(() => {
        this.$root.eventHub.$emit('bgsh/ybgzDialog', this.ybgzSample);
      }, 0);
    },
    /* 打开样本跟踪弹框 */
    showYbgzDialog(txm) {
      let params = {
        txm: txm
      };
      this.$emit('setLoadState', true);
      Common.getsampleInfo(params, data => {
        dataHandle(data).then(Data => {
          this.ybgzSample = Data.data;
          this.ybgzDialogShow = true;
        });
      }).finally(() => {
        this.$emit('setLoadState', false);
      });
    },
    /* handleRowClick */
    handleRowClick() {

    }
  }
};
</script>

<style lang="stylus" scoped>
.rightInforBody
  height 100%
  color #000
  overflow hidden
  .txmText
    font-size 14px
    padding 10px 0 0 5px
    .underLine
      text-decoration underline
      color #00f
      cursor pointer
    .underLine:hover
      opacity 0.8
  .inforBox
    border 1px solid #eeeeee
    background #fff
    margin-top 10px
    border-radius 6px
    padding 5px 0
    .inforTitle
      color #999
      font-weight bold
      height 12px
      padding 3px 0 0 5px
      margin-bottom 10px
    .inforBody
      .patientInfor
        font-weight bold
        padding 0 5% 0 10%
        margin 12px 0
        .name
          font-size 16px
        .iconfont
          font-size 22px
        .icon-chuanran
          color #FABF03
        .icon-weiji
          color rgb(255, 80, 80)
      .patientInforList
        p
          margin-bottom 10px
          .leftKey
            width 70px
            display inline-block
            text-align right
          .red
            color red
  .tableBox
    height calc(100% - 328px)
    .tableBody
      height calc(100% - 18px)
      .bar-color
        display inline-block
        width 100%
        height 20px
        border 1px solid #eee
        vertical-align middle
        text-align center
        padding 0 3px
        &.font-color
          color #fff
        &.border-none
          border none
        &.is-white
          color #000
      .b-color
        color blue
      .r-color
        color red
</style>
<style lang="stylus">
</style>