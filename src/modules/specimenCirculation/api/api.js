/**
 * @author chuyunhshi
 * @date 2020/02/23
 * @module 标本流转
 */
import httpUtils from '@techCommon/utils/httpUtils';
import * as systemParam from '../../../app/api/system-param';

/**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
const MAIN_API_PREFIX = systemParam.SYS_BASE_API.SAMPLEDELIVERY.url;

const url = {
  // 初始化
  getInitData: MAIN_API_PREFIX + 'sampledeliveryhandle/request/getinitdata',
  // 扫码查询
  getSampleDeliveryList: MAIN_API_PREFIX + 'sampledeliveryhandle/request/getsampledeliverylist',
  // 获取医嘱
  getAcceptitemsbyOrdernoList: MAIN_API_PREFIX + 'sampledeliveryhandle/request/getacceptitemsbyordernolist',
  // 设置检测中心
  setTargethospital: MAIN_API_PREFIX + 'sampledeliveryhandle/request/settargethospital',
  // 获取参数
  getParameterList: MAIN_API_PREFIX + 'sampledeliveryhandle/request/getparameterlist',
  // 设置参数
  updateSetting: MAIN_API_PREFIX + 'sampledeliveryhandle/request/updatesetting',
  // 设置门急诊标志
  updateMjzbz: MAIN_API_PREFIX + 'sampledeliveryhandle/request/updatemjzbz',
  // 修改标本说明
  updateSampleDesc: MAIN_API_PREFIX + 'sampledeliveryhandle/request/updatesampledesc',
  // 今日外送总量
  sampleDeliveryStatistics: MAIN_API_PREFIX + 'sampledeliveryhandle/request/sampledeliverystatistics',
  // 批量上传
  batchSampleDelivery: MAIN_API_PREFIX + 'sampledeliveryhandle/request/batchsampledelivery',
  // 撤销外送
  revokehandleSampleDelivery: MAIN_API_PREFIX + 'sampledeliveryhandle/request/revokehandlesampledelivery',
  // 导出
  outData: MAIN_API_PREFIX + 'sampledeliveryhandle/request/outdata'

};
export default {
  // 初始化
  getInitData(params) {
    return httpUtils.post(url.getInitData, params);
  },
  // 扫码查询
  getSampleDeliveryList(params) {
    return httpUtils.post(url.getSampleDeliveryList, params);
  },
  // 获取医嘱
  getAcceptitemsbyOrdernoList(params) {
    return httpUtils.post(url.getAcceptitemsbyOrdernoList, params);
  },
  // 设置检测中心
  setTargethospital(params) {
    return httpUtils.post(url.setTargethospital, params);
  },
  // 获取参数
  getParameterList(params) {
    return httpUtils.post(url.getParameterList, params);
  },
  // 设置参数
  updateSetting(params) {
    return httpUtils.post(url.updateSetting, params);
  },
  // 设置门急诊标志
  updateMjzbz(params) {
    return httpUtils.post(url.updateMjzbz, params);
  },
  // 修改标本说明
  updateSampleDesc(params) {
    return httpUtils.post(url.updateSampleDesc, params);
  },
  // 今日外送总量
  sampleDeliveryStatistics(params) {
    return httpUtils.post(url.sampleDeliveryStatistics, params);
  },
  // 批量上传
  batchSampleDelivery(params) {
    return httpUtils.post(url.batchSampleDelivery, params);
  },
  // 撤销外送
  revokehandleSampleDelivery(params) {
    return httpUtils.post(url.revokehandleSampleDelivery, params);
  },
  // 导出
  outData(params) {
    return httpUtils.post(url.outData, params);
  },
  // 返回当前IP地址
  getUrl() {
    return MAIN_API_PREFIX;
  }
};
