/**
 * @author w_sh
 * @date 2020/03/11
 * @module 标本流转-查询
 */
import httpUtils from '@techCommon/utils/httpUtils';
import * as systemParam from '../../../app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const MAIN_API_PREFIX = systemParam.SYS_BASE_API.SAMPLEDELIVERY.url;
const ROUTINE_API_PREFIX = systemParam.SYS_BASE_API.ROUTINE.url;

const url = {
  // 初始化
  getInitData: MAIN_API_PREFIX + 'sampledeliveryquery/request/getinitdata',
  // 查询
  getSampleDeliveryQueryList: MAIN_API_PREFIX + 'sampledeliveryquery/request/getsampledeliveryquerylist',
  // 获取电话号码
  getPhone: MAIN_API_PREFIX + 'sampledeliveryquery/request/getphone',
  // 获取报告结果
  getReportResult: ROUTINE_API_PREFIX + 'reportinput/request/getreportresult',
  // 获取报告图片
  reportImage: ROUTINE_API_PREFIX + 'reportdetails/request/reportimage',
  // 获取报告打印数据
  getReportPrintdata: ROUTINE_API_PREFIX + 'cmp/printreport/getprintreportinfo'
};
export default {
  // 初始化
  getInitData(params) {
    return httpUtils.post(url.getInitData, params);
  },
  // 查询
  getSampleDeliveryQueryList(params) {
    return httpUtils.post(url.getSampleDeliveryQueryList, params);
  },
  // 获取电话号码
  getPhone(params) {
    return httpUtils.post(url.getPhone, params);
  },
  // 获取报告结果
  getReportResult(params) {
    return httpUtils.post(url.getReportResult, params);
  },
  // 获取报告图片
  reportImage(params) {
    return httpUtils.post(url.reportImage, params);
  },
  // 获取报告打印数据
  getReportPrintdata(params) {
    return httpUtils.post(url.getReportPrintdata, params);
  }
};
