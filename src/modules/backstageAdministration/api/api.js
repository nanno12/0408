/*
 * @Author: mikey.zhaopeng
 * @Date: 2020-03-20 16:02:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-31 10:20:15
 */
import httpUtils from '@/app/utils/httpUtils';
import * as systemParam from '@/app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const MANAGEMENT_API_PREFIX = systemParam.SYS_BASE_API.MANAGEMENT.url;
const url = {
  // 获取接口
  query: MANAGEMENT_API_PREFIX + '/clf/pafbase/findChargeItems',  // 获取申请单项目对应的收费项目集合
  getMouldItems: MANAGEMENT_API_PREFIX +'/clf/trfbase/listMouldItems', //查询项目列表
  getMoulds: MANAGEMENT_API_PREFIX + '/clf/trfbase/listMoulds', // 查询申请单列表
  getListDetailTypes: MANAGEMENT_API_PREFIX + '/clf/trfbase/listDetailTypes', //获取成分小类数据
  getListMainTypes: MANAGEMENT_API_PREFIX + '/clf/trfbase/listMainTypes', //获取成分大类列表数据
  getDeptInfos: MANAGEMENT_API_PREFIX + '/clf/trfbase/listDeptInfos', // 获取科室列表
  getFindMouldItem: MANAGEMENT_API_PREFIX + '/clf/trfbase/findMouldItem', // 查询模板项目详情
  getFindMould: MANAGEMENT_API_PREFIX + '/clf/trfbase/findMould', // 查询模板详情
  getByDetailType: MANAGEMENT_API_PREFIX + '/clf/trfbase/findMainTypeByDetailType', // 
  getExists: MANAGEMENT_API_PREFIX + '/clf/trfbase/exists ', // 
  // 新增
  getAddMould: MANAGEMENT_API_PREFIX + '/clf/trfbase/addMould', // 新增申请单列表
  gitAddMainComponentType: MANAGEMENT_API_PREFIX + '/clf/trfbase/addOrDeleteMainComponentType', // 新增成分大类
  getAddDetailComponentType: MANAGEMENT_API_PREFIX + '/clf/trfbase/addOrDeleteDetailComponentType', // 新增成分小类信息
  getAddMouldItem: MANAGEMENT_API_PREFIX + '/clf/trfbase/addMouldItem', //新增项目列表
  // 删除
  getRemoveMouldItem: MANAGEMENT_API_PREFIX + '/clf/trfbase/removeMouldItem', // 删除项目列表
  getRemoveMould: MANAGEMENT_API_PREFIX + '/clf/trfbase/removeMould', // 删除申请单列表
  // 修改保存
  getModifyMouldItem: MANAGEMENT_API_PREFIX + '/clf/trfbase/modifyMouldItem', // 保存修改指定模板项目的信息
  getModifyMould: MANAGEMENT_API_PREFIX + '/clf/trfbase/modifyMould', // 保存修改指定申请单模板的信息

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
