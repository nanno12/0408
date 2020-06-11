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
  // 获取接口
  query: WDEBUGAPI + '/clf/pafbase/findChargeItems',  // 获取申请单项目对应的收费项目集合
  getMouldItems: WDEBUGAPI +'/clf/trfbase/listMouldItems', //查询项目列表
  getMoulds: WDEBUGAPI + '/clf/trfbase/listMoulds', // 查询申请单列表
  getListDetailTypes: WDEBUGAPI + '/clf/trfbase/listDetailTypes', //获取成分小类数据
  getListMainTypes: WDEBUGAPI + '/clf/trfbase/listMainTypes', //获取成分大类列表数据
  getDeptInfos: WDEBUGAPI + '/clf/trfbase/listDeptInfos', // 获取科室列表
  getFindMouldItem: WDEBUGAPI + '/clf/trfbase/findMouldItem', // 查询模板项目详情
  getFindMould: WDEBUGAPI + '/clf/trfbase/findMould', // 查询模板详情
  getByDetailType: WDEBUGAPI + '/clf/trfbase/findMainTypeByDetailType', // 
  getExists: WDEBUGAPI + '/clf/trfbase/exists ', // 
  // getByDetailType: WDEBUGAPI + '/clf/trfbase/findMainTypeByDetailType', // 
  // getByDetailType: WDEBUGAPI + '/clf/trfbase/findMainTypeByDetailType', // 
  // getByDetailType: WDEBUGAPI + '/clf/trfbase/findMainTypeByDetailType', // 
  // 新增
  getAddMould: WDEBUGAPI + '/clf/trfbase/addMould', // 新增申请单列表
  gitAddMainComponentType: WDEBUGAPI + '/clf/trfbase/addOrDeleteMainComponentType', // 新增成分大类
  getAddDetailComponentType: WDEBUGAPI + '/clf/trfbase/addOrDeleteDetailComponentType', // 新增成分小类信息
  getAddMouldItem: WDEBUGAPI + '/clf/trfbase/addMouldItem', //新增项目列表
  // 删除
  getRemoveMouldItem: WDEBUGAPI + '/clf/trfbase/removeMouldItem', // 删除项目列表
  getRemoveMould: WDEBUGAPI + '/clf/trfbase/removeMould', // 删除申请单列表
  // 修改保存
  getModifyMouldItem: WDEBUGAPI + '/clf/trfbase/modifyMouldItem', // 保存修改指定模板项目的信息
  getModifyMould: WDEBUGAPI + '/clf/trfbase/modifyMould', // 保存修改指定申请单模板的信息

};
export default {
  getQuery(params) {
    return httpUtils.postJsonRequest(url.query,params);
  },
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
    return httpUtils.postJsonRequest(url.getAddMainComponentType,params);
  },
  getDeptInfos(params) {
    return httpUtils.postJsonRequest(url.getDeptInfos,params);
  },
  getListDetailTypes(params) {
    return httpUtils.postJsonRequest(url.getListDetailTypes,params);
  },
  getListMainTypes(params) {
    return httpUtils.postJsonRequest(url.getListMainTypes,params);
  },
  gitAddMainComponentType(params) {
    return httpUtils.postJsonRequest(url.gitAddMainComponentType,params);
  },
  getAddDetailComponentType(params) {
    return httpUtils.postJsonRequest(url.getAddDetailComponentType,params);
  },
  getModifyMouldItem(params) {
    return httpUtils.postJsonRequest(url.getModifyMouldItem,params);
  },
  getModifyMould(params) {
    return httpUtils.postJsonRequest(url.getModifyMould,params);
  },
  getFindMouldItem(params) {
    return httpUtils.postJsonRequest(url.getFindMouldItem,params);
  },
  getFindMould(params) {
    return httpUtils.postJsonRequest(url.getFindMould,params);
  },
  getByDetailType(params) {
    return httpUtils.postJsonRequest(url.getByDetailType,params);
  }
};
