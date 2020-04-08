/*
 * 用血申请
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-31 12:41:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 14:51:21
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
        <span v-for="(itemChild, index) in itemParent.childList"
              :key="index">
            <w-popover
              popper-class="popover-wrap"
              trigger="click"
              :disabled="!itemChild.ISCHECKED">
              <div class="popover-body">
                <w-radio-group  v-model="itemChild.radioNum" @change="(value) => {changeRadio(value)}">
                  <w-radio label="50">50ml</w-radio>
                  <w-radio label="100">100ml</w-radio>
                  <w-radio label="150">150ml</w-radio>
                  <w-radio label="200">200ml</w-radio>
                  <w-radio label="250">250ml</w-radio>
                  <w-radio label="300">300ml</w-radio>
                </w-radio-group>
                <w-input-number v-model="itemChild.radioNum" size="small" :min="0" :increment="50"></w-input-number>
              </div>
              <div slot="reference"
                class="tag"
                :class="[itemChild.ISCHECKED ? 'checked' : 'unchecked']"
                @click="isChecked(itemChild,index)">
                <i class="iconfont w-icon-success" v-if="itemChild.ISCHECKED"></i>
                <span>{{ itemChild.itemName }}</span>
              </div>
            </w-popover>
        </span>
      </div>
    </div>
    <!-- 底部信息 -->
    <div class="bottom" v-if="filterComonentClassList.length>0">
      <div class="bottom-box">
        <!-- tag区域 -->
        <div class="tag-wrap">
          <div class="tag-box">
            <template v-for="item in contentList">
              <w-tag
                v-for="(itemtag,index) in item.childList" :key="index"
                type="primary"
                closable
                v-if="itemtag.ISCHECKED"
                @close="handleClose(itemtag)">
                {{itemtag.itemName}}  {{itemtag.radioNum}}{{itemtag.unit}}
              </w-tag>
            </template>
          </div>
        </div>
        <!-- 24小时申请量 -->
        <div class="desc">
          24小时申请量：0ml 。<span class="b-color">本次申请量：0ml 。</span>
        </div>
      </div>
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
        {code: '0', menuname: '常规备血', parentname: '用血申请', parentcode: 'ApplicationForm'},
        {code: '1', menuname: '常规用血', parentname: '用血申请', parentcode: 'ApplicationForm'},
        {code: '2', menuname: '紧急用血', parentname: '用血申请', parentcode: 'ApplicationForm'},
        {code: '3', menuname: '自体输血', parentname: '用血申请', parentcode: 'ApplicationForm'}
      ],
      contentList: [
        { parentcode: 'xj', parentname: '血浆', 
          childList: [
            {code: '0', itemName: '新鲜血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '新鲜冷冻血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '普通血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '3', itemName: '普通冷冻血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '4', itemName: '病毒灭活血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '5', itemName: '病毒灭活血浆1', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '6', itemName: '病毒灭活血浆2', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
        { parentcode: 'hxb', parentname: '红细胞', 
          childList: [
            {code: '0', itemName: '红细胞悬液', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '浓缩红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '少白细胞红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '3', itemName: '去白细胞红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '4', itemName: '洗涤红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '5', itemName: '辐照红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '6', itemName: '冰冻解冻去甘油红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '7', itemName: '年轻红细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
        { parentcode: 'xxb', parentname: '血小板', 
          childList: [
            {code: '0', itemName: '机采血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '富含血小板血浆', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '浓缩血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '3', itemName: '洗涤血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '4', itemName: '少白细胞血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '5', itemName: '去白细胞血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '6', itemName: '冰冻血小板', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
        { parentcode: 'lcd', parentname: '冷沉淀', 
          childList: [
            {code: '0', itemName: '冷沉淀', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
        { parentcode: 'bxb', parentname: '白细胞', 
          childList: [
            {code: '0', itemName: '浓缩白细胞沉淀', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '机采粒细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '机采淋巴细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
        { parentcode: 'bxb', parentname: '白细胞', 
          childList: [
            {code: '0', itemName: '浓缩白细胞沉淀', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '1', itemName: '机采粒细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"},
            {code: '2', itemName: '机采淋巴细胞', ISCHECKED: false, amount: 200, unit: 'ml', radioNum: "200"}
        ]},
      ],
      // 24h 申请量
      applyBlood: 0,
      twentFourApplyBlood: 0,
      // 本次申请量
      allapplyBlood: 0,
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
        this.allapplyBlood = 0;
        // 24h申请量
        this.twentFourApplyBlood = this.applyBlood;
        this.unreasonableList = [];
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
      'getItemMenu',
      'getSelectList'
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
      // 勾选项目改变--打开对应页面
      this.getSelectList(this.filterComonentClassList);
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
      height calc(100% - 200px)
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
    // height auto
    height 200px
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
    .bottom-box
      height calc(100% - 50px)
      padding 16px 16px 0px
      .tag-wrap
        height calc(100% - 40px)
        overflow auto
      .desc
        height 40px
        line-height 40px
        color #f00
        font-size 13px
      .w-tag
        font-size 12px
        margin-right 8px
        margin-bottom 10px
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