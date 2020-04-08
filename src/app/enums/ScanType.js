/**
 * scanType表示扫描类型,模块代码-扫描类型
 * 用于扫描条码记录日志
 */
const scanType = {
  MZCJ: 'sampling-bbcj', // 门诊采集
  ZYCJ: 'zysampling-bbcj', // 住院采集
  BBCXTMTH: 'samplequery-txmth', // 标本查询-条码替换
  BBQS: 'samplereg-bbqs', // 标本签收
  BBRK: 'samplingInput-bbrk', // 标本入库
}
export default scanType