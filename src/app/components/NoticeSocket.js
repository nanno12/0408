// /*
//  * 框架消息通知Websocket
//  * 框架消息连接只用全局一个级别的连接，但是不排除后续扩展为多个连接的可能
//  * @Author: s_xd@winning.com.cn 
//  * @Date: 2018-09-30 15:12:00 
//  * @Last Modified by: s_xd@winning.com.cn
//  * @Last Modified time: 2018-12-03 13:23:43
//  */
// import WebSocketObserver from '../utils/websocket/WebSocketObserver'
// // import WsMessageType from '../utils/websocket/WsMessageType'
// import noticeSocketMapStore from "../store/noticesocket/mapStore";
// import * as systemParam from '../../app/api/system-param'


// /**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */

// /**  智能服务前缀*/
// const INTELLIGENTSERVICE_API_PREFIX = systemParam.SYS_BASE_API.INTELLIGENTSERVICE.url;
// export default {
//   mixins: [noticeSocketMapStore],
//   data() {
//     return {
//       readCarding: false,
//     };
//   },
//   methods: {
//     /**
//      * 初始化消息Websocket
//      */
//     initNoticeSocket(){

//         let opts={
//             reconnection: true,//（布尔值）是否自动重新连接（false） 
//             reconnectionAttempts: 500,//（Number）放弃前重新连接尝试次数（Infinity）， 
//             reconnectionDelay:3000,//（Number）最初等待的时间在尝试新的（1000）之前
//             onopenhandle: this.onopenHandle,
//             onmessagehandle:this.onmessageHandle
//         };
//         // this.noticeSocketObserver = new WebSocketObserver("//127.0.0.1:8000/lis/api/intelligentservice/pbWebSocket?jwt="+jwt+"&clientinfo="+ encodeURIComponent(JSON.stringify(this.$smartClientUtils
//         // .getClientInfo())), opts);
//         // console.log(window.location)
//         let clientinfo = this.$smartClientUtils.getClientInfo();
//         let uuid = this.$uuidUtils.uuid();
//         this.noticeSocketObserver = new WebSocketObserver(INTELLIGENTSERVICE_API_PREFIX+"websocket/notice/"+uuid+"?jwt="+jwt+"&clientinfo="+ encodeURIComponent(JSON.stringify(clientinfo)), opts);
//         // let observerNew = new Observer("ws://172.17.17.195:20011/lis/pbWebSocket?jwt=60acccb7-4f3c-9b8f-73c1-5f6d46c17575&hospitalcode=%27%27", opts);
//         // observer.WebSocket.onmessage = (data) => console.log(data)
//         // observer.WebSocket.onopen = (data) => console.log("打开 sxd")

//         //observerNew.WebSocket.onopen = (data) => console.log("打开 observerNew")
//     },
//     onopenHandle(data){
//         this.$layerUtils.closeLoadMask();
//         this.setNoticeSocket(this.noticeSocketObserver);
//         this.$setNoticeSocketInstance(this.noticeSocketObserver);
//     },
//     onmessageHandle(event){
//          //根据得到的数据，到订阅列表中获取数据
//         //处理服务端发送过来的消息
//         let eventData = event.data||event[0].data;
//         let recieveMessageData = JSON.parse(eventData);
//         let messageType = recieveMessageData.messageType||"";
//         let data = recieveMessageData.data;
//         let type = recieveMessageData.type;
//         switch (messageType) {
//             //发布的订阅消息
//         case WsMessageType.HEARTB_BEAT:
//             console.log("消息服务连接中");
//             break;
//         case WsMessageType.SUBSCRIBE:
//             console.log(recieveMessageData.message);
//             break;
//         //发布的订阅消息
//         case WsMessageType.PUBLISH:

//             //在订阅列表里查找符合订阅条件的观察者，去触发处理事件
//             for (var i = 0; i < this.subscribeList.length; i++) {

//                 let element = this.subscribeList[i];
//                 let pubMessage = {type:"TAT",data:{newNumber:i}};
//                 //element.observer.obj.handlePubMessage.call(element.observer.obj,pubMessage);
//                 //element.observer.obj.$options.methods.handlePubMessage.call(element.observer.obj,pubMessage);
                
//                 element.observer.handle.call(this,data);
//             }
//             break;
//         //处理通知消息
//         case WsMessageType.NOTICE:
//             this.handWsNotice(recieveMessageData);
//             break;
//         //处理订阅消息的响应消息
//         case WsMessageType.SUBSCRIBE_RESPONSE:
//             if(type != resultType.SUCCESS){
//             let message = recieveMessageData.message;
//             return;
//             }
//             break;
//         default://其他类型抛弃
//             break;
//         }
//     },
//     /**处理键盘事件 */
//     handWsNotice(payoad) {
//       this.$notify(payoad);
//     },
//   }
// };
