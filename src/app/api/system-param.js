/*
 * @description
 *》服务的别名预先定义，为了避免发布的时候还要改配置文件：
 *》发布的时候运行npm run deploy;对应发布文件到deploy文件夹中。
 *》测试和debug分别可以修改SYS_DEBUGMOD，并且npm run build可以发布debug版本和测试版本;对应发布文件到dist文件夹中。
 *》本地开发调试时运行npm run dev
 *》服务模式分2种模式：debug、发布，分别对应下面解释
 * @Last Modified by: mikey.zhaopeng
 * @Author: s_xd@winning.com.cn
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2020-03-24 19:01:47
 */

const config = require('../../../config');

/** 系统代码，放在设置文件中方便处理*/
const SYS_SYSCODE = "LIMS";

/** 发布部署模式，动态读取构建命令 */
const SYS_DEPLOY = process.env.ENV_DEPLOY;

/** 是否进行通信加密,表示在post数据前是否进行加密处理数据*/
const SYS_ENCRYPTION_FLAG = false;

//本地服务前缀
const mockUrl = process.env.NODE_ENV === 'production' ?
   config.build.assetsSubDirectory :
   config.dev.assetsPublicPath + config.dev.assetsSubDirectory;

/** 发布模式配置，前后端采用集中部署，前端走Ngix服务模式,名称和前缀预定义 */
const DEPOLY_API = "../clf/api/";
// '/clf/trfbase/listApprovalFlows'
const SYS_API_DEPOLY = {
 /**  配置管理*/
 
 CLF: { url: DEPOLY_API+"clf/", apiDesc: "开单申请" },

 TRF: { url: DEPOLY_API+"trf/", apiDesc: "用血申请" },

 PAF: { url: DEPOLY_API+"paf/", apiDesc: "病理申请" },

 API: { url: DEPOLY_API+"api/", apiDesc: "三方接口" },

 CONFIG: { url: DEPOLY_API+"config/", apiDesc: "页面配置" },
 };

/** debug模式的时候，可以任意改地址入口，允许统一改，也允许单独改 */
const DEBUGAPI = "http://172.17.1.211:8300/clf/api/";//9000服务
// const DEBUGAPI = "http://172.17.1.240:8000/lis/api/";//测试环境
const SYS_API_DEBUG = {
  /**  配置管理*/
  //172.17.1.211:20033
  CLF: { url: `${DEBUGAPI}clf/`, apiDesc: "开单申请" },

  //172.17.1.211:20032
  PAF:{url:`${DEBUGAPI}paf/`,apiDesc:"病理申请"},

  //172.17.1.211:20031
  TRF:{url:`${DEBUGAPI}trf/`,apiDesc:"用血申请"},

  //172.17.1.211:20036
  API:{url:`${DEBUGAPI}api/`,apiDesc:"三方接口"},

  //172.17.1.211:20034
  CONFIG:{url:`${DEBUGAPI}config/`,apiDesc:"页面配置"}
};


/** 服务前缀*/
let SYS_BASE_API = SYS_API_DEBUG;//服务器
// npm run deploy 的时候，表示真正发布的时候，和Nginx一并部署。
SYS_BASE_API = SYS_DEPLOY ? SYS_API_DEPOLY : SYS_BASE_API;
console.log('SYS_API_DEBUG',SYS_BASE_API, SYS_DEPLOY,SYS_API_DEPOLY);

export { SYS_BASE_API,SYS_SYSCODE };
