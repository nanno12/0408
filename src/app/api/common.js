/**
 * Created by lei on 2017/9/8.
 */
// import httpUtils from '@techCommon/utils/httpUtils'
// import * as systemParam from '@/app/api/system-param'

// /**  模块主服务前缀，如果用到其他服务，可以应用下面的常量进行处理 */
// const MAIN_API_PREFIX = systemParam.SYS_BASE_API.COLLECTION.url;

// /**  公共服务前缀*/
// const COMMON_API_PREFIX = systemParam.SYS_BASE_API.COMMON.url;
// /**  常规系统前缀*/
// const ROUTINE_API_PREFIX = systemParam.SYS_BASE_API.ROUTINE.url;
// /**  标本采集前缀*/
// const COLLECTION_API_PREFIX = systemParam.SYS_BASE_API.COLLECTION.url;
// /**  his服务地址前缀*/
// const HISSERVICE_API_PREFIX = systemParam.SYS_BASE_API.HISSERVICE.url;
// /**  配置管理前缀*/
// const MANAGEMENT_API_PREFIX = systemParam.SYS_BASE_API.MANAGEMENT.url;
// /**  智能服务前缀*/
// const INTELLIGENTSERVICE_API_PREFIX = systemParam.SYS_BASE_API.INTELLIGENTSERVICE.url;
// /**  质量管理前缀*/
// const QUALITYCONTROL_API_PREFIX = systemParam.SYS_BASE_API.QUALITYCONTROL.url;
// /** 查询统计 */
// const QUEYSTATISTICS_API_PREFIX = systemParam.SYS_BASE_API.QUEYSTATISTICS.url;
// const CommonUrl={
  // getsampleInfo: MAIN_API_PREFIX + 'sampleview/request/getsampleinfo', //获取标本的状态及全流程跟踪信息
  // getSubscribe : "ws://192.168.11.211:9001/ws/pubWebsocket", //订阅危机值
  // getPoint : "ws://192.168.11.211:9001/ws/pointWebsocket", //点对点服务
 // getSubscribe : "ws://192.168.10.138:9001/lis/pubWebsocket", //订阅危机值
  // socketRequestParam:"http://192.168.10.138:9002/lis/realtime/requestParamter", //websocket参数发送
  // getCeshi: MANAGEMENT_API_PREFIX + "trfbase/listApprovalFlows", //获取报告结果（历史）信息
  // getReportLog: ROUTINE_API_PREFIX + "reportinfo/request/getreportlog", //批量打印
  // getServerTime: ROUTINE_API_PREFIX + "common/request/getservertime", //获取服务器时间
  // checkUserVerify:{url: ROUTINE_API_PREFIX +'common/request/checkuserverify',desc:"校验用户信息"},//校验用户信息
  // getDicData:{url: ROUTINE_API_PREFIX +'common/request/getdicdata',desc:"选择原因"},//选这原因
  // getSampleReturn:{url: COMMON_API_PREFIX +'cmp/printsample/request/getsamplereturn',desc:"回执单补打"},//回执单补打
  // searchCondition:{url: COMMON_API_PREFIX +'supersearch/request/searchcondition',desc:"搜索选项获取"},//搜索选项获取
  // searchOperator:{url: COMMON_API_PREFIX +'supersearch/request/searchoperator',desc:"运算符获取"},//运算符获取
  // addDictData:{ url: COMMON_API_PREFIX + "common/request/adddictdata", desc: "新增辅助字典数据" }, //新增辅助字典数据（业务模块调用使用）
  // savePlan:{url:QUEYSTATISTICS_API_PREFIX + "sampleregsumprint/request/saveplan"},// 标本签收汇总打印方案保存
  // getPlan:{url:QUEYSTATISTICS_API_PREFIX + "sampleregsumprint/request/getplan"},// 标本签收汇总打印方案导入
  // deletePlan:{url:QUEYSTATISTICS_API_PREFIX + "sampleregsumprint/request/deleteplan"},// 标本签收汇总打印方案删除


  // getSlaveListByParentName:{url: ROUTINE_API_PREFIX +'common/request/getslavelistbyparentname',desc:"获取原因列表"},//获取原因列表

  // getSlavebyClassCode:{url: COMMON_API_PREFIX + "common/request/getslavebyclasscode",desc:"原因类型"},//原因类型

  // getPhone:{url: COMMON_API_PREFIX + "common/request/getphone",desc:"获取电话"},//获取电话

  // getUserInfo:{url:COMMON_API_PREFIX + "common/request/getuserinfo"},//受话人
  // addgirdconfig:{url:COMMON_API_PREFIX + "girdconfig/request/addgirdconfig"},// 表格排序
  // getgirdconfig:{url:COMMON_API_PREFIX + "girdconfig/request/getgirdconfig"},// 表格排序获取
  // recordTxmScanLog:{url:MAIN_API_PREFIX + "barcodebinding/operate/recordtxmscanlog"},// 记录扫描条码日志√
  // getQueryCondition:{url:COMMON_API_PREFIX + "querycondition/request/getquerycondition"},// 获取条件列表
  // saveQueryCondition:{url:COMMON_API_PREFIX + "querycondition/request/savequerycondition"},// 保存/修改查询条件
  // delQueryCondition:{url:COMMON_API_PREFIX + "querycondition/request/delquerycondition"},// 删除历史条件
