/**
 *@description 弹框 工具类
 *
 * import * as layerUtils from "../../../app/utils/layerUtils";
 //弹框
	layerUtils.alertMessage("你不能这么做","消息",layerUtils.messageType.INFO);
	layerUtils.alertMessage("你不能这么做","警告",layerUtils.messageType.WARNING).then(()=>{
		//确定按钮
		showMessage("哦~，你确定啊");
	});

	//询问
	layerUtils.confirmMessage("你确定回答的是正确的么？","询问",layerUtils.messageType.WARNING).then(()=>{
		//确定按钮
		showMessage("我确定");
	}).catch(()=>{
		//取消按钮
		showMessage("算了，我不确定");
	});

 */

import {
    Message,
    MessageBox,
    Notification,
    Loading
  } from 'wn-tech-ui';
  
  import _ from "lodash";
  
  import * as _MessageDiy from '../components/message/index';
  const MessageDiy = _MessageDiy.default || _MessageDiy;
  // Message.install = function (Vue, options) {
  // 	Vue.prototype.$message = Message
  //   }
  import merge from './merge';
  
  
  let loadingInstance = null;
  let loadingInstanceTimer = null;
  

  //loading 延迟关闭ms
  const DELAY_CLOSE_LOADING = 5 * 1000;
  //loading 延迟显示ms
  const DELAY_SHOW_LOADING = 500;
  //是否可以跨域操作
  const CAN_CROSSIFRAME = checkIframe();
  function checkIframe() {
    try {
      window.top.$layerUtils
    } catch (e) {
      console.log("跨域操作，不允许操作框架函数：" + e.message);
      return false;
    }
    return window.top != window.self;
  }
  
  /** 消息类型 */
  const messageType = {
    /** 成功 */
    SUCCESS: "success",
  
    /** 消息 */
    INFO: "info",
  
    /** 警告 */
    WARNING: "warning",
  
    /** 错误 */
    ERROR: "error",
  };
  
  /** 消息类型 */
  const confirmResultType = {
    /** 取消 */
    CANCEL: "cancel",
  
    /** 确认 */
    CONFIRM: "confirm"
  };
  
  /** 辅助提示信息默认配置 */
  const tipDefaultOptions = {
    iconClass: "",
    duration: 3000,
    showClose: true,
    center: false,
    type: messageType.WARNING
  };
  
  
  /**
   * 非模态弹出提示框
   * @param {*} message 内容
   * @param {*} msgType 类型默认是messageType.INFO,可枚举 messageType.SUCCESS|messageType.INFO|messageType.WARNING|messageType.ERROR
   * @param {*} options 其他可选配置
   */
  const showMessage = function (message, msgType, options) {
    if (CAN_CROSSIFRAME) {
      return window.top.$layerUtils.showMessage(message, msgType, options);
    }
  
    msgType = (!msgType || msgType == "") ? messageType.INFO : msgType;
    //用默认参数。
    let opp = {};
    merge(opp, tipDefaultOptions);
    //实际参数覆盖默认参数
    merge(opp, options)
    opp.message = message;
    opp.type = msgType;
    return MessageDiy(opp);
  };
  
  /**
   * 模态弹出提示框，类似alert
   * @param {*} message 内容
   * @param {*} title 标题
   * @param {*} msgType 类型默认是messageType.INFO,可枚举 messageType.SUCCESS|messageType.INFO|messageType.WARNING|messageType.ERROR
   * @param {*} options 其他可选配置
   */
  const alertMessage = (message, title, msgType, options) => {
    if (CAN_CROSSIFRAME) {
      return window.top.$layerUtils.alertMessage(message, title, msgType, options);
    }
  
    if (typeof title === 'object') {
      options = title;
      title = '';
    } else if (title === undefined) {
      title = '';
    }
    return MessageBox(merge({
      title: title,
      message: message,
      type: msgType,
      closeOnPressEscape: false,
      closeOnClickModal: false
    }, options));
  };
  
  
  /**
   * 确认提示框
   * @param {*} message 内容
   * @param {*} title 标题
   * @param {*} msgType 类型默认是messageType.INFO,可枚举 messageType.SUCCESS|messageType.INFO|messageType.WARNING|messageType.ERROR
   * @param {*} options 其他可选配置
   */
  const confirmMessage = (message, title, msgType, options) => {
    if (CAN_CROSSIFRAME) {
      return window.top.$layerUtils.confirmMessage(message, title, msgType, options);
    }
    if (typeof title === 'object') {
      options = title;
      title = '';
    } else if (title === undefined) {
      title = '';
    }
    
    return MessageBox(merge({ 
      title: title,
      message: message, 
      type: msgType, 
      $type: 'confirm',
      closeOnClickModal: false,
      showCancelButton: true
    }, options));
  };
  
  
  /**
   * 推荐-全局遮罩层 单例模式，多次调用只会返回一个实例
   * @param {*} message 内容
   */
  const loadMask = (message) => {
  
    if (CAN_CROSSIFRAME) {
      return window.top.$layerUtils.loadMask(message);
    }
    //取消现有函数
    delayShowLoading.cancel();
    let options = {
      lock: true,
      text: message || "处理中...",
      spinner: 'el-icon-loading'
    }
    clearTimeout(loadingInstanceTimer);
    loadingInstanceTimer = null;
    //因为是单例模式的，所以只需要修改文字即可
    if (loadingInstance && loadingInstance.visible) {
      loadingInstance.setText(message);
    } else {
      //需要时才调用
      delayShowLoading(options);
  
    }
    //延迟关闭
    delayCloseLoading.cancel();
    delayCloseLoading();
  
  };
  
  /**
   * 推荐-关闭全局遮罩层
   */
  const closeLoadMask = (message) => {
  
    if (CAN_CROSSIFRAME) {
      return window.top.$layerUtils.closeLoadMask(message);
    }
    //如果有等待的弹出，则先取消
    delayShowLoading.cancel();
    delayCloseLoading.cancel();
    clearTimeout(loadingInstanceTimer);
    if (loadingInstance && loadingInstance.visible) {
      loadingInstance.close();
      clearTimeout(loadingInstanceTimer);
      loadingInstanceTimer = null;
      //alert(loadingInstance);
      //loadingInstance = null;
  
    }
  };

  /** 定义防抖处理延迟关闭 */
  const delayCloseLoading = _.debounce(function () {
    if (loadingInstance && loadingInstance.visible) {
      loadingInstance.close();
    }
  }, DELAY_CLOSE_LOADING);
  
  /** 定义防抖处理延迟加载loading */
  const delayShowLoading = _.debounce(function (options) {
    loadingInstance = Loading.service(options);
  }, DELAY_SHOW_LOADING);
  
  
  
  export {
    messageType,
    showMessage,
    alertMessage,
    confirmMessage,
    confirmResultType,
    loadMask,
    closeLoadMask
  }
  