/*
 * 医技申请单管理系统
 * @Author: mikey.zhaopeng 
 * @Date: 2020-04-06 14:39:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 14:05:15
 */
<template>
  <div class="mainContent re">
    <div class="headerTop ab">
      <label>医技申请单管理系统</label>
      <ul class="inlB headerMenuBox" style="margin-left:5px;">
        <li class="fl ellipsis headerMenu font-14 re "
            :class="[currentIndex == index ? 'collectflag' : '']"
            v-for="(item, index)  in headerMenuList"
            @click="headerMuneClick(item, index)"
            :title="item.menuname"
            :key="index">
          {{item.menuname}}
          <i class="iconfont w-icon-close headerClose ab" @click.stop="removeHeaderMenu(item, index)"></i>
        </li>
      </ul>
    </div>
    <div class="bodyContent ab">
      <div class="body-content-page">
        <keep-alive>
          <component :is="currentItem.component"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import * as layerUtils from '@techCommon/utils/layerUtils'
  import HomePage from '../homepage'
  import ApplicationForm from '../applicationform'
  import pathological from '../pathological'
  import { mapState,mapActions,mapMutations,mapGetters } from "vuex"
  export default {
    components: {
      HomePage,
      ApplicationForm,
      pathological
    },
    data() {
      return {
        // 头部选中的菜单列表，有数量限制。计算值
        headerMenuList: [
          {
            menuname: '首页',
            component: 'HomePage',
          },
        ],
        currentIndex: '0',
        currentItem: {menuname: '首页', component: 'HomePage'}
      }
    },
    created() {
    },
    mounted() {
      document.title = '医技申请单管理系统';
    },
    computed: {
      ...mapState("HomePage", {
        itemMenu: state => state.ItemMenu,
        selectList: state => state.selectList
      }),
    },
    watch: {
      // 监听菜单
      itemMenu(val) {
         let obj = {
          menuname: val.menuname,
          component: val.parentcode,
        }
        this.headerMenuList.push(obj)
        console.log(this.headerMenuList)
        this.headerMuneClick(this.headerMenuList[this.headerMenuList.length-1], this.headerMenuList.length-1);
      },
      // 监听选中项目
      selectList(val) {
        let existIndex = this.headerMenuList.findIndex(item => {
          return item.menuname == this.itemMenu.menuname
        })
        if(existIndex > -1) {
          this.headerMuneClick(this.headerMenuList[existIndex], existIndex);
        }
      }
    },
    methods: {
      /** 添加菜单 */
      headerMuneClick(item, index) {
        this.currentIndex = index;
        this.currentItem = item;
      },
      /** 删除菜单 */
      removeHeaderMenu(item,index) {
        this.headerMenuList.splice(index,1);
        this.headerMuneClick(this.headerMenuList[index-1], index-1);
      }
    },
  }
</script>
<style lang="stylus" scoped>
$main-bg = rgb(37,42,47) // 暂时没用
$header-bg = rgba(28,85,233,1)
$header-hover-bg = rgba(64,113,255,1)
$menu-bg = rgb(37,42,47)
$menu-hover-bg = rgb(25,19,33)

.mainContent
  left 0
  top 0
  right 0
  bottom 0
  overflow hidden
  // background url("./../../app/assets/image/bg.jpg") no-repeat
  background-size cover
  overflow hidden
  img
    width 100%
    height 100%
    object-fit cover
    z-index -1
  // 头部
  .headerTop
    height 50px
    width 100%
    background $header-bg
    line-height 40px
    z-index 100
    min-width 600px
    display flex
    align-items center
    padding 0 16px
    label
      padding-right 80px
      font-size 16px
      color #fff
    .menuListBtn
      font-size 20px
      margin-left 10px
      left 0
      z-index 100
    .menuListBtn:hover
      color #fff
    .headerMenu
      height 50px
      color #fff
      line-height 50px
      padding 0 15px
      margin-right 8px
      max-width 125px
      .w-icon-close
        opacity 0
      .w-icon-close
        top 2px
        right 2px
        height 12px
    .headerMenu:hover .w-icon-close
      opacity 1
    .headerMenu:first-child .w-icon-close
      opacity 0
    .collectflag
      background linear-gradient(180deg,rgba(64,113,255,1) 0%,rgba(39,202,255,0) 100%) !important
      color #fff
  // iframe
  .bodyContent
    top 50px
    right 0
    left 0
    bottom 0
    // background rgba(255,255,255,0.95)
    iframe
      width 100%
      height 100%
    .topClickBox
      width 100%
      height 100%
      top 0
    .body-content-page
      width 100%
      height 100%
