<template>
  <div class="wrapper" @mousedown="sentMessage">
    <!--header-->
    <div class="wrapper-head">
      <v-head v-if="!deploy"></v-head>
    </div>
    <!--content-->
    <!-- <div class="wrapper-content" :style="{top:deploy?'0px':'60px'}"> -->
      <keep-alive>
        <router-view class="wrapper-content"></router-view>
      </keep-alive>
      	

 
    <!-- </div> -->
    <!--menu-->
    <div class="wrapper-menu">
    	<!-- <v-menu></v-menu> -->
    </div>
    <!--footer-->
    <div class="footer">
    </div>
  </div>
</template>
<script>
// import "../assets/js/lis60";
import head from "./head.vue";
// import menu from "./menu.vue";
import Common from "../api/common.js";
import * as layerUtils from "@techCommon/utils/layerUtils";
// import * as KeyCode from "../enums/KeyCode";
import browserUtils from '@techCommon/utils/browserUtils'
import config from "../../../config/";

// import NoticeSocket from './NoticeSocket'
import { mapActions } from 'vuex'
import debounce from 'throttle-debounce/debounce';

export default {
  // mixins: [NoticeSocket],
  data() {
    return {
      unique: "",
      deploy: true, // config.build.env.ENV_DEPLOY,
      refreshTimer:null,
      noticeSocketObserver:null,
      /** 监测自动重启标志 */
      MonitorRestart:false,
    };
  },
  // var businessGroupArray = []
  // created() {
  //   this.$nextTick(() => {
  //     let browser = browserUtils.checkBrowser();
  //     //检测浏览器的支持，非框架下才进行提示，框架下，框架已经做了该提示，则不做二次提示
  //     if(window.top == window.self){
  //       //最佳
  //       if(browser=="wn-tech-client"||window.nw){

  //       }
  //       else if(browser=="Chrome"){
  //           this.$layerUtils.showMessage("建议您使用客户端进行访问,以获取最佳体验！",this.$layerUtils.messageType.WARNING);
  //       }else{
  //           this.$layerUtils.alertMessage("本系统不支持当前浏览器，请使用LIS6.0客户端或者Chrome浏览器进行访问","提示",this.$layerUtils.messageType.WARNING);
  //       }
  //     }
      
  //     //执行初始化
  //     // this.init();
  //     this.resetRefresh();
  //     window.addEventListener('message', this.handleMessage)
  //   });
  // },
  beforeCreate() {},
  watch: {
    menuTagsChange() {
      const thisFocusInput = document.getElementsByClassName("thisFocusInput");
      if (thisFocusInput.length > 0) {
        thisFocusInput[0].focus()
      }
    }
  },
  computed: {
    menuTagsChange() {
      return this.$store.state.globle.tabChange;
    }
  },
  methods: {
    ...mapActions('globle',["getServerTime"]),
    resetRefresh(){
      if(this.MonitorRestart==false){
          return;
      }
      let date = new Date();//现在时刻
      let dateIntegralPoint = new Date();//用户登录时刻的下一个整点，也可以设置成某一个固定时刻
      dateIntegralPoint.setDate(date.getDate() + 1);
      dateIntegralPoint.setHours(2);//小时数增加1
      dateIntegralPoint.setMinutes(0);
      dateIntegralPoint.setSeconds(0);
      console.log("开始倒计时："+(dateIntegralPoint-date));
      this.refreshTimer=setTimeout(()=> {
        let timer = setTimeout(function() {
          window.location.reload();
        }, 20000);

        layerUtils.confirmMessage("系统在每天凌晨2点自动刷新，20秒后将刷新，是否确认?","请您确认",layerUtils.messageType.WARNING,{
          confirmButtonText: "立即刷新",
          cancelButtonText: "下次再说",
        })
        .then(data => {
          if (data == layerUtils.confirmResultType.CONFIRM) {
            console.log("确认刷新：");
            window.location.reload();
          } else {
            console.log("取消并重新开始");
            clearTimeout(timer);
            clearTimeout(this.refreshTimer);
            this.resetRefresh();
            return false;
          }
        }).catch(() => {
            clearTimeout(this.refreshTimer);
            this.resetRefresh();
            return false;
        });
      } ,2000);//用户登录后的下一个整点执行。
    },
    //初始化
    // init() {
    //   this.getServerTime();
    //   //layerUtils.loadMask("正在校验【智能客户端】可用端口...");
    //   this.$smartClientUtils.checkService().then(() => {
    //     //layerUtils.loadMask("正在始化获取计算机信息...");
    //     //初始化计算机信息
    //     this.$smartClientUtils
    //       .getInitClientInfo()
    //       .then(() => {
    //         layerUtils.closeLoadMask();
    //         //this.layerUtils.showMessage("已初始化获取计算机信息...",this.layerUtils.messageType.SUCCESS);
    //       })
    //       .catch((error, _this) => {
    //         layerUtils.closeLoadMask();
    //       }).finally(()=>{
    //         //layerUtils.loadMask("正在初始化消息服务...");
    //         console.log("正在初始化消息服务...");
    //         this.initNoticeSocket();
    //       });
    //   });
    // },
    sentMessage:debounce(300,(e)=>{
      // console.log(e)
      if(e.target.classList.contains('thisFocusInput') == true) {
        return false;
      }
      const thisFocusInput = document.getElementsByClassName("thisFocusInput");
      if (thisFocusInput.length > 0) {
        thisFocusInput[0].classList.remove("thisFocusInput")
      }
  
      window.parent.postMessage({
        message: '用户操作，子传父'
      }, '*');
     }),
    handleMessage(event) {
      if(event.data.code == 1) {
        this.$store.dispatch("globle/getTabChange", event.data.tabChange);
      }
      if(event.data.code == 3) {
        document.getElementsByClassName("wrapper")[0].style.zoom = event.data.zoom
      }
    }
    // /**处理键盘事件 */
    // handlekeyUp(event) {
    //   console.log(111)
    //   // this.$root.eventHub.$emit("keyupEvent",event);
    // }
  },
  components: {
    "v-head": head,
    // "v-menu": menu
  }
};
</script>
<style lang="stylus" scoped>

.wrapper {
  height: 100%;

  .wrapper-content {
    background: rgba(234, 237, 244, 1);
    padding: 16px;
    // position: absolute;
    // left: 0px;
    // right: 0px;
    // bottom: 0px;
    // overflow-x: hidden;
  }
}
</style>
<style lang="scss">
.w-modal__header__title {
  font-size:16px;
  font-weight: 600;
}
.w-modal__body {
    border-bottom: 1px solid #DFE7F5;
    padding: 16px 20px;
    margin-bottom: 10px;
}
.w-form-item__label {
  margin-left: 0px;
  padding-right: 8px;
}
.w-button--primary,
.w-button--default{
  min-width: 88px;
  margin-left: 15px !important;
  .w-button--medium, .w-button--medium.is-round {
    padding: 8px 16px;
  }
}

</style>
