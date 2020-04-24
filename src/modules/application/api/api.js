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
const DEBUGAPI = 'http://172.17.1.211:20034'
// const DEBUGAP = 'http://172.17.17.126:20008'
const url = {
  query: DEBUGAPI + '/clf/pafbase/findChargeItems',  // 获取申请单项目对应的收费项目集合
  addUpdateItem:DEBUGAPI + '/clf/pafbase/addOrUpdateItem', // 添加或修改申请单项目信息
  Info:DEBUGAPI + '/clf/pafbase/findItemInfo', // 申请单项目详情查看，项目点击申请单编辑时候查询项目相关的数据
  delete:DEBUGAPI + '/clf/pafbase/deleteTempItem', // 删除申请单下的具体一个项目
  findPafTemplate:DEBUGAPI + '/clf/pafbase/findPafTemplate', // 查看申请单模板
  pafTemplateitems:DEBUGAPI + '/clf/pafbase/getPafTemplateitems', // 获得申请单下的项目集合
  copy: DEBUGAPI + '/clf/pafbase/copyTemplate',  // 申请单模板复制
  addUpdateTemplate:DEBUGAPI + '/clf/pafbase/addOrUpdatePafTemplate' // 添加或者更新申请单模板，包含了医嘱检查项目信息
  // ceshi: DEBUGAP + 'Pacs/common/request/gethospitalinfo'

};
export default {
  // 申请单列表
  getFindPafTemplate(params) {
    return httpUtils.postJsonRequest(url.findPafTemplate, params)
  },
  // ceshi(params) {
  //   return httpUtils.post(url.ceshi, params)
  // },
  getQuery(params) {
    return httpUtils.postJsonRequest(url.query, params)
  },
  getAddUpdateItem(params) {
    return httpUtils.postJsonRequest(url.addUpdateItem, params)
  },
  getAddUpdateTemplate(params) {
    return httpUtils.postJsonRequest(url.addUpdateTemplate, params)
  },
  getInfo(params) {
    return httpUtils.postJsonRequest(url.Info, params)
  },
  getDelete(params) {
    return httpUtils.postJsonRequest(url.delete, params)
  },
  // 项目
  getPafTemplateitems(params) {
    return httpUtils.postJsonRequest(url.pafTemplateitems, params)
  },
  getcopy(params) {
    return httpUtils.postJsonRequest(url.copy, params)
  },
};
