// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * 应用的主文件
 */
import Vue from 'vue'
import App from './components/App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
// import WuedUI from 'wn-tech-ui'
// import { Message } from 'win-design';

import * as layerUtils from '@techCommon/utils/layerUtils'
import VueLazyload from 'vue-lazyload' 
import VueClipboard from 'vue-clipboard2'
import echarts from 'echarts'
import html2canvas from 'html2canvas'
 
import 'xe-utils'
import VXETable from 'vxe-table' 
import sortTable from '@techCommon/components/sortTable'
import WinDesign from 'win-design'
import 'win-design/lib/themes/default.css' // 默认主题样式文件
import 'win-design/lib/themes/fonts/iconx.js' // 如果你需要使用行业图标
import './assets/layout/uiIndex.scss' // 解决IE10+兼容问题
import '../modules/components'
import mixin  from '../modules/mixin'

// import './components/WinCard'
  Vue.use(ElementUI);
 
/** 注册组件的动作放在此 */ 
const registerComponent = () => {
  /*自定义表格 */
  sortTable.install = function (Vue) {
    Vue.component(sortTable.name, sortTable);
  };

  // import { Message, MessageBox,Notification } from 'wued-ui';
  /**  弹框模块导入*/
  // Vue.use(Loading);
  Vue.mixin(mixin);
  Vue.use(VueClipboard)
  
  Vue.use(VueLazyload, {
    error: 'static/image/loading.gif',
    loading: 'static/image/loading.gif',
    throttleWait: 100,
    attempt: 2
  });

  Vue.use(VXETable);
  Vue.use(sortTable);
  Vue.use(WinDesign)
}

 
/** 注册属性的动作放在此 */
const registerPrototype = () => {
  Vue.prototype.$GLOBLE = {
    _USERNAME: "tesxt"
  };
  Vue.prototype.$echarts = echarts;
  Vue.prototype.$html2canvas = html2canvas;
  // Vue.prototype.$MY = WuedUI;
  //let layerUtilsReal = window.top.$layerUtils||layerUtils;
  //s_xd:挂载属性,暂定，尚未决定是否保留
  // Vue.prototype.$smartClientUtils = smartClientUtils;
  Vue.prototype.$layerUtils = layerUtils;
  // Vue.prototype.$uuidUtils = uuidUtils;
  // Vue.prototype.$dateUtils = dateUtils;
  // Vue.prototype.$utils = utils;
  // Vue.prototype.$vxetable = VXETable;

  Vue.prototype.$setNoticeSocketInstance = (noticeSocket) => {
    Vue.prototype.$noticeSocket = noticeSocket
  }
}

/** 注册相关事件的处理放在此处 */
const registerEvent = () => {
  /**
   * 键盘快捷键方案描述：
   * 1、window统一监听，并通过eventHub进行分发，因为app是一个整体，无法按照页面监听
   * 2、各个模块index中统一监听，不允许在子组件中监听键盘快捷事件，并在销毁或者失效时进行取消监听，激活时重新监听。
   * 3、index中监听处理，过滤需要处理的快捷键，进行处理逻辑，可以往子组件中二次分发业务事件。
   */
  //检测的有效的快捷键
  const dispatchKeyCode = null;
  // [KeyCode.VK_F2,KeyCode.VK_F3,KeyCode.VK_F4,KeyCode.VK_F1,KeyCode.VK_F6,KeyCode.VK_F7,
  //   KeyCode.VK_F8,KeyCode.VK_F9,KeyCode.VK_F10,KeyCode.VK_F11,KeyCode.VK_F12,KeyCode.VK_ESC,KeyCode.VK_PAGE_DOWN,KeyCode.VK_PAGE_UP];

  window.onkeydown = function () {
    if (!event) {
      return;
    }
    let code = event.keyCode;
    var keyCode = event.keyCode || event.which || event.charCode;
    var ctrlKey = event.ctrlKey;
    var metaKey = event.metaKey;


    //符合才去广播，否则不广播
    // if (!dispatchKeyCode || dispatchKeyCode.some((item) => {
    //     return item == code
    //   })) {
    //   //layerUtils.showMessage("您按了"+event.keyCode);
    //   rootVue.eventHub.$emit("keyupEvent", event);
    // }
    // event.preventDefault();
  };
}

