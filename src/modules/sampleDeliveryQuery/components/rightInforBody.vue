<!--
* @author w_sh
* @date 2020-03-09
* @module 标本流转查询-右侧主体信息
-->
<template>
  <div class="sampleRightInforBody">
    <div class="contentTitle">
      <span class="labelItem"
      :class="{'active' : labelType == 0}"
      @click="labelTypeChange(0)"
      >全流程</span>
      <span class="labelItem"
      :class="{'active' : labelType == 1}"
      @click="labelTypeChange(1)"
      >原始报告</span>
      <span class="labelItem"
      :class="{'active' : labelType == 2}"
      @click="labelTypeChange(2)"
      >检测结果({{reportResultList.length}})</span>
      <span
      :class="{'active' : labelType == 3}"
      @click="labelTypeChange(3)"
      >微生物测试</span>
      <el-checkbox class="fr" v-if="labelType == 2" v-model="picShow">显示项目图片</el-checkbox>
    </div>
    <div class="contentBody">
      <!-- 微生物检测结果 -->
      <microbe-report v-if="labelType == 3"></microbe-report>
      <!-- 检测结果 -->
      <result-body
      v-if="labelType == 2"
      :picShow="picShow"
      :reportResultList="reportResultList"
      :reportImageList="reportImageList"
      :currentRow="currentRow"
      ></result-body>

      <pdf-view v-show="labelType == 1" :pdfPath="pdfPath" :labelType="labelType"></pdf-view>
      <all-process :ybqlcList="ybgzSample.tracelist || []" v-if="labelType == 0"></all-process>
    </div>
  </div>
</template>
<script>
import resultBody from './children/resultBody';
import pdfView from './children/pdfView';
import allProcess from './children/allProcess';
import microbeReport from './children/microbeReport';

export default {
  components: {
    resultBody,
    pdfView,
    allProcess,
    microbeReport
  },
  data() {
    return {
      // 展示的类型
      labelType: 3,
      // 显示项目图片
      picShow: true
    };
  },
  props: {
    // 报告结果
    reportResultList: Array,
    // 报告图片
    reportImageList: Array,
    // 当前条码
    currentRow: Object,
    // 原始报告pdf
    pdfPath: String,
    // 样本跟踪数据
    ybgzSample: Object
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
    /* 展示类型切换 */
    labelTypeChange(val) {
      this.labelType = val;
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
.sampleRightInforBody
  height 100%
  border 1px solid #ddd
  .contentTitle
    border-bottom 1px solid #ddd
    color #000
    height 30px
    line-height 30px
    font-weight bold
    padding-right 5px
    .labelItem
      font-size 14px
      display inline-block
      border-right 2px solid #333
      height 14px
      line-height 14px
      padding 0 5px
      cursor pointer
    .labelItem:hover
      opacity 0.8
    .active
      color rgb(32, 160, 255)
    .labelItem:nth-child(3)
      border-right none
  .contentBody
    height calc(100% - 30px)
</style>
<style lang="stylus">

</style>