.hiddenBox
  top 0
  left 0
  height 100%
  width 0
  overflow hidden
  transition all .5s ease 0s
  z-index 2
.showLeft
  width 180px
.menuMore
  height 41px
  line-height 40px
  width 180px
  border-top 1px solid rgba(255,255,255,0.2)
  border-bottom 1px solid rgba(255,255,255,0.2)
  background $menu-bg
  padding 0 10px
  .menuAllList
    margin-left 10px
    color #bcbcbc
  .iconfont
    color #bcbcbc
    font-size 14px
  .icon-xyjt
    font-size 12px
.menuMore:hover
  background $menu-hover-bg
  .iconfont,.menuAllList
    color #fff
.menuList
  height calc(100% - 42px)
  overflow-y auto
  overflow-x auto
  width 180px
  background $menu-bg
.menuList::-webkit-scrollbar
  display none
.dragBox
  li
    padding-left 10px
    height 40px
    line-height 40px
    color #bcbcbc
    .ellipsis
      width 95px
    .menuIcon
      margin-right 10px
    .delete
      cursor pointer
      right 30px
      top -2px
      display none
      .icon-close:hover
        color #fff
    .move
      cursor move
      right 10px
      display none
      top 0
      .icon-moveto:hover
        color #fff
  li:hover
    background $menu-hover-bg
    color #fff
    .menuIcon
      .iconfont
        color #fff
    .delete
      display block
    .move
      display block
  li.removeHover
    background $menu-bg
    .delete
      display none
    .move
      display none
  li.collectflag
    background $menu-hover-bg
.placeholder
  .topBox
    width 100%
    height 100%
    top 0
    left 0
    background $menu-bg!important
.icon-close
  font-size 12px
.lineListBox::-webkit-scrollbar
  display none
.lineListBox
  overflow-y auto
  height calc(100% - 10px)
.showAllList
  left 180px!important
.allListBox
  z-index 1
  top 0
  left -690px
  bottom 0
  width 690px
  padding 40px 60px 40px 30px
  font-size 0
  transition all .5s ease 0s
  box-shadow 4px 0 8px 0 rgba(0,0,0,.2)
  .allListBoxClose
    right 15px
    top 15px
    font-size 16px
  .allListBoxClose:hover
    color #000
  .searchBox
    border-bottom 1px solid #999
    padding 0 10px
    margin-bottom 10px
    width calc(100% - 40px)
    .searchInput
      width calc(100% - 30px)
  .lineBox
    width 200px
  .menuItemBox
    width 180px
    margin-right 20px
    margin-bottom 40px
    h5
      font-size 14px
      margin 5px 0
      padding 0 8px
      font-weight bold
    ul
      font-size 12px
      li:hover
        background #eee
        .iconfont
          display block!important
      li
        height 30px
        line-height 30px
        padding 0 8px
        span
          width 140px
        .iconfont
          font-size 12px
        .hide
          display none
        .mark
          color rgb(0,193,222)
          background none
          padding 0
          height 30px
.lockBox
  background rgba(0,0,0,0.5)
  position fixed
  width 100%
  height 100%
  z-index 1000
  top 0
  .passwordBox
    top 50%
    left 50%
    transform translate(-50%, -100%)
    width 410px
    background #fff
    border-radius 6px
    .lockheader
      height 30px
      line-height 30px
      padding-left 15px
      border-bottom 1px dashed #999
    .lockBody
      padding 25px 30px
      .passwordLine
        margin-top 15px
        .passwordInput
          width 277px
      .btnBox
        margin-top 20px
        .passWordBtn
          width 60px
          margin-right 10px
</style>
<style lang="stylus" >
.searchInput
  .el-input__inner
    border none
    height 28px
  .el-input__inner:focus
    box-shadow none
.inforChangeDialog
  .el-dialog--tiny
    width: 500px
  .el-dialog__header
    background url("./../../app/assets/image/bg.jpg") top no-repeat
    line-height 0
    padding 8px 10px
    .el-dialog__title
      color #fff
      font-size 14px
    .el-dialog__headerbtn
      font-size 14px
  .el-dialog__body
    padding 15px
    line-height 0
</style>

