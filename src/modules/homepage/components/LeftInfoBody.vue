/*
 * 左侧
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-19 09:18:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 10:55:53
 */
<template>
  <div class="left-info-wrap re">
    <w-tabs type="dark" v-model="activeName">
      <w-tab-pane 
        v-for="item in tabList"
        :key="item.name"
        :label="item.label" :name="item.name">
        <keep-alive>
          <component :is="item.component"></component>
        </keep-alive>
      </w-tab-pane>
    </w-tabs>
    <!-- 检索框 -->
    <div class="search ab">
      <w-input v-model="searchValue" sufAppendIsButton size="small" placeholder="请输入内容">
        <template slot="suf-append">
          <i class="w-icon-search"></i>
        </template>
      </w-input>
    </div>
  </div>
</template>
<script>
import * as layerUtils from 'app/utils/layerUtils';
import {isDateObject} from "@/app/utils/dateUtils";
import {dateTimeFormat, timeFormat} from '@/app/utils/index';
import dataApi from '../api/api.js';
import ApplicationBlood from './ApplicationBlood';
import Pathology from './Pathology';
export default {
  components: {
    ApplicationBlood,
    Pathology
  },
  data() {
    return {
      // 检索值
      searchValue: '',
      // 当前激活菜单
      activeName:'fourth',
      //切换菜单列表
      tabList:[
        {
          label:'检查申请',
          name:'first',
        },
        {
          label:'检验申请',
          name:'second',
        },
        {
          label:'病理申请',
          name:'third',
          component:'Pathology'
        },
        {
          label:'用血申请',
          name:'fourth',
          component:'ApplicationBlood'
        },
      ],
    };
  },
  props: {
  },
  computed: {
   
  },
  watch: {
    
  },
  created() {
    this.$nextTick(() => {
    })
  },
  mounted() {
  },
  methods: {
    
  }
};
</script>

<style lang="stylus" scoped>
.left-info-wrap
  width 100%
  height 100%
  background #fff
  >>>.w-tabs
    height 100%
    >.w-tabs__header
      padding-top 16px
      padding-left 12px
      .w-tabs__nav-wrap::after
        background-color transparent !important
    .w-tabs__content
      padding 30px 0 0 0
      height calc(100% - 48px)
      font-size 12px
      overflow auto
      .w-tab-pane
        height 100%
  .search
    width 180px
    right 20px
    top 20px
</style>

<style lang="stylus">
</style>