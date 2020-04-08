<!--
* @author: lei
* @date: 2018/01/12
* @module: 公用弹窗
* @explain: popover弹出框
-->
<template>
  <transition :name="transition">
    <div class="popover-dialog" v-show="show" :style="{width:width + 'px',height:height + 'px'}">
      <header class="top">
        <ellipsis-lable :content="title" class="bold font-14"></ellipsis-lable>
        
        <!-- 判断title是否超出限制，过长...展示，并tooltip展示 -->
        <!-- <template v-if="!titleEllipsis"><span id="popover_title" class="el-dialog__title pointer" v-html="titleHtml"></span></template>
        <template v-else>
           <el-tooltip  class="item" effect="dark" :content="title" placement="top">
            <span id="popover_title" class="el-dialog__title pointer" v-html="titleHtml"></span>
          </el-tooltip>
        </template> -->
        <div class="el-dialog__headerbtn">
          <i class="el-dialog__close el-icon-close" @click="close"></i>
        </div>
      </header>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </transition>
</template>
<script>

    export default {
        data() {
            return {
              titleEllipsis: false, // 默认false未溢出 true溢出
              titleHtml: ''
            }
        },
        created() {

        },
        mounted() {
        },
        watch:{
          // 对外抛出打开和关闭事件
          show(val){
            if(val){
              this.$emit('open');
            }else{
              this.$emit('close');
            }
          },
          // 判断title是否超出限制，过长...展示，并tooltip展示
          // title(val){
          //   this.titleEllipsis = false
          //   this.titleHtml = `<span id="popover_title_text">${val}</span>`
          //   let outWidth = document.getElementById('popover_title').offsetWidth
          //   setTimeout(() => {
          //     let inWidth = document.getElementById('popover_title_text').offsetWidth
          //     if(outWidth && inWidth && (inWidth > outWidth)) {
          //         this.titleEllipsis = true
          //     } else {
          //       this.titleEllipsis = false
          //     }
          //   }, 200)

          // }
        },
        props: {
            show:false,//控制弹窗显示/隐藏
            title:String,//标题
            height:Number,//高度
            width:Number,//宽度
            transition:String,//动画
        },
        methods: {
          close(){
            this.$emit('update:show', false);
          },
        },
        components: {}
    }


</script>
<style lang="stylus" scoped>
  .popover-dialog{
    border 1px solid #eeeeee
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
    .top{
      height: 36px;
      line-height:36px;
      padding: 0 10px;
      background: #eee;
      .el-dialog__title{
        color #555 !important
        font-size 14px;
        font-weight 700
      }
      .el-icon-close{
        color #555 !important
        font-size 14px;
        font-weight 700
      }
      .el-dialog__headerbtn{
        position: absolute;
        right: 14px;
        top: 0;
      }
    }
  }
</style>

