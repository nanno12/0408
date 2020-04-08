/*
 * 右侧信息
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-18 10:08:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-01 14:45:34
 */
<template>
  <div class="right-info-wrap">
    <div class="top">
      <div class="title bold">历史记录</div>
      <div class="search">
        <w-input v-model="value2" sufAppendIsButton size="small" placeholder="请输入内容">
          <template slot="suf-append">
            <i class="w-icon-search"></i>
          </template>
        </w-input>
      </div>
    </div>
    <w-tabs v-model="activeTab" type="dark" size="small">
      <w-tab-pane label="近三日" name="threeDay"></w-tab-pane>
      <w-tab-pane label="近七日" name="sevenDay"></w-tab-pane>
      <w-tab-pane label="近一月" name="oneMonth"></w-tab-pane>
      <w-tab-pane label="近三月" name="threeMonth"></w-tab-pane>
    </w-tabs>
    <!-- 内容 -->
    <ul class="contain-box">
      <li class="contain-item re">
        <div class="item-top">
          <div class="title bold">CT申请单</div>
          <div class="status">初始</div>
        </div>
        <div class="item-middle">
          <span>2020-03-24 14:00</span>
          <span>张翰</span>
          <span>&yen;680.00</span>
        </div>
        <div class="tag-wrap">
          <w-tag type="error" size="mini">头部CT平扫</w-tag>
          <w-tag type="error" size="mini">胸部CT平扫</w-tag>
        </div>
        <!-- 操作 -->
        <div class="operate-button ab">
          <w-button type="primary" plain size="mini">修改</w-button>
          <w-button type="primary" plain size="mini">打印</w-button>
          <w-button type="primary" plain size="mini">再来一单</w-button>
        </div>
      </li>
      <li class="contain-item re">
        <div class="item-top">
          <div class="title bold">用血申请单</div>
          <div class="status">审核中</div>
        </div>
        <div class="item-middle">
          <span>2020-03-24 14:00</span>
          <span>张翰</span>
          <span>1400ml</span>
        </div>
        <div class="tag-wrap">
          <w-tag type="error" size="mini">悬浮红细胞 3U</w-tag>
          <w-tag type="error" size="mini">冷冻血浆 400ml</w-tag>
          <w-tag type="error" size="mini">凝血制剂 200ml</w-tag>
          <w-tag type="error" size="mini">血小板 一个治疗量</w-tag>
        </div>
         <!-- 操作 -->
        <div class="operate-button ab">
          <w-button type="primary" plain size="mini">修改</w-button>
          <w-button type="primary" plain size="mini">打印</w-button>
          <w-button type="primary" plain size="mini">再来一单</w-button>
        </div>
      </li>
      <li class="contain-item re">
        <div class="item-top">
          <div class="title bold">彩超申请单</div>
          <div class="status">已执行</div>
        </div>
        <div class="item-middle">
          <span>2020-03-24 14:00</span>
          <span>张翰</span>
          <span>&yen;680.00</span>
        </div>
        <div class="tag-wrap">
          <w-tag type="success" size="mini">肝胆胰脾肾</w-tag>
        </div>
         <!-- 操作 -->
        <div class="operate-button ab">
          <w-button type="primary" plain size="mini">修改</w-button>
          <w-button type="primary" plain size="mini">打印</w-button>
          <w-button type="primary" plain size="mini">再来一单</w-button>
        </div>
      </li>
      <li class="contain-item re">
        <div class="item-top">
          <div class="title bold">备血申请单</div>
          <div class="status">已执行</div>
        </div>
        <div class="item-middle">
          <span>2020-03-24 14:00</span>
          <span>张翰</span>
          <span>100ml</span>
        </div>
        <div class="tag-wrap">
          <w-tag type="success" size="mini">悬浮红细胞 3U</w-tag>
          <w-tag type="success" size="mini">冷冻血浆 400ml</w-tag>
        </div>
         <!-- 操作 -->
        <div class="operate-button ab">
          <w-button type="primary" plain size="mini">修改</w-button>
          <w-button type="primary" plain size="mini">打印</w-button>
          <w-button type="primary" plain size="mini">再来一单</w-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 激活项
      activeTab: 'threeDay',
      value2: ''
    };
  },
  components: {
    
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
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.right-info-wrap
  height 100%
  .top
    display flex
    justify-content space-between
    align-items center
    padding 16px
    .title
      font-size 14px
    .search
      width 180px
  >>>.w-tabs
    >.w-tabs__header
      padding 0 56px
      .w-tabs__nav-wrap::after
        background-color transparent !important
      .w-tabs__nav > div
        width 72px
    .w-tabs__content
      display none
  .contain-box
    height calc(100% - 88px)
    padding 16px 16px 0
    width 100%
    overflow auto
    .contain-item
      width 100%
      height auto
      background rgba(243,245,249,1)
      padding 16px 16px 14px
      margin-bottom 8px
      .item-top
        height 20px
        margin-bottom 8px
        display flex
        justify-content space-between
        align-items center
        .title
          font-size 14px
        .status
          text-align right
      .item-middle
        margin-bottom 16px
        >span
          padding-right 8px
      .tag-wrap
        .w-tag
          font-size 12px
          margin-right 8px
          margin-bottom 10px
      .operate-button
        bottom 0
        left 0
        width 100%
        height 56px
        background rgba(0,0,0,0.4)
        border-radius 0px 0px 2px 2px
        opacity 0
        display flex
        align-items center
        justify-content center
        .w-button+.w-button
          margin-left 16px
      &:hover .operate-button
        opacity 1

</style>

<style lang="stylus">
</style>