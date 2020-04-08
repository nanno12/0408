/*
 * UUID 工具类
 * @Author: s_xd@winning.com.cn
 * @Date: 2018-01-14 16:27:41
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-09-28 16:08:20
 */

/**
 * http请求工具类
 */
const uuidUtils = {
  lockReconnect:false,//避免重复连接
  webSocketInstance:null,
  /** 初始化websocket */
  uuid: function () {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
}



export default uuidUtils;
