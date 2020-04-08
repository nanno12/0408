/*
 * 用血申请单
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-17 15:08:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-02 18:12:51
 */
<template>
  <div class="application-form-wrap">
    <!-- 头部信息 -->
    <header class="top">
      <div class="title">{{patMessage.MOULD_NAME}}</div>
      <ellipsis-lable class="person-info">
        <!-- <span><img class="personalPic" src="static/image/personal.jpg" alt=""></span> -->
        <span class="personalPic"><svg class="icon" aria-hidden="true"><use :xlink:href="`#${actver}`"></use></svg></span>
        <span class="bold">{{patMessage.PATIENT_NAME}}</span>
        <span class="bold">{{patMessage.BED_NO}}床</span>
        <span>{{patMessage.SEX_DESC}}</span>
        <span>{{patMessage.AGE_DESC}}</span>
        <span>{{patMessage.MEDICAL_INSURANCE_NAME}}</span>
        <span>体重：{{patMessage.PATIENT_WEIGHT}}</span>
        <span>住院号：{{patMessage.PATIENT_ID}}</span>
        <span>身份证号：{{patMessage.IDCARD_NO}}</span>
        <span>民族：{{patMessage.PATIENT_NATION}}</span>
      </ellipsis-lable>
    </header>
    <!-- 主体内容 -->
    <div class="application-form-body">
      <div class="left-body">
        <lm-info-body :listData="listData"
                      :transfusionItemList="transfusionItemList"
                      :patMessage="patMessage"
                      @getTransfoList="getTransfoList"></lm-info-body>
      </div>
       <!-- 右侧信息 -->
      <div class="right-body">
       <right-info-body :otherFocusItemList="otherFocusItemList"
                        :transfusionItemList="transfusionItemList"
                        :transfoList="transfoList"></right-info-body>
      </div>
    </div>
  </div>
</template>
<script>
import Common from '@/app/api/common.js';
import autoResize from '@/app/components/autoResize';
import lmInfoBody from './components/lmInfoBody';
import RightInfoBody from './components/RightInfoBody';
import dataApi from './api/api.js';
export default {
  mixins: [autoResize],
  components: {
    lmInfoBody,
    RightInfoBody,
  },
  data() {
    return {
      // 病人信息
      patMessage: {},
      // 其他关注项目
      otherFocusItemList: [],
      // 输血前项目
      transfusionItemList: [],
      // 输血指征
      transfoList: [],
      // 初始化数据
      listData: {},
    };
  },
  props: {

  },
  computed: {
    // 0-1婴儿；2-16儿童；17-59中青年；60+老年----- SEX_DESC: "男" SEX_NO: "1",AGE_UNIT
    actver() {
      let age = Number(this.patMessage.AGE);
      let ageUnit = this.patMessage.AGE_UNIT;
      let sexDesc = this.patMessage.SEX_DESC;
      if(ageUnit == '岁' && age > 1) {
        if(age <= 16) {
          if(sexDesc == '女') {
            return 'iconnvtong';
          }else {
            return 'iconnantong';
          }
        }else if(age <= 59) {
          if(sexDesc == '女') {
            return 'iconnvqingnian';
          }else {
            return 'iconnanqingnian';
          }
        }else {
          if(sexDesc == '女') {
            return 'iconnainai';
          }else {
            return 'iconyeye';
          }
        }
      }else {
        return 'iconyinger';
      }
    }
  },
  watch: {

  },
  created() {
    this.$nextTick(() => {
      // 初始化病人信息
      this.getinitdata();
      // 获取病人信息
      this.getPatentInfo();
      // 获取右侧展示信息
      this.getOtherItem();
    });
  },
  mounted() {
  },
  methods: {
     /* 初始化 */
    getinitdata() {
      dataApi.getinitdata().then(data => {
        if(data.type == 'SUCCESS') {
          this.listData = data.data || {};
          // this.patMessage = data.data.PATMESSAGE || {};
        }else {
          this.listData = {};
          // this.patMessage = {};
        }
      });
    },
    /** 获取病人信息 */
    getPatentInfo() {
      let params = {
        listno: 2
      }
      dataApi.getPatentInfo(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.patMessage = data.data[0] || {};
        }else {
          this.patMessage = {};
        }
      })
    },
    /** 获取右侧展示信息 */
    getOtherItem() {
      dataApi.getOtherItem().then(data => {
        if(data.type == 'SUCCESS') {
          this.otherFocusItemList = data.data ? data.data.OTHERFOCUSITEMLIST : [];
          this.transfusionItemList = data.data ? data.data.TRANSFOLIST : [];
        }else {
          this.otherFocusItemList = [];
          this.transfusionItemList = [];
        }
      })
    },
    /** 获取输血指征 */
    getTransfoList(list) {
      // console.log(list,'opopop');
      this.transfoList = list;
    }
  }
};
</script>

<style lang="stylus" scoped>
.application-form-wrap
  height 100%
  background rgba(234,237,244,1)
  overflow-x auto
  overflow-y hidden
  >>>.w-input, >>>.w-textarea,>>>.w-checkbox__label,>>>.w-radio__label
    font-size 12px
  .top
    height 50px
    background #fff
    padding 15px 16px
    font-size 14px
    display flex
    align-items center
    box-shadow 0px 3px 4px 0px rgba(208,214,228,1)
    // div
    //   float left
    .title
      width 120px
      height 26px
      line-height 26px
      margin-right 20px
      color #fff
      text-align center
      position relative
      background linear-gradient(180deg,rgba(255,200,0,1) 0%,rgba(223,141,24,1) 100%)
      box-shadow 0px 1px 1px 0px rgba(181,181,181,0.5)
      border-radius 2px
    .person-info
      width calc(100% - 140px)
      span
        padding-right 8px
    .personalPic
      // width 28px
      // height 28px
      // border-radius 50%
      >>>.icon
        width 30px
        height 30px
        vertical-align middle
  .application-form-body
    height calc(100% - 50px)
    padding 12px 15px
    overflow hidden
    .left-body
      height 100%
      width calc(100% - 385px)
      float left
    .right-body
      width 370px
      margin-left 15px
      height 100%
      float right
      background #fff
</style>
<style lang="stylus">
</style>