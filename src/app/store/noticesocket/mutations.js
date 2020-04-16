// /*
//  * vuex-mutations
//  * Vuex 的 store 中的状态的唯一方法是提交 mutation
//  * mutation 必须是同步函数
//  * @Author: s_xd@winning.com.cn 
//  * @Date: 2018-07-18 13:13:12 
//  * @Last Modified by: s_xd@winning.com.cn
//  * @Last Modified time: 2019-03-24 16:29:10
//  */


// import * as types from './mutation-types'
// import WsMessageType from "../../utils/websocket/WsMessageType"
// import state from './state'
// // import Queue from "../../utils/Queue.js"
// let subQueue = new Queue();
// const custemerSubQueue=()=>{
//     while(subQueue.getQueue.length>0){
//         let item = subQueue.pop();
//         //alert(item);
//     }
// }
// //同步操作
// const mutations = {
//   /** 设置仪器转义项目列表 */
//   [types.SET_NOTICE_SOCKET](state, payload){
//     state.noticeSocket =payload;
//     // custemerSubQueue();
    
//   },
//   /** 添加订阅消息 */
//   [types.ADD_SUBSCRIBE](state, payload){
    

//     //subQueue.push(payload);

//     let observer=payload.observer;
//     let subInfo = payload.data;
//     let observerList = state.observerList||[];
//     let subscribeList = state.subscribeList||[];
    
//     let needSubscribe = false;
//     //组织观察者列表
//     if(observerList.findIndex(item=>{return item.ID==observer.ID})<0){
//       observerList.push(observer);
//     }

//     let condition =JSON.stringify(subInfo.condition);

//     //组织订阅列表
//     let subcribeIndex = subscribeList.findIndex(item=>{
//       //相同观察者
//       let match = item.observer.ID==observer.ID;
//       //条件匹配
//       match=match&&item.condition ==condition;
//       return match;
//     });
    
//     if(subcribeIndex<0){
//       subscribeList.push({observer:observer,condition:condition,subscribeType:subInfo.type.split(",")});
//       needSubscribe=true;
//     }else{
//       let obj = subscribeList[subcribeIndex];
//       //已有的类型
//       let subscribeType = obj.subscribeType;
//       //现在操作的类型
//       let nowType = subInfo.type.split(",");
//       for(let i=0,len = nowType.length;i<len;i++){
      
//         //如果新订阅的类型不在源类型里，则增加
//         if(subscribeType.findIndex(item=>{return item == nowType[i]})<0){
//           obj.subscribeType.push(nowType[i]);
//           needSubscribe=true;
//         }
//       }
//     }
//     console.log(subscribeList);

//     if(needSubscribe){
//       let subParam = {
//                   　　"messagetype":WsMessageType.SUBSCRIBE,
//                   　　"clientinfo":"",
//                   　　"userinfo":"",
//                   　　"jwt":"admin123",
//                   　　//"messagetype":"SUBSCRIBE",
//                   　　"data":subInfo
//                   };
//       if(state.noticeSocket){
//         state.noticeSocket.send(subParam);
//       }
//     }
//   },
//   /** 移除订阅消息 */
//   [types.REMOVE_SUBSCRIBE](state, payload){
//     state.noticeSocket =payload;
//   },
//   /** 添加观察者 */
//   [types.ADD_OBSERVER](state, payload){
//     state.noticeSocket =payload;
//   },
// };



// export default mutations