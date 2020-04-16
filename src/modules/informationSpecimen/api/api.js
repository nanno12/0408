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
const DEBUGAPI = 'http://172.17.1.211:20032'
// const DEBUGAPI = 'http://172.17.17.91:30002'
const url = {
  query: DEBUGAPI + '/clf/pafbase/findSpecimenDic',  // 查询标本，器官/系统、部位、名称等配置数据
  add:DEBUGAPI + '/clf/pafbase/addSpecimenDic', // 添加
  update:DEBUGAPI + '/clf/pafbase/updateSpecimenDic', // 修改
  delete:DEBUGAPI + '/clf/pafbase/deleteSpecimenDic', // 删除
  isHaveReName:DEBUGAPI + '/clf/pafbase/isHaveReName', // 根据名称，判断标本部位、申请单是否有重

};
export default {
  // 查询标本，器官/系统、部位、名称等配置数据
  getQuery(params) {
    return httpUtils.postJsonRequest(url.query, params)
  },
  getAdd(params) {
    return httpUtils.postJsonRequest(url.add, params)
  },
  getUpdate(params) {
    return httpUtils.postJsonRequest(url.update, params)
  },
  getDelete(params) {
    return httpUtils.postJsonRequest(url.delete, params)
  },
  isHaveReName(params) {
    return httpUtils.postJsonRequest(url.isHaveReName, params)
  },
};
