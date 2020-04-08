/*
 * 病理申请
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-31 12:41:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 14:25:31
 */
<template>
  <div class="applicatio-blood-panel">
    <ul class="nav-box">
      <li class="nav-item" v-for="(item, index) in navList" :key="index"
          @click="toggle(item,index)"
          :class="[currindex == index ? 'active' : '']">
        <span>{{item.menuname}}</span>
      </li>
    </ul>
    <div class="content-box" :class="[filterComonentClassList.length>0?'bottom-show':'']">
      <div class="content-item"
          v-for="(itemParent, index) in contentList"
          :key="index">
        <div class="title">{{itemParent.parentname}}</div>
          <div
            v-for="(itemChild, index) in itemParent.childList"
            :key="index"
            class="tag"
            :class="[itemChild.ISCHECKED ? 'checked' : 'unchecked']"
            @click="isChecked(itemChild,index)">
            <i class="iconfont w-icon-success" v-if="itemChild.ISCHECKED"></i>
            <span>{{ itemChild.itemName }}</span>
          </div>
      </div>
    </div>
    <!-- 底部信息 -->
    <div class="bottom" v-if="filterComonentClassList.length>0">
      <div class="operatte">
        <w-button @click="handleReset">重置</w-button>
        <w-button type="primary" @click="handleConfirm">确定</w-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as layerUtils from 'app/utils/layerUtils';
import { mapState,mapActions,mapMutations,mapGetters } from "vuex"
export default {
  components: {
  },
  data() {
    return {
      currNav: {},
      currindex: '0',
      navList: [
        {code: '0', menuname: '常规组织', parentname: '病理申请', parentcode: 'pathological'},
        {code: '1', menuname: '术中冰冻', parentname: '病理申请', parentcode: 'pathological'},
        {code: '2', menuname: '细胞学', parentname: '病理申请', parentcode: 'pathological'},
        {code: '3', menuname: '分子病理', parentname: '病理申请', parentcode: 'pathological'}
      ],
      contentList: [
        { parentcode: 'cgzz', parentname: '常规组织',
          childList: [
            {code: '0', itemName: '穿刺组织活检病理', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '活检组织病理诊断', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '骨髓组织活检病理诊断', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '3', itemName: '手术标本病理诊断', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '4', itemName: '脱钙呀', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '5', itemName: '截肢标本病理诊断', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '6', itemName: '全器官切片病理与诊断', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
      ],
      // 勾选项
      filterComonentClassList: [],
    };
  },
  props: {
  },
  computed: {
   
  },
  watch: {
    'contentList': {
      handler: function (newValue, oldValue) {
        // 初始化
        this.filterComonentClassList = [];
        if(newValue.length > 0) {
            newValue.map(item => {
            item.childList.filter(item1 => {
              return item1.ISCHECKED
            }).forEach(item2 => {
              // 所有勾选项
              this.filterComonentClassList.push(item2);
            })
          })
        }
        console.log(this.filterComonentClassList)
      },
      deep: true,
    },
  },
  created() {
    this.$nextTick(() => {
      this.toggle(this.navList[0], 0);
    })
  },
  mounted() {
  },
  methods: {
    /** 映射 */
    ...mapActions("HomePage",[
      'getItemMenu'
    ]),
    /** 点击导航 */
    toggle(item, index) {
      this.currindex = index;
      this.currNav = item;
    },
    /** 是否选中 */
    isChecked(itemChild,index) {
      itemChild.ISCHECKED = !itemChild.ISCHECKED
    },
    /** 单选 */
    changeRadio(val) {

    },
    /** tag标签关闭 */
    handleClose(tag) {
      this.$set(tag, 'ISCHECKED', false);
    },
    /** 重置 */
    handleReset() {
      this.filterComonentClassList = [];
      this.contentList.map(item => {
        item.childList.filter(item1 => {
          item1.ISCHECKED = false
        })
      })
    },
    /** 确定 */
    handleConfirm() {
      // 打开对应页面
      this.getItemMenu(this.currNav);
    }
  }
};
</script>

<style lang="stylus" scoped>
.applicatio-blood-panel
  width 100%
  height 100%
  overflow hidden
  position relative
  .nav-box
    height 100%
    width 148px
    border-right 1px solid #DFE7F5
    float left
    .nav-item
      height 40px
      line-height 40px
      text-align center
      cursor pointer
      &.active
        background rgba(207,224,255,1)
        color rgba(15,73,237,1)
  .content-box
    width calc(100% - 148px)
    height 100%
    float left
    padding 0 16px
    overflow auto
    &.bottom-show
      height calc(100% - 50px)
    .content-item
      margin-bottom 24px
      .title
        height 20px
        line-height 20px
        font-weight 700
        margin-bottom 8px
        &:before
          display inline-block
          content ""
          width 3px
          height 14px
          vertical-align middle
          margin-right 5px
          margin-bottom 2px
          background rgba(15,73,237,1)
      .tag
        display inline-block
        height 36px
        line-height 36px
        border-radius 2px
        border 1px solid rgba(181,201,255,1)
        color rgba(15,73,237,1)
        margin 0 8px 8px 0
        cursor pointer
        >span
          padding 8px 16px
        &.checked
          background #0F49ED
          color #fff
          .w-icon-success
            padding-left 10px
          >span
            padding-left 6px !important
  .bottom
    height 50px
    position absolute
    bottom 0px
    left 148px
    right 0px
    background rgba(255,255,255,1)
    box-shadow 0px -1px 3px 1px rgba(0,6,34,0.13)
    border-radius 0px 0px 2px 0px
    .operatte
      height 50px
      line-height 50px
      text-align center
      border-top 1px solid #DFE7F5
      .w-button
        width 98px
      .w-button+.w-button
        margin-left 24px
</style>

<style lang="stylus">
.popover-wrap
  .popover-body
    padding-top 10px
    .w-input-number
      width 97px
      min-width 97px
      margin-left 16px
    .w-radio+.w-radio
      margin-left 16px
</style>