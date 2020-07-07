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
  isHaveReName:MANAGEMENT_API_PREFIX + '/clf/pafbase/isHaveReName',
  query: MANAGEMENT_API_PREFIX + '/clf/pafbase/findChargeItems',  // 获取申请单项目对应的收费项目集合
  addUpdateItem:MANAGEMENT_API_PREFIX + '/clf/pafbase/addOrUpdateItem', // 添加或修改申请单项目信息
  findItemInfo:MANAGEMENT_API_PREFIX + '/clf/pafbase/findItemInfo', // 申请单项目详情查看，项目点击申请单编辑时候查询项目相关的数据
  deleteTempItem:MANAGEMENT_API_PREFIX + '/clf/pafbase/deleteTempItem', // 删除申请单下的具体一个项目
  findPafTemplate:MANAGEMENT_API_PREFIX + '/clf/pafbase/findPafTemplate', // 查看申请单模板
  pafTemplate:MANAGEMENT_API_PREFIX +'/clf/pafbase/getPafTemplateDetails', // 查看申请单详情
  pafTemplateitems:MANAGEMENT_API_PREFIX + '/clf/pafbase/getPafTemplateitems', // 获得申请单下的项目集合
  copy: MANAGEMENT_API_PREFIX + '/clf/pafbase/copyTemplate2',  // 申请单模板复制
  printTemplate: MANAGEMENT_API_PREFIX +'/clf/pafbase/findPrintTemplate', //打印模板集合
  deletePafTemplate: MANAGEMENT_API_PREFIX + '/clf/pafbase/deletePafTemplate',  // 删除申请单模板,根据ID进行
  addUpdateTemplate:MANAGEMENT_API_PREFIX + '/clf/pafbase/addOrUpdatePafTemplate' // 添加或者更新申请单模板，包含了医嘱检查项目信息
  // ceshi: DEBUGAP + 'Pacs/common/request/gethospitalinfo'

};
export default {
  // 申请单列表
  getIsHaveReName(params) {
    return httpUtils.postJsonRequest(url.isHaveReName, params)
  },
  //打印模板集合
  getPrintTemplate(params) {
    return httpUtils.postJsonRequest(url.printTemplate, params)
  },
  getFindPafTemplate(params) {
    return httpUtils.postJsonRequest(url.findPafTemplate, params)
  },
  // ceshi(params) {
  //   return httpUtils.post(url.ceshi, params)
  // },
  getPafTemplate(params) {
    return httpUtils.postJsonRequest(url.pafTemplate, params)
  },
  getQuery(params) {
    return httpUtils.postJsonRequest(url.query, params)
  },
  getAddUpdateItem(params) {
    return httpUtils.postJsonRequest(url.addUpdateItem, params)
  },
  getAddUpdateTemplate(params) {
    return httpUtils.postJsonRequest(url.addUpdateTemplate, params)
  },
  getFindItemInfo(params) {
    return httpUtils.postJsonRequest(url.findItemInfo, params)
  },
  getDeleteTempItem(params) {
    return httpUtils.postJsonRequest(url.deleteTempItem, params)
  },
  getDeletePafTemplate(params) {
    return httpUtils.postJsonRequest(url.deletePafTemplate, params)
  },
  // 项目
  getPafTemplateitems(params) {
    return httpUtils.postJsonRequest(url.pafTemplateitems, params)
  },
  getcopy(params) {
    return httpUtils.postJsonRequest(url.copy, params)
  },
};
