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
const DEBUGAPI = 'http://172.17.1.211:20031'
const WDEBUGAPI = 'http://172.17.1.211:20034'
const url = {
  // 获取中间信息
  getMouldItems: WDEBUGAPI +'/clf/trfbase/listMouldItems', //查询项目列表
  getMoulds: WDEBUGAPI + '/clf/trfbase/listMoulds', // 查询申请单列表
  getAddMould: WDEBUGAPI + '/clf/trfbase/addMould', // 新增申请单列表
  getAddMouldItem: WDEBUGAPI + '/clf/trfbase/addMouldItem', //新增项目列表
  getRemoveMouldItem: WDEBUGAPI + '/clf/trfbase/removeMouldItem', // 删除项目列表
  getRemoveMould: WDEBUGAPI + '/clf/trfbase/removeMould', // 删除申请单列表
  getDetailTypes: WDEBUGAPI + '/clf/trfbase/listDetailTypes', //获取成分小类数据
  getAddMainComponentType: WDEBUGAPI + '/clf/trfbase/addMainComponentType', // 新增成分大类

  // 左侧初始化
};
export default {
  // 获取中间信息
  getMouldItems(params) {
    return httpUtils.postJsonRequest(url.getMouldItems,params);
  },
  getMoulds(params) {
    return httpUtils.postJsonRequest(url.getMoulds,params);
  },
  getAddMould(params) {
    return httpUtils.postJsonRequest(url.getAddMould,params);
  },
  getAddMouldItem(params) {
    return httpUtils.postJsonRequest(url.getAddMouldItem,params);
  },
  getRemoveMouldItem(params) {
    return httpUtils.postJsonRequest(url.getRemoveMouldItem,params);
  },
  getRemoveMould(params) {
    return httpUtils.postJsonRequest(url.getRemoveMould,params);
  },
  getAddMainComponentType(params) {
    return httpUtils.post(url.getAddMainComponentType,params);
  },
  // getmodelitem(params) {
  //   return httpUtils.post(url.getmodelitem,params);
  // },
  // getmodelitem(params) {
  //   return httpUtils.post(url.getmodelitem,params);
  // },
};
