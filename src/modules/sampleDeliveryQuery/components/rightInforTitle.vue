<!--
* @author w_sh
* @date 2020-03-09
* @module 标本流转查询-右侧病人头部信息
-->
<template>
  <div class="sampleRightInforTitle" v-scroll>
    <div class="inforLeft inlB vt" v-if="currentRow.TXM">
      <p class="font-14 bold">
        <ellipsis-lable>
          条码：<span class="txmText" @click="showYbgzDialog">{{currentRow.TXM}}</span>
        </ellipsis-lable>
      </p>
      <p class="text-center" v-if="currentRow.DELIVERYSTATUSDESC"><span class="reportStatus">{{currentRow.DELIVERYSTATUSDESC}}</span></p>
      <p class="nowrap" v-if="currentRow.ESTIMATETIME">预计 {{currentRow.ESTIMATETIME}} 出报告</p>
    </div>
    <div class="inforCenter inlB vt" v-if="currentRow.TXM">
      <p class="patInfor">
        <ellipsis-lable>
          <span class="name">{{currentRow.PATNAME}}</span>
          <span>{{currentRow.SEXDESC}}</span>
          <span>{{currentRow.AGEDESC}}</span>
          <span class="bold">{{currentRow.SAMPLENAME}}</span>
        </ellipsis-lable>
      </p>
      <p class="centerItem">
        <ellipsis-lable>
          <span>检测医嘱：</span>
          <span>{{currentRow.HISORDERNAME}}</span>
        </ellipsis-lable>
      </p>
      <p>
        <ellipsis-lable>
          <span>临床诊断：</span>
          <span>{{currentRow.CLINICDESC}}</span>
        </ellipsis-lable>
      </p>
    </div>
    <div class="inforRight inlB vt" v-if="currentRow.APPLYNO">
      <p class="reportInfor">
        <span class="bold">报告单号：</span>
        <span>{{currentRow.APPLYNO}}</span>
        <span class="re iconBox">
          <span class="criticalIcon ml-10">
            <i class="iconfont icon-weji red"></i>
            已接收
          </span>
          <span class="contagionIcon ml-10">
            <i class="iconfont icon-swwh yellow"></i>
            已接收
          </span>
        </span>
      </p>
      <div class="inforListBox">
        <div class="inforListItem">
          <p class="mb-10">
            <ellipsis-lable>
              <span class="listTitle">入库仪器：</span>{{currentRow.INSTNAME}}
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="listTitle">样本号：</span>{{currentRow.TECHNO}}
            </ellipsis-lable>
          </p>
        </div>
        <div class="inforListItem">
          <p class="mb-10">
            <ellipsis-lable>
              <span class="listTitle">检测人：</span>{{currentRow.EXECDOCNAME}}
              <span class="red" v-if="phone.execdocphone">({{phone.execdocphone}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="listTitle">检测时间：</span>{{currentRow.EXECTIME}}
            </ellipsis-lable>
          </p>
        </div>
        <div class="inforListItem">
          <p class="mb-10">
            <ellipsis-lable>
              <span class="listTitle">审核人：</span>{{currentRow.VERIFIERNAME}}
              <span class="red" v-if="phone.verifierphone">({{phone.verifierphone}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="listTitle">审核时间：</span>{{currentRow.VERIFYDATE}}
            </ellipsis-lable>
          </p>
        </div>
        <div class="inforListItem">
          <p class="mb-10">
            <ellipsis-lable>
              <span class="listTitle">发布人：</span>{{currentRow.PUBNAME}}
              <span class="red" v-if="phone.pubphone">({{phone.pubphone}})</span>
            </ellipsis-lable>
          </p>
          <p>
            <ellipsis-lable>
              <span class="listTitle">发布时间：</span>{{currentRow.PUBDATETIME}}
            </ellipsis-lable>
          </p>
        </div>
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
// import Common from '@/app/api/common';
import dataApi from './../api/api.js';
// import dataHandle from 'app/utils/dataHandle';
import ybgzDialog from '@/app/components/dialog/sampleTrack.vue';

export default {
  components: {
    ybgzDialog
  },
  data() {
    return {
      // 样本跟踪信息弹窗显示标记
      ybgzDialogShow: false,
      // 联系电话
      phone: {
        execdocphone: '',
        verifierphone: '',
        pubphone: ''
      }
    };
  },
  props: {
    // 所选条码信息
    currentRow: Object,
    // 样本跟踪数据
    ybgzSample: Object
  },
  computed: {

  },
  watch: {
    currentRow() {
      this.getPhone();
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    /* 打开后出触发样本初始化 */
    ybgzInit() {
      setTimeout(() => {
        this.$root.eventHub.$emit('bgsh/ybgzDialog', this.ybgzSample);
      }, 0);
    },
    /* 打开样本跟踪弹框 */
    showYbgzDialog() {
      this.ybgzDialogShow = true;
      // let params = {
      //   txm: txm
      // };
      // this.$emit('setLoadState', true);
      // Common.getsampleInfo(params, data => {
      //   dataHandle(data).then(Data => {
      //     this.ybgzSample = Data.data;
      //     this.ybgzDialogShow = true;
      //   });
      // }).finally(() => {
      //   this.$emit('setLoadState', false);
      // });
    },
    /* 获取手机号码 */
    getPhone() {
      let logPram = {
        execdoccode: this.currentRow.EXECDOCCODE,
        verifiercode: this.currentRow.VERIFIERCODE,
        pubcode: this.currentRow.PUBCODE
      };
      dataApi.getPhone(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.phone = {
            execdocphone: Data.data.execdocphone,
            verifierphone: Data.data.verifierphone,
            pubphone: Data.data.pubphone
          };
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.red
  color red
.yellow
  color #FABF03
.not-allowed
  color #ccc
.sampleRightInforTitle
  background rgb(242, 242, 242)
  height 100%
  padding 8px 5px
  font-size 0
  display flex
  flex-direction row
  overflow-y hidden
  overflow-x auto
  .inforLeft
    height 100%
    border-right 1px solid #ccc
    padding-right 10px
    .nowrap
      white-space nowrap
    .txmText
      text-decoration underline
      color blue
      cursor pointer
    .txmText:hover
      opacity 0.8
    .reportStatus
      display inline-block
      background #999
      height 26px
      line-height 24px
      color #fff
      padding 0 20px
      border-radius 15px
      font-weight bold
      margin 5px 0
  .inforCenter
    height 100%
    border-right 1px solid #ccc
    padding 0 10px
    max-width 200px
    .patInfor
      .name
        font-size 16px
        font-weight bold
        color rgb(153, 0, 15)
      span
        margin-right 5px
    .centerItem
      margin 12px 0 10px 0
  .inforRight
    flex 1
    padding 0 10px
    .reportInfor
      font-size 14px
      .iconBox
        top -3px
      .criticalIcon,.contagionIcon
        display inline-block
        padding 0 10px
        height 22px
        font-size 12px
        line-height 22px
        border-radius 11px
        color #fff
        background rgb(32, 160, 255)
        .iconfont
          font-size 14px
    .inforListBox
      display flex
      flex-direction row
      margin-top 8px
      .inforListItem
        padding-right 15px
        .listTitle
          width 65px
          text-align right
          display inline-block
</style>
<style lang="stylus">

</style>