/** 注册处理相关全局的指令 */
const registerDirective = () => {
  // v-focus-next-on-enter 用于enter换行
  Vue.directive('focusNextOnEnter', {
    bind: function (el, {
      value
    }, vnode) {
      let inputs = el.getElementsByTagName("input");
      el.addEventListener('keyup', (ev) => {
        if (ev.keyCode === KeyCode.VK_ENTER) {
          let focusInput = document.activeElement;
          //查找next
          let currentIdx = -1;
          let findIdx = -1;
          let len = inputs.length;
          for (let i = 0; i < len; i++) {
            if (focusInput === inputs[i]) {
              currentIdx = i;
              break;
            }
          }
          let cnt = currentIdx;
          if (currentIdx == len - 1) {
            findIdx = 0;
          }
          let item = null;
          while (findIdx == -1 && cnt <= len) {
            cnt++;
            item = inputs[cnt];
            // 禁用的不接受光标
            if (item.hasAttribute("disabled") && item.attributes["disabled"].value == "disabled") {
              continue;
              // 不可见的不接受光标
            } else if (item.style["display"] == "none") {
              continue;
              // type类型是checkbox的不接受光标
            } else if (item.hasAttribute("type") && item.attributes["type"].value == "checkbox") {
              continue;
            }
            findIdx = cnt;
          }

          if (findIdx >= 0) {
            inputs[findIdx].focus();
          }
          return true;
        }
      })
    }
  });
  // v-scroll 用于设置滚动条样式
  Vue.directive('scroll', {
    bind: function (el, {
      value
    }, vnode) {
      el.className += ' fade-scroll';
    }
  });
  // v-focus-input
  Vue.directive('focusInput', {
    bind: function (el, {
      value
    }, vnode) {
      el.addEventListener("focus", () => {
        const thisFocusInput = document.getElementsByClassName("thisFocusInput");
        if (thisFocusInput.length > 0) {
          thisFocusInput[0].classList.remove("thisFocusInput")
        }
        el.classList.add("thisFocusInput");
      })
    }
  });

  // v-only-number
  // 只能输入数字
  Vue.directive('onlyNumber', {
    inserted(el,vDir, vNode) {
      // vDir.value 有指令的参数
      let content;
      //按键按下=>只允许输入 数字/小数点
      el.addEventListener("keypress", event => {
          let e = event || window.event;
          let inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode);
          let re = /\d|\.|\-/;
          content = e.target.value;
          //定义方法,阻止输入
          function preventInput(){
              if (e.preventDefault) {
                  e.preventDefault();
              } else {
                  e.returnValue = false;
              }
          }
          if (!re.test(inputKey) && !e.ctrlKey) {
              preventInput();
          } else if (content.indexOf(".") > 0 && inputKey == ".") {
              //已有小数点,再次输入小数点
              preventInput();
          } else if (content.indexOf("-") > 0 && inputKey == ".") {
            // 已有负号,再次输入负号
            preventInput();
          }
      });
      //按键弹起
      el.addEventListener("keyup",event => {
          let e = event || window.event;
          content = parseFloat(e.target.value);
          if (!content) {
              content = 0.00;
          }
      });
      //失去焦点=>保留指定位小数
      el.addEventListener("focusout",event=>{//此处会在 el-input 的 @change 后执行
          let e = event || window.event;
          content = parseFloat(e.target.value);
          if (!content) {
            content = '';
          }
          let arg_precision = 0;//默认保留至整数
          if (vDir.value.precision) {
              arg_precision = parseFloat(vDir.value.precision);
          }

          if(content === '') {
            e.target.value = ''
          } else if(e.target.value.indexOf(".") > 0) {
            e.target.value = content.toFixed(arg_precision)
          } else {
            e.target.value = content.toFixed(0)
          }
      })
  }
  });

}

Vue.config.productionTip = false
Vue.config.keyCodes.f1 = 112

registerComponent();
registerPrototype();
registerDirective();
registerEvent();

let rootVue = new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  template: '<App/>',
  components: {
    App
  }
});



window.rootVue = rootVue;
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  }
};


// window.top.$layerUtils.showMessage("woshinidada");
EventUtil.addHandler(window, "online", function() {
});
EventUtil.addHandler(window, "offline", function() {
  alert("Offline ---离线工作");
});

//初始化获取计算机信息
// smartClientUtils.getClientInfo().then(data=>{
//     return data;
//   });



// 扩展array属性
Array.prototype.distinct = function () {
  return this.reduce(function (new_array, old_array_value) {
    if (new_array.indexOf(old_array_value) == -1) new_array.push(old_array_value);
    return new_array; //最终返回的是 prev value 也就是recorder
  }, []);
};
