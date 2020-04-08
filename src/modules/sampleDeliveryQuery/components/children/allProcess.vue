<!--
* @author w_sh
* @date 2020-03-10
* @module 标本流转查询-右侧全流程
-->
<template>
  <div class="allProcess" v-scroll>
    <div class="abnormalBox" v-if="abnormal">
      <span class="abnormalLabel inlB vt">下载异常：</span>
      <span class="re abnormalText inlB vt">
        <span class="text" ref="text" v-scroll>
          测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123，acb测试文字123
        </span>
        <textarea id="inputCopy" ref="inputCopy"></textarea>
        <span class="getInfor ab" @click="openAbnormal()">详情</span>
        <span class="copy ab" @click="copyText()">复制</span>
      </span>
    </div>
    <div class="allProcessList" :class="{'allProcessListallHeight' : !abnormal}" v-scroll>
      <div class="processItem re" v-for="(item, index) in ybqlcList" :key="index">
        <div class="processItemTime inlB vt">
          <p>{{item.OPERATETIME}}</p>
        </div>
        <span class="ab line"></span>
        <div class="processItemText inlB vt re">
          <div class="circularIcon ab"></div>
          <span class="bold">{{item.FLOWNODE}}:</span>
          <span>{{item.TRACEDESC}}</span>
        </div>
      </div>
    </div>
    <el-dialog
      title="调用日志"
      size="tiny"
      :modal-append-to-body="false"
      :before-close="close"
      :modal="false"
      :width="700"
      :top="'20%'"
      class="common-dialog"
      :visible.sync="abnormalInforShow"
      >
      <div class="tableBody">
        <sort-table
          ref="multipleTable"
          :tableData="filterList"
          :tableTitle="tableTitle"
          :highlight="true"
          :border="false"
          :setShow="false">
          <template v-for="(item)  in tableTitle">
            <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :fixed="item.fixed" :key="item.name"></vxe-table-column>
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
      <div class="dialogBottom">
        <el-button @click="close">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      // 异常信息有无
      abnormal: true,
      // 下载异常详情
      abnormalInforShow: false,
      // 异常详情数据
      filterList: [],
      // 异常详情表头
      tableTitle: [
        {
          name: 'NUM',
          label: 'No.',
          width: '50',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'jklx',
          label: '接口类型',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'dyshai',
          label: '调用时间',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rzms',
          label: '日志描述',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '日志内容',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        }
      ]
    };
  },
  props: {
    // 全流程
    ybqlcList: Array
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
    /* 复制文本 */
    copyText() {
      const text = this.$refs.text.innerText;
      const input = this.$refs.inputCopy;
      console.log(input);
      input.value = text;
      input.select();
      document.execCommand('copy');
    },
    /* 打开下载异常详情 */
    openAbnormal() {
      this.abnormalInforShow = true;
    },
    /* 关闭下载异常详情 */
    close() {
      this.abnormalInforShow = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.allProcess
  height 100%
  overflow-y auto
  padding 10px 0
  .abnormalBox
    font-size 0
    padding 0 10px
    .abnormalLabel
      width 60px
      font-weight bold
      color red
    .abnormalText
      width calc(100% - 60px)
      height 50px
      border 1px solid #ddd
      border-radius 6px
      padding 5px 0
      .text
        overflow-y auto
        display inline-block
        width 100%
        height 100%
        padding 0 10px
      #inputCopy
        width 0
        height 0
        z-index -10
        position absolute
        left 0
        top 0
        opacity 0
      .getInfor
        right 42px
        bottom 5px
        color blue
        cursor pointer
        background #fff
      .copy
        right 12px
        bottom 5px
        color blue
        cursor pointer
        background #fff
      .getInfor:hover,.copy:hover
        opacity 0.8
  .allProcessList
    height calc(100% - 60px)
    margin-top 10px
    overflow-y auto
    .processItem
      font-size 0
      .processItemTime
        width 120px
        padding-right 20px
        text-align right
        height 60px
        p
          line-height 20px
      .line
        height 100%
        border-left 1px solid #ddd
      .processItemText
        width calc(100% - 120px)
        padding 8px 10px
        line-height 16px
        .circularIcon
          width 10px
          height 10px
          border-radius 5px
          background rgb(72, 179, 121)
          left -4px
          top 11px
    .processItem:last-child
      .processItemTime
        height 40px
  .allProcessListallHeight
    height 100%
    margin-top 0
  .tableBody
    height 200px
  .dialogBottom
    margin-top 10px
    text-align right
</style>
<style lang="stylus">

</style>