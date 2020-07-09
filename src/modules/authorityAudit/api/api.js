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
  listApprovalFlows:`${CONFIG_API}trfbase/listApprovalFlows`, // 1、查询审核流程列表
  listApprovalFlowDetails: `${CONFIG_API}trfbase/listApprovalFlowDetails`,  // 2、查询对应的职称信息
  listTitle:`${CONFIG_API}trfbase/getTitle`, // 3、获取职称—用来添加用的
  titleOrDoctor:`${CONFIG_API}trfbase/addTitleOrDoctor`, // 4、修改 新增职称或医生
  approvalFlows:`${CONFIG_API}trfbase/addApprovalFlows`, // 5、新增审核流程
  selectDoctor:`${CONFIG_API}trfbase/selectDoctor`, // 6、获取医生列表—用来添加的
  updateApprovalFlows:`${CONFIG_API}trfbase/updateApprovalFlows`, // 7、修改流程信息
  deleteApprovalFlow:`${CONFIG_API}trfbase/approvalFlowDelete`, // 8、删除
  level: `${CONFIG_API}trfbase/getLevel`,  // 9、获取审核等级
  deptInfos: `${CONFIG_API}trfbase/listDeptInfos`, // 获取科室列表
  // ceshi: DEBUGAP + 'Pacs/common/request/gethospitalinfo'
};
export default {
  // 1、查询审核流程列表
  queryListApprovalFlows(params) {
    return httpUtils.postJsonRequest(url.listApprovalFlows, params)
  },
  //2、查询对应的职称信息
  queryListApprovalFlowsDetails(params) {
    return httpUtils.postJsonRequest(url.listApprovalFlowDetails, params)
  },
  // 3、获取职称—用来添加用的
  queryListTitle(params) {
    return httpUtils.postJsonRequest(url.listTitle, params)
  },
  // 4、修改 新增职称或医生
  addTitleOrDoctor(params) {
    return httpUtils.postJsonRequest(url.titleOrDoctor, params)
  },
  //5、新增审核流程
  addapprovalFlows(params) {
    return httpUtils.postJsonRequest(url.approvalFlows, params)
  },
  // 6、获取医生列表—用来添加的
  querySelectDoctor(params) {
    return httpUtils.postJsonRequest(url.selectDoctor, params)
  },
  //  7、修改流程信息
  updateApprovalFlows(params) {
    return httpUtils.postJsonRequest(url.updateApprovalFlows, params)
  },
  // 8、删除
  deleteApprovalFlow(params) {
    return httpUtils.postJsonRequest(url.deleteApprovalFlow, params)
  },
  // 9、获取审核等级
  level(params) {
    return httpUtils.postJsonRequest(url.level, params)
  },
  queryListDeptInfos(params) {
    return httpUtils.postJsonRequest(url.deptInfos, params)
  },
};
