<!--
* @author w_sh
* @date 2020-02-16
* @module 今日汇总
-->
<template>
  <div class="todaySummary re" v-loading="loadState"
    element-loading-text="数据获取中">
		<div v-show="showPie && deliveryStatistics.length > 0" class="pieChart" ref="pieChart"></div>
    <span class="ab bold popTable">今日外送汇总</span>
    <div class="tabTitle ab">
      <ul>
        <li @click="pieChange(1)">
          <span class="inlB mb-5">采集</span><br/>
          <span :class="{'active': sumTag == 1}" class="sunNum">{{sumStatistics[0].SUM}}</span>
        </li>
        <li @click="pieChange(2)">
          <span class="inlB mb-5">签收</span><br/>
          <span :class="{'active': sumTag == 2}" class="sunNum">{{sumStatistics[1].SUM}}</span>
        </li>
        <li @click="pieChange(personnelType)">
          <span class="inlB mb-5">上传</span><br/>
          <span :class="{'active': sumTag == 3 || sumTag == 4}" class="sunNum">{{personnelType == 3 ? sumStatistics[2].SUM : sumStatistics[3].SUM}}</span>
        </li>
      </ul>
    </div>
    <span class="tableChangeIcon ab" @click.stop="showTypeChange">
      <i v-if="!showPie" class="iconfont icon-pie"></i>
      <i v-else class="iconfont icon-biaoge"></i>
    </span>
    <span class="ab personnelType" v-if="sumTag == 3 || sumTag == 4">
      <span class="inlB" @click="personnelTypeChange(3)" :class="{active : personnelType == 3}">全部</span>
      <span @click="personnelTypeChange(4)" class="inlB" :class="{active : personnelType == 4}">个人</span>
    </span>
    <div class="sumTableBox" v-show="!showPie && deliveryStatistics.length > 0">
      <div class="tableTitle">
        <span class="titleText">检测中心</span>
        <span class="titleText">送检数量</span>
        <span class="titleSet pointer hide">导出</span>
      </div>
      <div class="tableBody" v-scroll>
        <div class="listItem" v-for="(item, index) in deliveryStatistics" :key="index">
          <span class="itemText">
            <ellipsis-lable>
              {{item.HOSPITALNAME}}
            </ellipsis-lable>
          </span>
          <span class="itemText text-center">{{item.TARGETLABSUM}}</span>
        </div>
      </div>
    </div>
    <div class="noData" v-if="deliveryStatistics.length == 0">
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
import dataApi from './../api/api.js';

export default {
  components: {},
  data() {
    return {
      // 加载状态
      loadState: false,
		  // canvas对象
      chart: Object,
      // canvas尺寸
      size: {},
      // 统计数据
      sumStatistics: [
        {CODE: '1', SUM: 0},
        {CODE: '2', SUM: 0},
        {CODE: '3', SUM: 0},
        {CODE: '4', SUM: 0}
      ],
      // 列表数据
      deliveryStatistics: [],
      // 展示数据
      pieData: [
        {value: 335, name: '直接访问: 335'},
        {value: 310, name: '邮件营销: 310'},
        {value: 234, name: '联盟广告: 234'},
        {value: 135, name: '视频广告: 135'},
        {value: 1548, name: '搜索引擎: 1548'}
      ],
      // tag
      sumTag: 1,
      // 上传统计类型
      personnelType: 3,
      // 表格展现形式
      showPie: true
    };
  },
  props: {
    // 汇总展示
    popoverFilterShow: Boolean
  },
  computed: {

  },
  watch: {
    popoverFilterShow(val) {
      if(val) {
        // this.dataInit();
        this.getData();
      }
    }
  },
  created() {

  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.pieChart);
    // this.dataInit();
  },
  methods: {
    /* 标签切换 */
    pieChange(index) {
      this.sumTag = index;
      this.getData();
    },
    /* 个人统计切换 */
    personnelTypeChange(num) {
      this.personnelType = num;
      this.sumTag = num;
      this.getData();
    },
    /* 获取数据 */
    getData() {
      let logPram = {
        CODE: this.sumTag
      };
      this.loadState = true;
      dataApi.sampleDeliveryStatistics(logPram).then(Data => {
        if(Data.type == 'SUCCESS') {
          this.sumStatistics = Data.data.sumStatistics;
          this.deliveryStatistics = Data.data.deliveryStatistics || [];
          this.pieDataReset();
        } else {
          this.$layerUtils.showMessage(Data.message, this.$layerUtils.messageType.WARNING);
        }
      }).finally(() => {
        this.loadState = false;
      });
    },
    /* 饼状图数据重组 */
    pieDataReset() {
      this.pieData = [];
      let pieDataItem = {
        value: 0,
        name: ''
      };
      this.deliveryStatistics.forEach(item => {
        pieDataItem = {
          value: item.TARGETLABSUM,
          name: `${item.HOSPITALNAME}: ${item.TARGETLABSUM}`
        };
        this.pieData.push(pieDataItem);
      });
      this.$nextTick(() => {
        this.chart = this.$echarts.init(this.$refs.pieChart);
        this.dataInit();
      });
    },
    /* 图表展现形式切换 */
    showTypeChange() {
      this.showPie = !this.showPie;
      if(this.showPie) {
        setTimeout(() => {
          this.chart = this.$echarts.init(this.$refs.pieChart);
          this.dataInit();
        }, 100);
      }
    },
    /* 初始化数据 */
    dataInit() {
      this.size = {
        height: this.$refs.pieChart.offsetHeight,
        width: this.$refs.pieChart.offsetWidth
      };
      this.init();
    },
    /* 图表初始化 */
    init() {
      this.chart.clear();
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} ({d}%)'
        },
        series: {
          name: '检测中心',
          type: 'pie',
          radius: ['20%', '60%'],
          center: ['50%', '65%'],
          data: this.pieData
        }
      });
      this.chart.resize(this.size);
    }
  }
};
</script>

<style lang="stylus" scoped>
.todaySummary
  padding 1px 10px
  .popTable
    left 10px
    top 0
  .pieChart
    width 100%
    height 244px
  .tabTitle
    width 100%
    top 10px
    text-align center
    li
      display inline-block
      vertical-align top
      padding 0 5px
      cursor pointer
      .sunNum
        color rgb(32, 160, 255)
        font-weight bold
      .active
        border-bottom 2px solid rgb(32, 160, 255)
  .tableChangeIcon
    right 10px
    top 0
  .tableChangeIcon:hover .iconfont
    color rgb(32, 160, 255)
  .personnelType
    left 10px
    top 30px
    font-weight bold
    .inlB
      width 30px
      text-align center
      height 18px
      cursor pointer
    .active
      color rgb(32, 160, 255)
      border-bottom 2px solid rgb(32, 160, 255)
  .sumTableBox
    border 1px solid #dddddd
    box-shadow 2px 2px 2px #eee
    margin-top 60px
    .tableTitle
      border-bottom 1px solid #ddd
      height 26px
      line-height 26px
      background #eee
      .titleText
        width 150px
        display inline-block
        text-align center
        font-weight bold
      .titleSet
        text-align center
        display inline-block
        width 64px
        text-decoration underline
        color blue
    .tableBody
      max-height 156px
      overflow-y auto
      .listItem
        height 26px
        line-height 24px
        .itemText
          width 150px
          display inline-block
          padding 0 10px
          vertical-align middle
      .listItem:nth-child(2n)
        background #f5f5f5
  .noData
    margin-top 60px
    text-align center
    padding 10px
</style>

<style lang="stylus">
</style>
