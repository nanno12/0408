/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-20 16:02:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-05 19:35:14
 */
import httpUtils from '@/app/utils/httpUtils';
import * as systemParam from '@/app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const MAIN_API_PREFIX = systemParam.SYS_BASE_API.APPLYFORM.url;
const DEBUGAPI = 'http://172.17.1.211:20031'
// const DEBUGAPI = 'http://172.17.17.91:30002'
const url = {
  // 查询
  getExaminList: DEBUGAPI + '/clf/bloodexamine/request/getexaminlist',
  // 获取右侧检验项目
  getLisItemList: DEBUGAPI + '/clf/bloodexamine/request/getlisitemlist',
  // 用户验证
  checkUserVerify: DEBUGAPI + '/clf/bloodexamine/request/checkuserverify',
  // 审核
  requestApproval: DEBUGAPI + '/clf/bloodexamine/request/requestapproval',
  // 撤销审核
  requestRevocationApproval: DEBUGAPI + '/clf/bloodexamine/request/requestrevocationapproval',
  // 获取项目流程数据
  getItemFlow: DEBUGAPI + '/clf/bloodexamine/request/getitemflow',
};
export default {
  // 查询
  getExaminList(params) {
    return httpUtils.post(url.getExaminList,params);
  },
  // 获取右侧检验项目
  getLisItemList(params) {
    return httpUtils.post(url.getLisItemList,params);
  },
  // 用户校验
  checkUserVerify(params) {
    return httpUtils.post(url.checkUserVerify,params);
  },
  // 审核
  requestApproval(params) {
    return httpUtils.post(url.requestApproval,params);
  },
  // 撤销审核
  requestRevocationApproval(params) {
    return httpUtils.post(url.requestRevocationApproval,params);
  },
  // 获取项目流程数据
  getItemFlow(params) {
    return httpUtils.post(url.getItemFlow,params);
  }
};
