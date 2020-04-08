/*
 * WebSocket 管理类
 * 用法 new webSocketObserver()即可实例化一个webSocket通道
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-09-30 13:26:21 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-12-04 12:58:30
 */
import {SubscribeMessage,heartBeat} from "./WsRequestInfo"
import smartClientUtils from "@techCommon/utils/smartClientUtils";

export default class {
  /**
   * 构造一个webSocket管理实例
   * @param {string} connectionUrl ws地址
   * @param {Object} opts 配置项
   */
  constructor (connectionUrl, opts = {}) {
    this.format = opts.format && opts.format.toLowerCase()


    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
    if (connectionUrl.startsWith('//')) {
      connectionUrl = `${scheme}:${connectionUrl}`
    }else{
      let preFix = window.location.host+"/lis";
      connectionUrl=`${scheme}://${preFix}/${connectionUrl}`
    }
    //ws地址
    this.connectionUrl = connectionUrl
    this.opts = opts

    //重连标志
    this.reconnection = this.opts.reconnection || false
    //重连次数，默认无限大次数
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity
    //重连前延迟毫秒数
    this.reconnectionDelay = this.opts.reconnectionDelay || 1000
    //重连计时的标识
    this.reconnectTimeoutId = 0
    //已重连次数
    this.reconnectionCount = 0

    this.connect(connectionUrl, opts)
    
    this.onEvent()
  }
  /*
    状态说明
    CONNECTING(0) websocket正尝试与服务器建立连接
    OPEN(1) websocket与服务器已经建立连接
    CLOSING(2) websocket正在关闭与服务器的连接
    CLOSED(3) websocket已经关闭了与服务器的连接
  */

  /**
   * 连接
   * @param {string} connectionUrl 
   * @param {*} opts 
   */
  connect (connectionUrl, opts = {}) {
    let protocol = opts.protocol || ''
    this.WebSocket = opts.WebSocket || (protocol === '' ? new WebSocket(connectionUrl) : new WebSocket(connectionUrl, protocol))
    if (this.format === 'json') {
      if (!('sendObj' in this.WebSocket)) {
        this.WebSocket.sendObj = (obj) => this.WebSocket.send(JSON.stringify(obj))
      }
    }
    return this.WebSocket
  }
  /**
   * 断开连接
   */
  disconnect(){
    if (this.reconnection) { 
        this.reconnection = false 
    }
    if(this.WebSocket.readyState == WebSocket.CONNECTING||this.WebSocket.readyState == WebSocket.OPEN){
        this.WebSocket.close();
    }
        
  }

  /** 
   * 重连方法
  */
  reconnect () {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount++
      // console.log("正在尝试第"+this.reconnectionCount+"次重连")
      clearTimeout(this.reconnectTimeoutId)

        this.reconnectTimeoutId = setTimeout(() => {
        this.connect(this.connectionUrl, this.opts)
        this.onEvent()
      }, this.reconnectionDelay)
    } else {
     //TO DO
    }
  }

   /** 
   * 发送数据
  */
 send(message) {
    if(message instanceof Object){ 
        let clientInfo;
        clientInfo=smartClientUtils.getClientInfo();
        message.jwt = qs('jwt');
        message.clientInfo =clientInfo;
        message =JSON.stringify(message);
    }
    
    this.WebSocket.send(message);
  }

  /**
   * 事件处理
   */
  onEvent () {
    ['onmessage', 'onclose', 'onerror', 'onopen'].forEach((eventType) => {
      this.WebSocket[eventType] = (event) => {
        //Emitter.emit(eventType, event)
        let eventTypeHandle =eventType+"handle";

        switch (eventType) {
            case this.EVENT_TYPE.ONOPEN:
                //如果是重连，
                if (this.reconnection&&this.reconnectionCount>0){
                    eventTypeHandle="onreconnectionhandle";
                    //重置重连计数和心跳
                    this.reconnectionCount = 0;
                    
                }
                // this.heartCheck.reset().start(this.WebSocket);
                break;
            case this.EVENT_TYPE.ONCLOSE:
                if (this.reconnection){
                    //重连
                    // this.reconnect();
                }
                break;
            case this.EVENT_TYPE.ONERROR:
                
                break;
            case this.EVENT_TYPE.ONMESSAGE:
                // 如果获取到消息，说明连接是正常的，重置心跳检测
                // this.heartCheck.reset().start(this.WebSocket);
                break;
            default:
                break;
        }

        if( typeof this.opts[eventTypeHandle] === 'function'){
            this.opts[eventTypeHandle](event);
        }else{
            // console.log(eventType);
        }

        return;
       }
    })
  }
  /**
   * 心跳监测的对象
   */
  heartCheck = {
    timeout: 1000*60*1,//1min才执行一次
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(ws){
        var self = this;
        this.timeoutObj = setInterval(function(){
           // console.log(heartBeat);
           if(ws.readyState ==WebSocket.OPEN){
                ws.send(JSON.stringify(heartBeat));
                //self.reset().start(ws);    // 如果获取到消息，说明连接是正常的，重置心跳检测
            }
  
            // //超时还没被重置，说明挂了；
            // self.serverTimeoutObj = setTimeout(function(){
            //     //ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            // }, self.timeout)
        }, this.timeout)
        return this;
    },
  }

  EVENT_TYPE={
    ONMESSAGE:"onmessage",
    ONCLOSE:"onclose",
    ONERROR:"onerror",
    ONOPEN:"onopen",
  }
}