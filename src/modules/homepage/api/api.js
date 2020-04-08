/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-20 16:02:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-31 10:20:15
 */
import httpUtils from '@/app/utils/httpUtils';
import * as systemParam from '@/app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const MAIN_API_PREFIX = systemParam.SYS_BASE_API.APPLYFORM.url;
// const DEBUGAPI = 'http://172.17.1.211:20031'
const DEBUGAPI = 'http://172.17.17.91:30002'
const url = {
  // 获取中间信息
  // getmodelitem:'http://172.17.1.211:20031/api/getrequestlist/getmodelitem',
  getmodelitem: DEBUGAPI + '/clf/bloodbilling/request/getcomponenttype',
  // 左侧初始化
  // getinitdata:'http://172.17.1.211:20031/api/getrequestlist/getinitdata',
  getinitdata: DEBUGAPI +'/clf/bloodbilling/request/getinitdata',
  // 右侧信息
  // getOtherItem:'http://172.17.1.211:20031/api/getrequestlist/getotheritem',
  getOtherItem: DEBUGAPI + '/clf/bloodbilling/request/getotheritem',
  // 获取病人信息
  getPatentInfo: DEBUGAPI + '/clf/bloodbilling/request/getrequestlist',
  // 保存
  saveRequestList: DEBUGAPI + '/clf/bloodbilling/request/saverequestlist',
};
export default {
  // 获取中间信息
  getmodelitem(params) {
    return httpUtils.post(url.getmodelitem,params);
  },
  // 左侧初始化
  getinitdata() {
    return httpUtils.post(url.getinitdata);
  },
  // 右侧信息
  getOtherItem() {
    return httpUtils.post(url.getOtherItem);
  },
  // 获取病人信息
  getPatentInfo(params) {
    return httpUtils.post(url.getPatentInfo,params);
  },
  // 保存
  saveRequestList(params) {
    return httpUtils.post(url.saveRequestList,params);
  }
};
