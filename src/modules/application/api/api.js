/*
 * @Author: mikey.zhaopeng
 * @Date: 2020-03-20 16:02:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-31 10:20:15
 */
import httpUtils from '@/app/utils/httpUtils';
import * as systemParam from '@/app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const CONFIG_API = systemParam.SYS_BASE_API.CONFIG.url;
const url = {
  isHaveReName:`${CONFIG_API}pafbase/isHaveReName`,
  query: `${CONFIG_API}pafbase/findChargeItems`,  // 获取申请单项目对应的收费项目集合
  addUpdateItem:`${CONFIG_API}pafbase/addOrUpdateItem`, // 添加或修改申请单项目信息
  findItemInfo:`${CONFIG_API}pafbase/findItemInfo`, // 申请单项目详情查看，项目点击申请单编辑时候查询项目相关的数据
  deleteTempItem:`${CONFIG_API}pafbase/deleteTempItem`, // 删除申请单下的具体一个项目
  findPafTemplate:`${CONFIG_API}pafbase/findPafTemplate`, // 查看申请单模板
  pafTemplate:`${CONFIG_API}pafbase/getPafTemplateDetails`, // 查看申请单详情
  pafTemplateitems:`${CONFIG_API}pafbase/getPafTemplateitems`, // 获得申请单下的项目集合
  copy: `${CONFIG_API}pafbase/copyTemplate2`,  // 申请单模板复制
  printTemplate: `${CONFIG_API}pafbase/findPrintTemplate`, //打印模板集合
  deletePafTemplate: `${CONFIG_API}pafbase/deletePafTemplate`,  // 删除申请单模板,根据ID进行
  addUpdateTemplate:`${CONFIG_API}pafbase/addOrUpdatePafTemplate` // 添加或者更新申请单模板，包含了医嘱检查项目信息
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
