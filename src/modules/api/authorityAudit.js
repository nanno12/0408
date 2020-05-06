/*
 * @Author: mikey.zhaopeng
 * @Date: 2020-03-20 16:02:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-03-31 10:20:15
 */
import httpUtils from '@/app/utils/httpUtils';
/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const WDEBUGAPI = 'http://172.17.1.211:20034'

const url = {
  // 获取接口
  getMouldItems: WDEBUGAPI +'/clf/trfbase/listMouldItems', //查询项目列表
};
export default {
  getMouldItems(params) {
    return httpUtils.postJsonRequest(url.getMouldItems,params);
  }
};