// };

// //获取标本的状态及全流程跟踪信息
// export default {
//   getCeshi(params){
//     return httpUtils.post(CommonUrl.getQueryCondition,params);
//   },
//   saveQueryCondition(params){
//     return httpUtils.post(CommonUrl.saveQueryCondition,params);
//   },
//   delQueryCondition(params){
//     return httpUtils.post(CommonUrl.delQueryCondition,params);
//   },
//   getPhone(params){
//     return httpUtils.post(CommonUrl.getPhone,params);
//   },
//   getsampleInfo(params,cb){
//     return httpUtils.post(CommonUrl.getsampleInfo,params)
//       .then(data => {
//         cb(data);
//       });
//   },
//   getgirdconfig(params,cb){
//     return httpUtils.post(CommonUrl.getgirdconfig,params);
//   },
//   addgirdconfig(params,cb){
//     return httpUtils.post(CommonUrl.addgirdconfig,params)
//   },
//   //socket参数发送
//   socketRequestParam(params,cb){
//     // console.log(params);
//     return httpUtils.post(CommonUrl.socketRequestParam,params)
//       .then(data => {
//         cb(data);
//       });
//   },
//   //获取报告结果（历史）信息
//   getReportResult(param,cb){
//     return httpUtils.post(CommonUrl.getReportResult,param)
//       .then(data =>{
//         cb(data);
//       })
//   },

//   //批量打印
//   getReportLog(param,cb){
//     return httpUtils.post(CommonUrl.getReportLog,param)
//       .then(data =>{
//         cb(data);
//       })
//   },
//   getPointWebsocktUrl(param){
//         return CommonUrl.getPoint + '?' + param;
//   },
//   getSampleReturn(params,cb){
//     return httpUtils.post(CommonUrl.getSampleReturn,params);
//   },

//   /**
//    * 获取服务端时间
//    * @param {*} param
//    * @param {*} cb
//    */
//   getServerTime(param,cb){
//     return httpUtils.get(CommonUrl.getServerTime,param);
//   },

//   /** 校验用户信息 */
//   checkUserVerify(params){
//     return httpUtils.post(CommonUrl.checkUserVerify, params);
//   },
//   /** 校验用户信息 */
//   getDicData(params){
//     return httpUtils.post(CommonUrl.getDicData, params);
//   },
//   /** 搜索选项获取 */
//   searchCondition(params){
//     return httpUtils.post(CommonUrl.searchCondition, params);
//   },
//   /** 运算符获取 */
//   searchOperator(params){
//     return httpUtils.post(CommonUrl.searchOperator, params);
//   },
//   //新增辅助字典数据（业务模块调用使用）
//   addDictData(params, cb) {
//     return httpUtils.post(CommonUrl.addDictData, params)
//   },
//   // 标本签收汇总打印方案保存
//   savePlan(params) {
//     return httpUtils.post(CommonUrl.savePlan, params)
//   },
//   // 标本签收汇总打印方案导入
//   getPlan(params) {
//     return httpUtils.post(CommonUrl.getPlan, params)
//   },
//   // 标本签收汇总打印方案删除
//   deletePlan(params) {
//     return httpUtils.post(CommonUrl.deletePlan, params)
//   },
//   // 拒绝签收--原因列表
//   getSlaveListByParentName(params, cb){
//     return httpUtils.post(CommonUrl.getSlaveListByParentName,params)
//     .then(data =>{
//       cb(data);
//     })
//   },
//   getSlavebyClassCode(params, cb) {
//     return httpUtils.post(CommonUrl.getSlavebyClassCode, params)
//       .then(data => {
//         cb(data);
//       });
//   },
//   //受话人
//   getUserInfo(params, cb) {
//     return httpUtils.post(CommonUrl.getUserInfo, params)
//       .then(data => {
//         cb(data);
//       });
//   },
//   // 记录扫描条码日志
//   recordTxmScanLog(params) {
//     //异步去处理
//     setTimeout(() => {
//       httpUtils.post(CommonUrl.recordTxmScanLog, params)
//     }, 0);
//   },
// }
